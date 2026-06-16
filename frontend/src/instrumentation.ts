import * as Sentry from '@sentry/nextjs';

// Server-side registration. Loads the right Sentry config per runtime.
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }
  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}

// Captures errors thrown in nested React Server Components.
export const onRequestError = Sentry.captureRequestError;
