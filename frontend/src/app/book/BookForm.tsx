'use client';

import { useEffect, useState } from 'react';
import Nav from '@/components/Nav';

// JotForm intake forms.
// Each tab has its own intake form. JotForm thank-you redirect URLs should
// be configured to land on /book/thanks?type=new|returning|athome.
const JOTFORM_NEW = 'https://form.jotform.com/261265432029150';
const JOTFORM_RETURNING = 'https://form.jotform.com/261265681381157';
const JOTFORM_ATHOME = 'https://form.jotform.com/261267150831049';

const COOKIE_NAME = 'phos_returning';

function readCookie(name: string): boolean {
  if (typeof document === 'undefined') return false;
  return document.cookie.split('; ').some((c) => c.startsWith(`${name}=`));
}

type Tab = 'new' | 'clinic' | 'athome';

export type TabCopy = {
  label: string;
  h2: string;
  sub: string;
  bullets: string[];
  ctaLabel: string;
};

export type BookCopy = {
  eyebrow: string;
  headlineDefault: string;
  headlineReturning: string;
  subheadingDefault: string;
  subheadingReturning: string;
  tabNew: TabCopy;
  tabClinic: TabCopy;
  tabAthome: TabCopy;
  footerNote: string;
};

export default function BookForm({ copy }: { copy: BookCopy }) {
  const [activeTab, setActiveTab] = useState<Tab>('new');
  const [ready, setReady] = useState(false);
  const [isLocal, setIsLocal] = useState(false);

  useEffect(() => {
    if (readCookie(COOKIE_NAME)) {
      setActiveTab('clinic');
    }
    setIsLocal(
      typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'),
    );
    setReady(true);
  }, []);

  const TAB_CONFIG: Record<Tab, TabCopy & { jotform: string }> = {
    new: { ...copy.tabNew, jotform: JOTFORM_NEW },
    clinic: { ...copy.tabClinic, jotform: JOTFORM_RETURNING },
    athome: { ...copy.tabAthome, jotform: JOTFORM_ATHOME },
  };

  const config = TAB_CONFIG[activeTab];

  // On localhost, append ?env=local so the JotForm hidden "env" field gets
  // prefilled with "local" (JotForm prefills any field whose name matches a
  // URL query param). The JotForm condition checks IF env contains "local"
  // and redirects to localhost instead of phos.la.
  const jotformHref = isLocal ? `${config.jotform}?env=local` : config.jotform;

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
            {copy.eyebrow}
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
            {ready && activeTab !== 'new' ? copy.headlineReturning : copy.headlineDefault}
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 15,
              color: 'var(--fg-muted)',
              lineHeight: 1.6,
            }}
          >
            {ready && activeTab !== 'new' ? copy.subheadingReturning : copy.subheadingDefault}
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            background: '#fff',
            borderRadius: 20,
            boxShadow: 'var(--shadow-md)',
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
              borderBottom: '1px solid var(--border)',
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
                    background: isActive ? 'var(--accent)' : 'var(--cream-50)',
                    color: isActive ? '#fff' : 'var(--cream-500)',
                    border: 0,
                    outline: 'none',
                    cursor: 'pointer',
                    transition: 'background 0.2s, color 0.2s',
                    lineHeight: 1.3,
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Tab body — fixed min-height + flex column pins the CTA to the bottom
              so the button stays in the same place across tabs. */}
          <div
            style={{
              padding: '32px 36px 36px',
              minHeight: 320,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 22,
                fontWeight: 400,
                color: 'var(--brand-navy)',
                marginBottom: 12,
              }}
            >
              {config.h2}
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 14,
                color: 'var(--fg-muted)',
                lineHeight: 1.7,
                marginBottom: 8,
              }}
            >
              {config.sub}
            </p>
            <ul
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                color: 'var(--fg-subtle)',
                lineHeight: 1.8,
                paddingLeft: 18,
                marginBottom: 28,
              }}
            >
              {config.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>

            <a
              href={jotformHref}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                width: '100%',
                marginTop: 'auto',
                padding: '14px 0',
                background: 'var(--accent)',
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
              {config.ctaLabel}
            </a>
          </div>
        </div>

        {/* Footer note */}
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 11,
            color: 'var(--cream-500)',
            marginTop: 24,
            textAlign: 'center',
          }}
        >
          {copy.footerNote}
        </p>
      </main>
    </>
  );
}
