'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Nav from '@/components/Nav';

const COOKIE_NAME = 'phos_returning';
const COOKIE_DAYS = 180;

function setCookie(name: string, days: number) {
  const expires = new Date();
  expires.setDate(expires.getDate() + days);
  document.cookie = `${name}=true; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
}

// ─── Price catalog ────────────────────────────────────────────────────────────
// Price IDs come from the Stripe sandbox (prod → price structure).
// Swap these for live price IDs when connecting the live account.

const NEW_PATIENT_PRICE = {
  id: 'price_1TUZfLAEmpFZtKZrBUkSXcKA',
  label: 'Initial Consultation',
  amount: 100,
  description: 'Applied as a credit toward your first session if you move forward.',
};

const IN_CLINIC_PRICES = [
  {
    id: 'price_1TUZfMAEmpFZtKZrHVF413eb',
    label: 'Appointment Deposit',
    amount: 100,
    description: 'Required to schedule your infusion appointment.',
  },
  {
    id: 'price_1TUZfMAEmpFZtKZrWTmNc1sn',
    label: '60 Min Infusion (sessions 1–4)',
    amount: 700,
    description: '',
  },
  {
    id: 'price_1TUZfMAEmpFZtKZrYyEIRKJI',
    label: '60 Min Booster Infusion',
    amount: 550,
    description: 'For established patients.',
  },
  {
    id: 'price_1TUZfNAEmpFZtKZroakOPLD9',
    label: '90 Min Ketamine Infusion',
    amount: 650,
    description: '',
  },
  {
    id: 'price_1TUZfNAEmpFZtKZrYVpP4FPr',
    label: '2-Hour Pain or Mood Infusion',
    amount: 850,
    description: '',
  },
  {
    id: 'price_1TUZfOAEmpFZtKZrMTAhDFkT',
    label: '3-Hour Pain or Mood Infusion',
    amount: 1150,
    description: '',
  },
  {
    id: 'price_1TUZfOAEmpFZtKZrgVEs62v9',
    label: '4-Hour Pain or Mood Infusion',
    amount: 1650,
    description: '',
  },
  {
    id: 'price_1TUZfPAEmpFZtKZrQUvOlB2u',
    label: '6-Infusion Membership',
    amount: 2750,
    description: 'For existing patients or transfers with proof of 4 sessions. Non-transferable.',
  },
  {
    id: 'price_1TUZfPAEmpFZtKZrZ76d0VgA',
    label: '12-Infusion Membership',
    amount: 5000,
    description: 'For existing patients or transfers with proof of 4 sessions. Non-transferable.',
  },
];

const AT_HOME_PRICES = [
  {
    id: 'price_1TUZfPAEmpFZtKZr9c3BFhxk',
    label: '1st Video Consultation',
    amount: 250,
    description: 'For new at-home patients. First month prescription filled by pharmacy.',
  },
  {
    id: 'price_1TUZfQAEmpFZtKZrHz035xcy',
    label: '2nd Video Consultation',
    amount: 225,
    description: 'Ready for your second month refill.',
  },
  {
    id: 'price_1TUZfQAEmpFZtKZr7U2B0sfN',
    label: '3rd Video Consultation',
    amount: 200,
    description: 'Includes a 3-month supply dispensed one month at a time.',
  },
  {
    id: 'price_1TUZfRAEmpFZtKZrDSBgMRqO',
    label: 'Follow-up Video Visit',
    amount: 250,
    description: 'Required every 6 months for a continued prescription.',
  },
  {
    id: 'price_1TUZfRAEmpFZtKZrKPXRcig0',
    label: 'Prescription Changes',
    amount: 200,
    description: 'Dosage adjustment consult before your 6-month follow-up.',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(dollars: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(dollars);
}

async function redirectToCheckout(priceId: string): Promise<string | null> {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ priceId }),
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data.url ?? null;
}

// ─── Types ────────────────────────────────────────────────────────────────────

type FlowType = 'new' | 'returning' | 'athome';

export type FlowCopy = {
  heading: string;
  subheading: string;
  eyebrow: string;
  pickerLabel: string;
};

export type ThanksCopy = {
  flowNew: FlowCopy;
  flowReturning: FlowCopy;
  flowAthome: FlowCopy;
  newDepositCtaLabel: string;
  newDepositLoadingLabel: string;
  otherCtaLabel: string;
  secureNote: string;
  errorMessage: string;
  backLinkLabel: string;
};

function parseFlowType(raw: string | null): FlowType {
  if (raw === 'returning') return 'returning';
  if (raw === 'athome') return 'athome';
  return 'new';
}

// ─── Service picker row ───────────────────────────────────────────────────────

type Price = { id: string; label: string; amount: number; description: string };

function PriceRow({
  price,
  selected,
  onSelect,
}: {
  price: Price;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        width: '100%',
        padding: '14px 16px',
        background: selected ? 'rgba(30,58,72,0.05)' : 'transparent',
        border: selected ? `1.5px solid var(--accent)` : '1.5px solid var(--border)',
        borderRadius: 10,
        cursor: 'pointer',
        textAlign: 'left',
        marginBottom: 8,
        transition: 'border-color 0.15s, background 0.15s',
      }}
    >
      <span
        style={{
          flexShrink: 0,
          marginTop: 2,
          width: 16,
          height: 16,
          borderRadius: '50%',
          border: `2px solid ${selected ? 'var(--accent)' : 'var(--border)'}`,
          background: selected ? 'var(--accent)' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {selected && (
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#fff',
              display: 'block',
            }}
          />
        )}
      </span>
      <span style={{ flex: 1 }}>
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 14,
            fontWeight: 600,
            color: 'var(--brand-navy)',
            display: 'block',
          }}
        >
          {price.label}
        </span>
        {price.description && (
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 12,
              color: 'var(--fg-subtle)',
              lineHeight: 1.5,
              display: 'block',
              marginTop: 2,
            }}
          >
            {price.description}
          </span>
        )}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 16,
          color: 'var(--brand-navy)',
          flexShrink: 0,
          marginTop: 1,
        }}
      >
        {fmt(price.amount)}
      </span>
    </button>
  );
}

// ─── Inner component ──────────────────────────────────────────────────────────

function ThanksInner({ copy }: { copy: ThanksCopy }) {
  const params = useSearchParams();
  const flow = parseFlowType(params.get('type'));
  const flowCopy =
    flow === 'returning' ? copy.flowReturning : flow === 'athome' ? copy.flowAthome : copy.flowNew;

  // Pick the right price list for the flow
  const prices: Price[] =
    flow === 'returning' ? IN_CLINIC_PRICES : flow === 'athome' ? AT_HOME_PRICES : [];
  const [selectedId, setSelectedId] = useState<string>(prices[0]?.id ?? NEW_PATIENT_PRICE.id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCookie(COOKIE_NAME, COOKIE_DAYS);
  }, []);

  // Reset selection if the flow type changes mid-session
  useEffect(() => {
    setSelectedId(prices[0]?.id ?? NEW_PATIENT_PRICE.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flow]);

  const handleCheckout = async (priceId: string) => {
    setLoading(true);
    setError(null);
    const url = await redirectToCheckout(priceId);
    if (url) {
      window.location.href = url;
    } else {
      setError(copy.errorMessage);
      setLoading(false);
    }
  };

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
            background: 'var(--accent)',
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
            {flowCopy.heading}
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 15,
              color: 'var(--fg-muted)',
              lineHeight: 1.7,
            }}
          >
            {flowCopy.subheading}
          </p>
        </div>

        {/* Payment card */}
        <div
          style={{
            background: '#fff',
            borderRadius: 20,
            boxShadow: 'var(--shadow-md)',
            width: '100%',
            maxWidth: flow === 'new' ? 440 : 560,
            overflow: 'hidden',
          }}
        >
          {/* ── New patient: single deposit ─────────────────────────────────── */}
          {flow === 'new' && (
            <div style={{ padding: '32px 36px', textAlign: 'center' }}>
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
                {flowCopy.eyebrow}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 28,
                  color: 'var(--brand-navy)',
                  marginBottom: 8,
                }}
              >
                {fmt(NEW_PATIENT_PRICE.amount)} deposit
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13,
                  color: 'var(--fg-subtle)',
                  lineHeight: 1.6,
                  marginBottom: 28,
                }}
              >
                {NEW_PATIENT_PRICE.description}
              </p>

              {error && (
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 13,
                    color: '#dc2626',
                    marginBottom: 16,
                  }}
                >
                  {error}
                </p>
              )}

              <button
                onClick={() => handleCheckout(NEW_PATIENT_PRICE.id)}
                disabled={loading}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '14px 0',
                  background: loading ? 'var(--cream-500)' : 'var(--brand-amber)',
                  color: '#fff',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                  textAlign: 'center',
                  border: 'none',
                  borderRadius: 10,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s',
                }}
              >
                {loading ? copy.newDepositLoadingLabel : copy.newDepositCtaLabel}
              </button>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 11,
                  color: 'var(--cream-500)',
                  marginTop: 12,
                }}
              >
                {copy.secureNote}
              </p>
            </div>
          )}

          {/* ── Returning or At-Home: dedicated service picker ─────────────── */}
          {flow !== 'new' && (
            <div style={{ padding: '32px 28px 28px' }}>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--brand-amber)',
                  marginBottom: 16,
                  textAlign: 'center',
                }}
              >
                {flowCopy.pickerLabel}
              </p>

              {prices.map((price) => (
                <PriceRow
                  key={price.id}
                  price={price}
                  selected={selectedId === price.id}
                  onSelect={() => setSelectedId(price.id)}
                />
              ))}

              {error && (
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 13,
                    color: '#dc2626',
                    marginBottom: 12,
                    marginTop: 4,
                  }}
                >
                  {error}
                </p>
              )}

              <button
                onClick={() => handleCheckout(selectedId)}
                disabled={loading}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '14px 0',
                  background: loading ? 'var(--cream-500)' : 'var(--accent)',
                  color: '#fff',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: '0.03em',
                  textAlign: 'center',
                  border: 'none',
                  borderRadius: 10,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  marginTop: 16,
                  transition: 'background 0.2s',
                }}
              >
                {loading ? copy.newDepositLoadingLabel : copy.otherCtaLabel}
              </button>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 11,
                  color: 'var(--cream-500)',
                  marginTop: 12,
                  textAlign: 'center',
                }}
              >
                {copy.secureNote}
              </p>
            </div>
          )}
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
          {copy.backLinkLabel}
        </a>
      </main>
    </>
  );
}

export default function ThanksContent({ copy }: { copy: ThanksCopy }) {
  return (
    <Suspense>
      <ThanksInner copy={copy} />
    </Suspense>
  );
}
