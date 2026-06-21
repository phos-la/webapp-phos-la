import { NextResponse, type NextRequest } from 'next/server';
import { posthogAnalytics, trackVisit } from '@apideck/agent-analytics';

// Answer Engine Optimization (AEO) agent analytics.
//
// Client-side posthog-js never runs for AI crawlers (ClaudeBot, GPTBot,
// PerplexityBot, Google-Extended, ...) because they don't execute JS. This
// edge middleware logs those server-side fetches into the same PostHog project
// so the weekly report (and a saved insight) can show which agents read which
// pages. See milestone app-build/07d-aeo.
//
// `onlyBots: true` keeps this to declared AI crawlers only. Human pageviews are
// already captured client-side by posthog-js, so we don't duplicate them or
// inflate event volume. The call is fire-and-forget (keepalive) and swallows its
// own errors, so a PostHog outage can never affect the response.
const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const analytics = posthogKey
  ? posthogAnalytics({
      apiKey: posthogKey,
      // Post directly to PostHog US cloud from the edge. The /ingest reverse
      // proxy (next.config.ts) is only needed for browser calls dodging ad
      // blockers; server-side has no such constraint.
      host: 'https://us.i.posthog.com',
    })
  : null;

export function middleware(req: NextRequest) {
  if (analytics) {
    void trackVisit(req, { analytics, source: 'page-view', onlyBots: true });
  }
  return NextResponse.next();
}

export const config = {
  // Run on content routes only. Skip Next internals and the PostHog `/ingest`
  // reverse proxy (tracking our own analytics ingest would be circular). We
  // deliberately keep sitemap.xml / robots.txt / llms.txt in scope. An agent
  // fetching those is exactly the AEO signal we want to see.
  matcher: ['/((?!_next/static|_next/image|ingest/|favicon.ico).*)'],
};
