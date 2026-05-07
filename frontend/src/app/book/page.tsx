'use client';

import { useEffect, useState } from 'react';
import Nav from '@/components/Nav';

// JotForm intake forms.
// The returning + at-home tabs both use the same intake form for now —
// the JotForm thank-you redirect URL determines whether the patient lands
// on /book/thanks?type=returning or /book/thanks?type=athome. If those need
// to diverge, create a third intake form and swap JOTFORM_ATHOME below.
const JOTFORM_NEW = 'https://form.jotform.com/261265432029150';
const JOTFORM_RETURNING = 'https://form.jotform.com/261265681381157';
const JOTFORM_ATHOME = 'https://form.jotform.com/261265681381157';

const COOKIE_NAME = 'phos_returning';

function readCookie(name: string): boolean {
  if (typeof document === 'undefined') return false;
  return document.cookie.split('; ').some((c) => c.startsWith(`${name}=`));
}

type Tab = 'new' | 'clinic' | 'athome';

const TAB_CONFIG: Record<Tab, { label: string; accent: string; jotform: string; cta: string }> = {
  new: {
    label: 'New Patient',
    accent: 'var(--brand-teal)',
    jotform: JOTFORM_NEW,
    cta: 'Begin new patient intake →',
  },
  clinic: {
    label: 'Returning · In-Clinic',
    accent: '#6b46c1',
    jotform: JOTFORM_RETURNING,
    cta: 'Continue as returning patient →',
  },
  athome: {
    label: 'Returning · At-Home',
    accent: '#0f766e',
    jotform: JOTFORM_ATHOME,
    cta: 'Continue with at-home visit →',
  },
};

export default function BookPage() {
  const [activeTab, setActiveTab] = useState<Tab>('new');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (readCookie(COOKIE_NAME)) {
      setActiveTab('clinic');
    }
    setReady(true);
  }, []);

  const config = TAB_CONFIG[activeTab];

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
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 48, maxWidth: 560 }}>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--brand-teal)',
              marginBottom: 16,
            }}
          >
            Phos Wellness
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 400,
              color: 'var(--brand-navy)',
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            {ready && activeTab !== 'new' ? 'Welcome back.' : 'Start your journey.'}
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 15,
              color: '#4a5568',
              lineHeight: 1.6,
            }}
          >
            {ready && activeTab !== 'new'
              ? "Your intake is on file. Just let us know why you're coming in."
              : 'Tell us a bit about yourself so Katie can prepare for your visit.'}
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: '#fff',
            borderRadius: 20,
            boxShadow: '0 4px 24px rgba(30,58,72,0.08)',
            overflow: 'hidden',
            width: '100%',
            maxWidth: 600,
          }}
        >
          {/* Tab bar — three columns */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              borderBottom: '1px solid #ede8dc',
            }}
          >
            {(Object.keys(TAB_CONFIG) as Tab[]).map((tab) => {
              const t = TAB_CONFIG[tab];
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '16px 8px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: '0.03em',
                    background: isActive ? t.accent : '#f9f7f4',
                    color: isActive ? '#fff' : '#9ca3af',
                    border: 0,
                    cursor: 'pointer',
                    transition: 'background 0.2s, color 0.2s',
                    lineHeight: 1.3,
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Tab body */}
          <div style={{ padding: '32px 36px 36px' }}>
            {activeTab === 'new' && (
              <>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 22,
                    fontWeight: 400,
                    color: 'var(--brand-navy)',
                    marginBottom: 12,
                  }}
                >
                  First consultation
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 14,
                    color: '#4a5568',
                    lineHeight: 1.7,
                    marginBottom: 8,
                  }}
                >
                  Takes about 5 minutes. We collect a few basics so Katie can review your profile
                  before your first visit.
                </p>
                <ul
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 13,
                    color: '#6b7280',
                    lineHeight: 1.8,
                    paddingLeft: 18,
                    marginBottom: 28,
                  }}
                >
                  <li>Date of birth, phone, email</li>
                  <li>Gender</li>
                  <li>Electronic signature</li>
                </ul>
              </>
            )}

            {activeTab === 'clinic' && (
              <>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 22,
                    fontWeight: 400,
                    color: 'var(--brand-navy)',
                    marginBottom: 12,
                  }}
                >
                  Book an in-clinic session
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 14,
                    color: '#4a5568',
                    lineHeight: 1.7,
                    marginBottom: 8,
                  }}
                >
                  Quick — just your email and a note on why you're coming in. Your full intake is
                  already on file.
                </p>
                <ul
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 13,
                    color: '#6b7280',
                    lineHeight: 1.8,
                    paddingLeft: 18,
                    marginBottom: 28,
                  }}
                >
                  <li>60 min, 90 min, 2-, 3-, 4-hour infusions</li>
                  <li>Booster sessions and 6 / 12-pack memberships</li>
                </ul>
              </>
            )}

            {activeTab === 'athome' && (
              <>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 22,
                    fontWeight: 400,
                    color: 'var(--brand-navy)',
                    marginBottom: 12,
                  }}
                >
                  Schedule an at-home video visit
                </h2>
                <p
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 14,
                    color: '#4a5568',
                    lineHeight: 1.7,
                    marginBottom: 8,
                  }}
                >
                  Quick — just your email and a note on why you're coming in. Your full intake is
                  already on file.
                </p>
                <ul
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 13,
                    color: '#6b7280',
                    lineHeight: 1.8,
                    paddingLeft: 18,
                    marginBottom: 28,
                  }}
                >
                  <li>1st, 2nd, 3rd video consultations</li>
                  <li>6-month follow-up and prescription changes</li>
                </ul>
              </>
            )}

            <a
              href={config.jotform}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                width: '100%',
                padding: '14px 0',
                background: config.accent,
                color: '#fff',
                fontFamily: 'var(--font-sans)',
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: '0.03em',
                textAlign: 'center',
                textDecoration: 'none',
                borderRadius: 10,
                transition: 'background 0.2s',
              }}
            >
              {config.cta}
            </a>
          </div>
        </div>

        {/* Footer note */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 11,
            color: '#9ca3af',
            marginTop: 24,
            textAlign: 'center',
          }}
        >
          Secure form · HIPAA compliant · Powered by JotForm
        </p>
      </main>
    </>
  );
}
