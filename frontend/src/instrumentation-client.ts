// Client-side instrumentation that Next.js loads once per browser session.
// Sentry and PostHog both live here because Next.js only picks up a single
// `instrumentation-client.ts` (the one under `src/` when a `src/` dir exists).
//
// IMPORTANT: only `init` + `captureRouterTransitionStart` are imported
// statically. Importing the full `@sentry/nextjs` namespace (or calling
// `replayIntegration()` inside the synchronous `init`) pulls Sentry's heavy
// client module into Turbopack's eager graph, which throws "module factory is
// not available" at module evaluation and aborts client hydration entirely.
// When that happens the page goes inert and forms fall back to native
// full-page submits. The Replay integration is added lazily after idle instead.
import { init, captureRouterTransitionStart } from '@sentry/nextjs';

const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
if (sentryDsn) {
  init({
    dsn: sentryDsn,
    sendDefaultPii: true,
    tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1,
    // Replay sampling is read at init time even though the integration itself
    // is added lazily below.
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    enableLogs: true,
    // Drop errors that never come from our own code. These are browser
    // extensions, antivirus/network-appliance script injection, and ancient
    // crawler engines hitting the page. They pollute the reliability report
    // with noise like "Object [object Object] has no method 'updateFrom'"
    // (an old-engine phrasing, modern V8 says "is not a function").
    ignoreErrors: [
      /updateFrom/,
      /has no method/,
      // Benign browser quirks Sentry itself recommends filtering.
      'ResizeObserver loop limit exceeded',
      'ResizeObserver loop completed with undelivered notifications',
      'Non-Error promise rejection captured',
    ],
    denyUrls: [
      // Errors whose stack originates in an extension or injected script,
      // not from phos.la itself.
      /extensions\//i,
      /^chrome:\/\//i,
      /^chrome-extension:\/\//i,
      /^moz-extension:\/\//i,
      /^safari-(web-)?extension:\/\//i,
      // The "sentry/scripts/views.js" phantom path the noise event reported.
      /\/sentry\/scripts\//i,
    ],
  });
}

// Sentry's client-side navigation instrumentation for the App Router.
export const onRouterTransitionStart = captureRouterTransitionStart;

function whenIdle(cb: () => void) {
  if (typeof window === 'undefined') return;
  const ric = (
    window as Window & {
      requestIdleCallback?: (cb: IdleRequestCallback, opts?: IdleRequestOptions) => number;
    }
  ).requestIdleCallback;
  if (typeof ric === 'function') {
    ric(cb, { timeout: 4000 });
  } else {
    window.setTimeout(cb, 0);
  }
}

// Add the heavier Replay integration (~80KB plus DOM handlers) after the
// browser is idle so it never competes with initial paint or blocks
// hydration. Replay masks all text and inputs by default, which suits a
// clinical site.
if (sentryDsn) {
  whenIdle(() => {
    void import('@sentry/nextjs').then(({ replayIntegration, getClient }) => {
      const client = getClient();
      if (!client) return;
      client.addIntegration(replayIntegration());
    });
  });
}

// PostHog. Events are proxied through /ingest (same origin) so they survive ad
// blockers and the strict CSP without extra connect-src hosts. Loaded lazily so
// the posthog-js chunk is split out of the main bundle.
const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
if (posthogKey && typeof window !== 'undefined') {
  whenIdle(() => {
    void import('posthog-js').then(({ default: posthog }) => {
      posthog.init(posthogKey, {
        api_host: '/ingest',
        ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.posthog.com',
        defaults: '2025-05-24',
        capture_pageview: true,
        capture_pageleave: true,
        person_profiles: 'identified_only',
      });
    });
  });
}
