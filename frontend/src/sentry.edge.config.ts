import * as Sentry from '@sentry/nextjs';

// Edge runtime (middleware, edge routes). DSN comes from env; inert when unset.
const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
if (dsn) {
  Sentry.init({
    dsn,
    sendDefaultPii: true,
    tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1,
    enableLogs: true,
  });
}
