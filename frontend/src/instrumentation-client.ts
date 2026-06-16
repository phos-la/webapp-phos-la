// Client-side instrumentation. Runs after the document loads, before React hydration.
// Sets up PostHog (product analytics) and Sentry (error monitoring) for the browser.

import posthog from 'posthog-js';
import * as Sentry from '@sentry/nextjs';

// PostHog. Events are proxied through /ingest (same origin) so they survive ad
// blockers and the strict Content-Security-Policy without extra connect-src hosts.
// The ui_host points at the real dashboard so links in the toolbar resolve.
const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
if (posthogKey) {
  try {
    posthog.init(posthogKey, {
      api_host: '/ingest',
      ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.posthog.com',
      defaults: '2025-05-24',
      capture_pageview: true,
      capture_pageleave: true,
      person_profiles: 'identified_only',
    });
  } catch {
    // Never let analytics setup break the page.
  }
}

// Sentry. DSN is read from env; when unset (e.g. before David provides it) the
// SDK initializes inert and sends nothing, so this is safe to ship now.
const sentryDsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
if (sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
    sendDefaultPii: true,
    tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    enableLogs: true,
    integrations: [Sentry.replayIntegration()],
  });
}

// Sentry's client-side navigation instrumentation for the App Router.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
