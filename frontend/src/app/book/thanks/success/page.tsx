import { Suspense } from 'react';
import Nav from '@/components/Nav';
import Stripe from 'stripe';
import { client } from '@/lib/sanity/client';
import { bookSuccessPageQuery } from '@/lib/sanity/queries';

export const dynamic = 'force-dynamic';

type SuccessCopy = {
  heading: string;
  body: string;
  contactCardText: string;
  contactPhone: string;
  contactPhoneTel: string;
  backLinkLabel: string;
  fallbackHeading: string;
  fallbackBody: string;
};

const DEFAULTS: SuccessCopy = {
  heading: 'Payment confirmed.',
  body: 'Our support staff will be in touch shortly to confirm your appointment.',
  contactCardText: 'Questions? Call or text our support staff at {phone}.',
  contactPhone: '(424) 278-4241',
  contactPhoneTel: '+14242784241',
  backLinkLabel: '← Back to phos.la',
  fallbackHeading: 'Payment received.',
  fallbackBody: 'Our support staff will be in touch shortly to confirm your appointment.',
};

async function loadCopy(): Promise<SuccessCopy> {
  const doc = await client
    .fetch<Partial<SuccessCopy> | null>(bookSuccessPageQuery)
    .catch(() => null);
  return { ...DEFAULTS, ...(doc ?? {}) };
}

function renderContactCard(copy: SuccessCopy) {
  const parts = copy.contactCardText.split('{phone}');
  const link = (
    <a
      key="phone"
      href={`tel:${copy.contactPhoneTel}`}
      style={{ color: 'var(--brand-teal)', textDecoration: 'none', fontWeight: 600 }}
    >
      {copy.contactPhone}
    </a>
  );
  if (parts.length === 1) {
    return (
      <>
        {copy.contactCardText} {link}
      </>
    );
  }
  return (
    <>
      {parts[0]}
      {link}
      {parts.slice(1).join('{phone}')}
    </>
  );
}

async function SuccessContent({ sessionId, copy }: { sessionId: string; copy: SuccessCopy }) {
  let amountTotal: number | null = null;
  let customerEmail: string | null = null;
  let lineItemLabel: string | null = null;

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    });
    amountTotal = session.amount_total;
    customerEmail = session.customer_details?.email ?? null;
    // Pull the first line item's description (product name) so existing
    // patients can see what they actually paid for after checkout.
    lineItemLabel = session.line_items?.data?.[0]?.description ?? null;
  } catch {
    // If retrieval fails, show a generic success message
  }

  const formattedAmount =
    amountTotal !== null
      ? new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
        }).format(amountTotal / 100)
      : null;

  return (
    <>
      <Nav />

      <main
        style={{
          minHeight: '100vh',
          background: 'var(--brand-cream)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '120px 24px 80px',
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'var(--brand-teal)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 32,
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <div style={{ textAlign: 'center', maxWidth: 480, marginBottom: 40 }}>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 5vw, 2.8rem)',
              fontWeight: 400,
              color: 'var(--brand-navy)',
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            {copy.heading}
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 15,
              color: 'var(--fg-muted)',
              lineHeight: 1.7,
            }}
          >
            {formattedAmount && lineItemLabel
              ? `${formattedAmount} received for ${lineItemLabel}. `
              : formattedAmount
                ? `${formattedAmount} received. `
                : lineItemLabel
                  ? `Payment received for ${lineItemLabel}. `
                  : ''}
            {customerEmail
              ? `A receipt has been sent to ${customerEmail}. `
              : 'Check your email for a receipt. '}
            {copy.body}
          </p>
        </div>

        <div
          style={{
            background: '#fff',
            borderRadius: 20,
            boxShadow: 'var(--shadow-md)',
            padding: '28px 36px',
            width: '100%',
            maxWidth: 440,
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              color: 'var(--fg-subtle)',
              lineHeight: 1.7,
            }}
          >
            {renderContactCard(copy)}
          </p>
        </div>

        <a
          href="/"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 13,
            color: 'var(--brand-teal)',
            textDecoration: 'none',
            marginTop: 32,
          }}
        >
          {copy.backLinkLabel}
        </a>
      </main>
    </>
  );
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const copy = await loadCopy();

  if (!session_id) {
    return (
      <>
        <Nav />
        <main
          style={{
            minHeight: '100vh',
            background: 'var(--brand-cream)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '120px 24px 80px',
          }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '2rem',
              color: 'var(--brand-navy)',
              marginBottom: 16,
            }}
          >
            {copy.fallbackHeading}
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--fg-muted)' }}>
            {copy.fallbackBody}
          </p>
          <a
            href="/"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              color: 'var(--brand-teal)',
              marginTop: 32,
              textDecoration: 'none',
            }}
          >
            {copy.backLinkLabel}
          </a>
        </main>
      </>
    );
  }

  return (
    <Suspense>
      <SuccessContent sessionId={session_id} copy={copy} />
    </Suspense>
  );
}
