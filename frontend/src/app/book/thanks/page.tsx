'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Nav from '@/components/Nav';

const COOKIE_NAME = 'phos_returning';
const COOKIE_DAYS = 180;

function setCookie(name: string, days: number) {
  const expires = new Date();
  expires.setDate(expires.getDate() + days);
  document.cookie = `${name}=true; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

// ─── Inner component (needs useSearchParams inside Suspense) ──────────────────
function ThanksContent() {
  const params = useSearchParams();
  const type = params.get('type'); // 'new' | 'returning'
  const isNew = type !== 'returning';
  const [cookieSet, setCookieSet] = useState(false);

  useEffect(() => {
    setCookie(COOKIE_NAME, COOKIE_DAYS);
    setCookieSet(true);
  }, []);

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
            background: isNew ? 'var(--brand-teal)' : '#6b46c1',
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
            {isNew ? "You're all set." : 'See you soon.'}
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 15,
              color: '#4a5568',
              lineHeight: 1.7,
            }}
          >
            {isNew
              ? 'Katie will review your intake before your first visit. One last step — a deposit holds your appointment slot.'
              : "We've got your note. One last step — complete your session payment below."}
          </p>
        </div>

        {/* Cookie confirmation (subtle, dev-useful) */}
        {cookieSet && (
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 11,
              color: '#9ca3af',
              marginBottom: 32,
            }}
          >
            ✓ You'll be recognised as a returning patient on your next visit.
          </p>
        )}

        {/* Stripe CTA card */}
        <div
          style={{
            background: '#fff',
            borderRadius: 20,
            boxShadow: '0 4px 24px rgba(30,58,72,0.08)',
            padding: '32px 36px',
            width: '100%',
            maxWidth: 440,
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--brand-amber)',
              marginBottom: 12,
            }}
          >
            {isNew ? 'Hold your appointment' : 'Session payment'}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 20,
              color: 'var(--brand-navy)',
              marginBottom: 8,
            }}
          >
            {isNew ? 'Deposit' : '$400 / session'}
          </p>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              color: '#6b7280',
              lineHeight: 1.6,
              marginBottom: 28,
            }}
          >
            {isNew
              ? "Credited toward your first session. Fully refundable if we determine ketamine therapy isn't right for you."
              : 'Membership rate. Includes pre- and post-infusion PA evaluation and adjunct therapy adjustment.'}
          </p>

          {/* Stripe link placeholder — swap in real Payment Link when Christa adds David as admin */}
          <a
            href="#stripe-coming-soon"
            onClick={(e) => e.preventDefault()}
            style={{
              display: 'block',
              width: '100%',
              padding: '14px 0',
              background: 'var(--brand-amber)',
              color: '#fff',
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: '0.03em',
              textAlign: 'center',
              textDecoration: 'none',
              borderRadius: 10,
              opacity: 0.7,
              cursor: 'not-allowed',
            }}
          >
            Pay with card — coming soon
          </a>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 11,
              color: '#9ca3af',
              marginTop: 12,
            }}
          >
            Secure payment via Stripe · PCI compliant
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

// ─── Page wrapper (Suspense required for useSearchParams in Next.js) ──────────
export default function ThanksPage() {
  return (
    <Suspense>
      <ThanksContent />
    </Suspense>
  );
}
