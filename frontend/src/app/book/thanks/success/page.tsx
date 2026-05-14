import { Suspense } from 'react';
import Nav from '@/components/Nav';
import Stripe from 'stripe';

// ─── Server component: fetch session details from Stripe ──────────────────────

async function SuccessContent({ sessionId }: { sessionId: string }) {
  let amountTotal: number | null = null;
  let customerEmail: string | null = null;

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    });
    amountTotal = session.amount_total;
    customerEmail = session.customer_details?.email ?? null;
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
        {/* Checkmark */}
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

        {/* Heading */}
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
            Payment confirmed.
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 15,
              color: 'var(--fg-muted)',
              lineHeight: 1.7,
            }}
          >
            {formattedAmount && `${formattedAmount} received. `}
            {customerEmail
              ? `A receipt has been sent to ${customerEmail}.`
              : 'Check your email for a receipt.'}{' '}
            Katie will be in touch shortly to confirm your appointment.
          </p>
        </div>

        {/* Detail card */}
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
            Questions? Call or text Katie at{' '}
            <a
              href="tel:+14242784241"
              style={{ color: 'var(--brand-teal)', textDecoration: 'none', fontWeight: 600 }}
            >
              (424) 278-4241
            </a>
            .
          </p>
        </div>

        {/* Back link */}
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
          ← Back to phos.la
        </a>
      </main>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

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
            Payment received.
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, color: 'var(--fg-muted)' }}>
            Katie will be in touch shortly to confirm your appointment.
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
            ← Back to phos.la
          </a>
        </main>
      </>
    );
  }

  return (
    <Suspense>
      <SuccessContent sessionId={session_id} />
    </Suspense>
  );
}
