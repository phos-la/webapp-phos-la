'use client';

import { useEffect, useState } from 'react';
import Nav from '@/components/Nav';

const JOTFORM_NEW = 'https://form.jotform.com/261265432029150';
const JOTFORM_RETURNING = 'https://form.jotform.com/261265681381157';
const COOKIE_NAME = 'phos_returning';

function readCookie(name: string): boolean {
  if (typeof document === 'undefined') return false;
  return document.cookie.split('; ').some((c) => c.startsWith(`${name}=`));
}

export default function BookPage() {
  const [isReturning, setIsReturning] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setIsReturning(readCookie(COOKIE_NAME));
    setReady(true);
  }, []);

  const activeTab = isReturning ? 'returning' : 'new';

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
            {ready && isReturning ? 'Welcome back.' : 'Start your journey.'}
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 15,
              color: '#4a5568',
              lineHeight: 1.6,
            }}
          >
            {ready && isReturning
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
            maxWidth: 520,
          }}
        >
          {/* Tab bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              borderBottom: '1px solid #ede8dc',
            }}
          >
            <button
              onClick={() => setIsReturning(false)}
              style={{
                padding: '16px 0',
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.04em',
                background: activeTab === 'new' ? 'var(--brand-teal)' : '#f9f7f4',
                color: activeTab === 'new' ? '#fff' : '#9ca3af',
                border: 0,
                cursor: 'pointer',
                transition: 'background 0.2s, color 0.2s',
              }}
            >
              New Patient
            </button>
            <button
              onClick={() => setIsReturning(true)}
              style={{
                padding: '16px 0',
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.04em',
                background: activeTab === 'returning' ? '#6b46c1' : '#f9f7f4',
                color: activeTab === 'returning' ? '#fff' : '#9ca3af',
                border: 0,
                cursor: 'pointer',
                transition: 'background 0.2s, color 0.2s',
              }}
            >
              Returning Patient
            </button>
          </div>

          {/* Tab body */}
          <div style={{ padding: '32px 36px 36px' }}>
            {activeTab === 'new' ? (
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
                <a
                  href={JOTFORM_NEW}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '14px 0',
                    background: 'var(--brand-teal)',
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
                  Begin new patient intake →
                </a>
              </>
            ) : (
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
                  Book a session
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
                  <li>Email address</li>
                  <li>Reason for visit</li>
                </ul>
                <a
                  href={JOTFORM_RETURNING}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '14px 0',
                    background: '#6b46c1',
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
                  Continue as returning patient →
                </a>
              </>
            )}
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
