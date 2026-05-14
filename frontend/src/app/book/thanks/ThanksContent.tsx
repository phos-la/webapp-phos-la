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

export type Price = {
  stripePriceId: string;
  label: string;
  amount: number;
  description?: string;
};

export type FlowNewCopy = {
  heading: string;
  subheading: string;
  eyebrow: string;
  deposit: Price;
};

export type FlowPickerCopy = {
  heading: string;
  subheading: string;
  eyebrow: string;
  pickerLabel: string;
  prices: Price[];
};

export type ThanksCopy = {
  flowNew: FlowNewCopy;
  flowReturning: FlowPickerCopy;
  flowAthome: FlowPickerCopy;
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

  const prices: Price[] =
    flow === 'returning'
      ? copy.flowReturning.prices
      : flow === 'athome'
        ? copy.flowAthome.prices
        : [];

  const initialId = prices[0]?.stripePriceId ?? copy.flowNew.deposit.stripePriceId;
  const [selectedId, setSelectedId] = useState<string>(initialId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCookie(COOKIE_NAME, COOKIE_DAYS);
  }, []);

  // Reset selection if the flow type changes mid-session
  useEffect(() => {
    setSelectedId(prices[0]?.stripePriceId ?? copy.flowNew.deposit.stripePriceId);
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
                  color: 'var(--brand-teal)',
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
                {fmt(copy.flowNew.deposit.amount)} deposit
              </p>
              {copy.flowNew.deposit.description && (
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 13,
                    color: 'var(--fg-subtle)',
                    lineHeight: 1.6,
                    marginBottom: 28,
                  }}
                >
                  {copy.flowNew.deposit.description}
                </p>
              )}

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
                onClick={() => handleCheckout(copy.flowNew.deposit.stripePriceId)}
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

          {/* ── Existing or At-Home: dedicated service picker ──────────────── */}
          {flow !== 'new' && (
            <div style={{ padding: '32px 28px 28px' }}>
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--brand-teal)',
                  marginBottom: 16,
                  textAlign: 'center',
                }}
              >
                {flow === 'returning'
                  ? copy.flowReturning.pickerLabel
                  : copy.flowAthome.pickerLabel}
              </p>

              {prices.map((price) => (
                <PriceRow
                  key={price.stripePriceId}
                  price={price}
                  selected={selectedId === price.stripePriceId}
                  onSelect={() => setSelectedId(price.stripePriceId)}
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
