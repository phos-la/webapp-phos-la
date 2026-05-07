'use client';

import { useCallback } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  BackgroundVariant,
  Handle,
  Position,
  useNodesState,
  useEdgesState,
  addEdge,
  type Node,
  type Edge,
  type NodeProps,
  type Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const C = {
  teal: '#358c7a',
  tealDark: '#2a7062',
  tealLight: '#e8f4f1',
  aqua: '#80bcac',
  navy: '#1e3a48',
  amber: '#b88c50',
  amberLight: '#f9f2e8',
  purple: '#6b46c1',
  purpleLight: '#f3f0ff',
  purpleDark: '#553c9a',
  red: '#c53030',
  redLight: '#fff5f5',
  green: '#276749',
  greenLight: '#f0fff4',
  blue: '#2b6cb0',
  blueLight: '#ebf8ff',
  orange: '#c05621',
  orangeLight: '#fffaf0',
  white: '#ffffff',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray400: '#9ca3af',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
};

// ─── Shared styles ────────────────────────────────────────────────────────────
const nodeBase: React.CSSProperties = {
  fontFamily: 'system-ui, -apple-system, sans-serif',
  borderRadius: 12,
  boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
  fontSize: 12,
};

const headerStyle = (bg: string): React.CSSProperties => ({
  background: bg,
  borderRadius: '10px 10px 0 0',
  padding: '10px 14px 8px',
  fontWeight: 700,
  fontSize: 13,
  color: C.white,
  letterSpacing: '-0.01em',
});

const bodyStyle: React.CSSProperties = {
  padding: '10px 14px',
  background: C.white,
  borderRadius: '0 0 10px 10px',
};

const badge = (bg: string, color: string): React.CSSProperties => ({
  background: bg,
  color,
  fontSize: 9,
  fontWeight: 700,
  padding: '2px 8px',
  borderRadius: 20,
  display: 'inline-block',
});

const pill = (opacity = 0.2): React.CSSProperties => ({
  background: `rgba(255,255,255,${opacity})`,
  fontSize: 9,
  padding: '2px 6px',
  borderRadius: 10,
  color: C.white,
});

// ─── Node: phos.la site bar ───────────────────────────────────────────────────
function SiteNode(_: NodeProps) {
  return (
    <div
      style={{
        ...nodeBase,
        background: C.teal,
        padding: '14px 20px',
        width: 940,
        border: `2px solid ${C.tealDark}`,
      }}
    >
      <Handle type="source" position={Position.Bottom} id="out" style={{ left: '50%' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ color: C.white, fontWeight: 800, fontSize: 16, letterSpacing: '-0.02em' }}>
            phos.la
          </div>
          <div style={{ color: C.aqua, fontSize: 10, marginTop: 2 }}>
            Vercel · no PHI stored or processed on this platform
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div
            style={{
              background: 'rgba(255,255,255,0.12)',
              borderRadius: 8,
              padding: '6px 14px',
              textAlign: 'center',
            }}
          >
            <div style={{ color: C.white, fontSize: 11, fontWeight: 600 }}>/pricing</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 9, marginTop: 1 }}>
              Static page · real prices
            </div>
          </div>
          <div
            style={{
              background: C.white,
              borderRadius: 8,
              padding: '6px 14px',
              textAlign: 'center',
              border: `2px solid ${C.tealDark}`,
            }}
          >
            <div style={{ color: C.teal, fontSize: 11, fontWeight: 800 }}>/book ←</div>
            <div style={{ color: C.teal, fontSize: 9, marginTop: 1 }}>
              Patient booking entry point
            </div>
          </div>
          <div
            style={{
              background: 'rgba(255,255,255,0.12)',
              borderRadius: 8,
              padding: '6px 14px',
              textAlign: 'center',
            }}
          >
            <div style={{ color: C.white, fontSize: 11, fontWeight: 600 }}>/book/thanks</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 9, marginTop: 1 }}>
              Sets cookie · Stripe CTA
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Node: cookie check decision ──────────────────────────────────────────────
function CookieNode(_: NodeProps) {
  return (
    <div style={{ ...nodeBase, border: `2px solid ${C.orange}`, width: 360 }}>
      <Handle type="target" position={Position.Top} />
      <div style={headerStyle(C.orange)}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>🍪 phos.la/book — Cookie Check</span>
          <span style={pill()}>no PHI · no API call</span>
        </div>
        <div style={{ fontWeight: 400, fontSize: 10, opacity: 0.85, marginTop: 2 }}>
          Reads first-party cookie "phos_returning" on every /book visit
        </div>
      </div>
      <div style={bodyStyle}>
        <div style={{ color: C.gray700, fontSize: 10, lineHeight: 1.7, marginBottom: 8 }}>
          No database. No server request. No email. A boolean cookie set 180 days ago when the
          patient last completed a booking. Entirely client-side — zero PHI leaves the browser.
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={badge(C.redLight, C.red)}>NOT FOUND → new patient default</span>
          <span style={badge(C.greenLight, C.green)}>FOUND → returning tab selected</span>
        </div>
      </div>
      {/* left = new patient (not found), right = returning (found) */}
      <Handle type="source" position={Position.Bottom} id="new" style={{ left: '25%' }} />
      <Handle type="source" position={Position.Bottom} id="returning" style={{ left: '75%' }} />
    </div>
  );
}

// ─── Node: /book page UI — what the patient sees ──────────────────────────────
function BookPageNode({ data }: NodeProps) {
  const d = data as { mode: 'new' | 'returning' };
  const isReturning = d.mode === 'returning';
  const accent = isReturning ? C.purple : C.teal;
  const accentLight = isReturning ? C.purpleLight : C.tealLight;
  const accentDark = isReturning ? C.purpleDark : C.tealDark;

  return (
    <div style={{ ...nodeBase, border: `2px solid ${accent}`, width: 300 }}>
      <Handle type="target" position={Position.Top} />
      <div style={headerStyle(accent)}>
        {isReturning ? 'phos.la/book — Returning View' : 'phos.la/book — First Visit View'}
        <div style={{ fontWeight: 400, fontSize: 10, opacity: 0.85, marginTop: 2 }}>
          {isReturning
            ? 'Cookie found → returning tab auto-selected'
            : 'No cookie → new patient tab is default'}
        </div>
      </div>
      <div style={bodyStyle}>
        {/* Simulated tab bar */}
        <div
          style={{
            display: 'flex',
            gap: 3,
            marginBottom: 10,
            background: C.gray100,
            borderRadius: 6,
            padding: 3,
          }}
        >
          <div
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '4px 0',
              borderRadius: 4,
              fontSize: 9,
              fontWeight: 700,
              background: isReturning ? 'transparent' : accent,
              color: isReturning ? C.gray400 : C.white,
            }}
          >
            New Patient
          </div>
          <div
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '4px 0',
              borderRadius: 4,
              fontSize: 9,
              fontWeight: 700,
              background: isReturning ? accent : 'transparent',
              color: isReturning ? C.white : C.gray400,
            }}
          >
            Returning Patient
          </div>
        </div>

        {isReturning ? (
          <>
            <div style={{ color: C.gray700, fontSize: 10, lineHeight: 1.6, marginBottom: 8 }}>
              "Welcome back." Returning tab auto-selected. Patient sees one button — no decision to
              make, no confusion about which form is theirs.
            </div>
            <div
              style={{
                background: accentLight,
                borderRadius: 6,
                padding: '5px 10px',
                fontSize: 9,
                color: accentDark,
                fontWeight: 600,
              }}
            >
              → Button: "Continue as Returning Patient"
            </div>
          </>
        ) : (
          <>
            <div style={{ color: C.gray700, fontSize: 10, lineHeight: 1.6, marginBottom: 8 }}>
              Both tabs visible. New Patient is the default. Patient can manually switch to
              Returning if they know they've been before and their cookie has cleared.
            </div>
            <div
              style={{
                background: accentLight,
                borderRadius: 6,
                padding: '5px 10px',
                fontSize: 9,
                color: accentDark,
                fontWeight: 600,
              }}
            >
              → Button: "Begin New Patient Intake"
            </div>
          </>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

// ─── Node: JotForm (new or returning) ────────────────────────────────────────
function JotFormNode({ data }: NodeProps) {
  const d = data as { type: 'new' | 'returning' };
  const isReturning = d.type === 'returning';
  const color = isReturning ? C.purple : C.teal;
  const light = isReturning ? C.purpleLight : C.tealLight;
  const dark = isReturning ? C.purpleDark : C.tealDark;

  return (
    <div style={{ ...nodeBase, border: `2px solid ${color}`, width: 300 }}>
      <Handle type="target" position={Position.Top} />
      <div style={headerStyle(color)}>
        <div>{isReturning ? 'Existing Patient Form' : 'New Patient Form'}</div>
        <div style={{ fontWeight: 400, fontSize: 10, opacity: 0.85, marginTop: 2 }}>
          hipaa.jotform.com · HIPAA Gold · BAA · Custom CSS branding
        </div>
      </div>
      <div style={bodyStyle}>
        {isReturning ? (
          <>
            <div style={{ color: C.gray600, fontSize: 9, lineHeight: 1.7 }}>• Name, email</div>
            <div style={{ color: C.gray600, fontSize: 9, lineHeight: 1.7 }}>
              • Preferred appointment date + time
            </div>
            <div style={{ color: C.gray600, fontSize: 9, lineHeight: 1.7 }}>
              • Reason for visit / any changes since last
            </div>
            <div style={{ color: C.gray600, fontSize: 9, lineHeight: 1.7 }}>
              • Therapist update (if BYOT or changed)
            </div>
            <div style={{ color: C.gray400, fontSize: 9, lineHeight: 1.7, marginTop: 4 }}>
              · ~4 fields · no medical history re-entry
            </div>
            <div style={{ color: C.gray400, fontSize: 9, lineHeight: 1.7 }}>
              · All clinical data already in DrChrono
            </div>
          </>
        ) : (
          <>
            <div style={{ color: C.gray600, fontSize: 9, lineHeight: 1.7 }}>
              • Name, DOB, phone, email, address
            </div>
            <div style={{ color: C.gray600, fontSize: 9, lineHeight: 1.7 }}>
              • Medical history + current medications
            </div>
            <div style={{ color: C.gray600, fontSize: 9, lineHeight: 1.7 }}>
              • Insurance, emergency contact
            </div>
            <div style={{ color: C.gray600, fontSize: 9, lineHeight: 1.7 }}>
              • Therapist (BYOT) + consent + e-signature
            </div>
            <div style={{ color: C.gray400, fontSize: 9, lineHeight: 1.7, marginTop: 4 }}>
              · No CC field — Stripe handles payment
            </div>
            <div style={{ color: C.gray400, fontSize: 9, lineHeight: 1.7 }}>
              · ~15 fields · filled once, never again
            </div>
          </>
        )}
        <div
          style={{
            marginTop: 8,
            background: light,
            borderRadius: 6,
            padding: '4px 8px',
            fontSize: 9,
            color: dark,
            fontWeight: 600,
          }}
        >
          Thank You redirect → phos.la/book/thanks?type={isReturning ? 'returning' : 'new'}
        </div>
      </div>
      {/* redirect → thanks, webhook → keragon */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="redirect"
        style={{ left: isReturning ? '65%' : '35%' }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="webhook"
        style={{ left: isReturning ? '35%' : '65%' }}
      />
    </div>
  );
}

// ─── Node: /book/thanks ───────────────────────────────────────────────────────
function ThanksNode(_: NodeProps) {
  return (
    <div style={{ ...nodeBase, border: `2px solid ${C.green}`, width: 360 }}>
      <Handle type="target" position={Position.Top} id="from-new" style={{ left: '30%' }} />
      <Handle type="target" position={Position.Top} id="from-returning" style={{ left: '70%' }} />
      <div style={headerStyle(C.green)}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>phos.la/book/thanks</span>
          <span style={pill()}>no PHI</span>
        </div>
        <div style={{ fontWeight: 400, fontSize: 10, opacity: 0.85, marginTop: 2 }}>
          JotForm thank-you redirect lands here — reads ?type= param
        </div>
      </div>
      <div style={bodyStyle}>
        <div
          style={{
            background: C.greenLight,
            borderRadius: 6,
            padding: '6px 10px',
            marginBottom: 8,
          }}
        >
          <div style={{ color: C.green, fontSize: 9, fontWeight: 700, marginBottom: 2 }}>
            🍪 Sets cookie: phos_returning=true (180-day expiry)
          </div>
          <div style={{ color: C.gray600, fontSize: 9 }}>
            Next visit to /book auto-selects the Returning Patient tab. No re-entry, no confusion.
          </div>
        </div>
        <div style={{ color: C.gray700, fontSize: 10, lineHeight: 1.6 }}>
          Shows contextual confirmation copy — "You're all set" (new) or "See you soon" (returning)
          — then a Stripe payment CTA for the deposit or session fee.
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

// ─── Node: Stripe ─────────────────────────────────────────────────────────────
function StripeNode(_: NodeProps) {
  return (
    <div style={{ ...nodeBase, border: '2px solid #635bff', width: 940 }}>
      <Handle type="target" position={Position.Top} />
      <div style={headerStyle('#635bff')}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Stripe — Payments</span>
          <div style={{ display: 'flex', gap: 6 }}>
            <span style={pill()}>PCI compliant</span>
            <span style={pill()}>no CC in JotForm</span>
            <span style={pill()}>Customer Portal for card updates</span>
          </div>
        </div>
      </div>
      <div style={{ ...bodyStyle, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div style={{ background: '#f5f3ff', borderRadius: 8, padding: '8px 10px' }}>
          <div style={{ color: '#635bff', fontWeight: 700, fontSize: 10, marginBottom: 4 }}>
            New Patient — Deposit
          </div>
          <div style={{ color: C.gray600, fontSize: 9, lineHeight: 1.6 }}>
            Stripe Payment Link. Amount TBD ($100–$200). Holds first appointment slot. Credited
            toward session cost or refunded if candidacy screen fails.
          </div>
        </div>
        <div style={{ background: '#f5f3ff', borderRadius: 8, padding: '8px 10px' }}>
          <div style={{ color: '#635bff', fontWeight: 700, fontSize: 10, marginBottom: 4 }}>
            Returning Patient — Session + At-Home Sub
          </div>
          <div style={{ color: C.gray600, fontSize: 9, lineHeight: 1.6 }}>
            $400/session membership rate via Stripe Payment Link. At-home ketamine subscription
            $65/mo via Stripe Billing. Customer Portal for card management.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Node: Keragon (2-column) ─────────────────────────────────────────────────
function KeragonNode({ data }: NodeProps) {
  const d = data as { workflowA: string[]; workflowB: string[] };
  return (
    <div style={{ ...nodeBase, border: `2px solid ${C.amber}`, width: 940 }}>
      <Handle type="target" position={Position.Top} id="new" style={{ left: '25%' }} />
      <Handle type="target" position={Position.Top} id="returning" style={{ left: '75%' }} />
      <div style={headerStyle(C.amber)}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>KERAGON — HIPAA Integration Bridge</span>
          <div style={{ display: 'flex', gap: 6 }}>
            <span style={pill()}>$269/mo</span>
            <span style={pill()}>SOC2 Type II</span>
            <span style={pill()}>BAA signed</span>
          </div>
        </div>
        <div style={{ fontWeight: 400, fontSize: 10, opacity: 0.85, marginTop: 2 }}>
          Receives JotForm webhooks async · Maps fields to DrChrono · Manages OAuth2 · Retries on
          failure · Full audit log
        </div>
      </div>
      <div style={{ ...bodyStyle, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div style={{ background: C.amberLight, borderRadius: 8, padding: '8px 10px' }}>
          <div style={{ color: C.amber, fontWeight: 700, fontSize: 10, marginBottom: 4 }}>
            Workflow A — New Patient
          </div>
          {d.workflowA.map((line: string, i: number) => (
            <div key={i} style={{ color: C.gray600, fontSize: 9, lineHeight: 1.6 }}>
              {line}
            </div>
          ))}
        </div>
        <div style={{ background: C.amberLight, borderRadius: 8, padding: '8px 10px' }}>
          <div style={{ color: C.amber, fontWeight: 700, fontSize: 10, marginBottom: 4 }}>
            Workflow B — Returning Patient
          </div>
          {d.workflowB.map((line: string, i: number) => (
            <div key={i} style={{ color: C.gray600, fontSize: 9, lineHeight: 1.6 }}>
              {line}
            </div>
          ))}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="new" style={{ left: '25%' }} />
      <Handle type="source" position={Position.Bottom} id="returning" style={{ left: '75%' }} />
    </div>
  );
}

// ─── Node: DrChrono (2-column) ────────────────────────────────────────────────
function DrChronoNode({ data }: NodeProps) {
  const d = data as { resultA: string[]; resultB: string[] };
  return (
    <div style={{ ...nodeBase, border: `2px solid ${C.blue}`, width: 940 }}>
      <Handle type="target" position={Position.Top} id="new" style={{ left: '25%' }} />
      <Handle type="target" position={Position.Top} id="returning" style={{ left: '75%' }} />
      <div style={headerStyle(C.blue)}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>DrChrono — EHR, Clinical System of Record</span>
          <span style={pill()}>BAA signed</span>
        </div>
      </div>
      <div style={{ ...bodyStyle, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div style={{ background: C.blueLight, borderRadius: 8, padding: '8px 10px' }}>
          <div style={{ color: C.blue, fontWeight: 700, fontSize: 10, marginBottom: 4 }}>
            New Patient Chart Created
          </div>
          {d.resultA.map((line: string, i: number) => (
            <div key={i} style={{ color: C.gray600, fontSize: 9, lineHeight: 1.6 }}>
              {line}
            </div>
          ))}
        </div>
        <div style={{ background: C.blueLight, borderRadius: 8, padding: '8px 10px' }}>
          <div style={{ color: C.blue, fontWeight: 700, fontSize: 10, marginBottom: 4 }}>
            Returning — Appointment Added to Chart
          </div>
          {d.resultB.map((line: string, i: number) => (
            <div key={i} style={{ color: C.gray600, fontSize: 9, lineHeight: 1.6 }}>
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Node type registry ───────────────────────────────────────────────────────
const nodeTypes = {
  site: SiteNode,
  cookie: CookieNode,
  bookpage: BookPageNode,
  jotform: JotFormNode,
  thanks: ThanksNode,
  keragon: KeragonNode,
  drchrono: DrChronoNode,
  stripe: StripeNode,
};

// ─── Layout constants ─────────────────────────────────────────────────────────
// Wide nodes (site, keragon, drchrono, stripe): x=0, w=940
// New patient column: x=20,  node w=300, center ≈ 170   → handles at ~25% of 940 = 235
// Returning patient column: x=620, node w=300, center ≈ 770  → handles at ~75% of 940 = 705
// Center nodes (cookie, thanks): x=(940-360)/2 = 290, w=360, center = 470

const initialNodes: Node[] = [
  // ── Site bar ──
  {
    id: 'site',
    type: 'site',
    position: { x: 0, y: 0 },
    data: {},
  },

  // ── Cookie check ──
  {
    id: 'cookie',
    type: 'cookie',
    position: { x: 290, y: 110 },
    data: {},
  },

  // ── /book page views ──
  {
    id: 'book-new',
    type: 'bookpage',
    position: { x: 20, y: 330 },
    data: { mode: 'new' },
  },
  {
    id: 'book-returning',
    type: 'bookpage',
    position: { x: 620, y: 330 },
    data: { mode: 'returning' },
  },

  // ── JotForms ──
  {
    id: 'form-new',
    type: 'jotform',
    position: { x: 20, y: 580 },
    data: { type: 'new' },
  },
  {
    id: 'form-returning',
    type: 'jotform',
    position: { x: 620, y: 580 },
    data: { type: 'returning' },
  },

  // ── Thanks page ──
  {
    id: 'thanks',
    type: 'thanks',
    position: { x: 290, y: 850 },
    data: {},
  },

  // ── Backend infrastructure ──
  {
    id: 'keragon',
    type: 'keragon',
    position: { x: 0, y: 1090 },
    data: {
      workflowA: [
        '1. Receive JotForm webhook (new patient submission)',
        '2. Map ~15 fields → DrChrono patient schema',
        '   first_name, last_name, date_of_birth, email...',
        '3. POST /api/patients → chart created, patient_id returned',
        '4. Log run. Alert Katie on error.',
      ],
      workflowB: [
        '1. Receive JotForm webhook (existing patient submission)',
        '2. GET /api/patients?search={email} → find patient_id',
        "3. POST /api/appointments → add to Katie's schedule",
        '4. If patient NOT found in DrChrono → alert Katie,',
        '   do NOT create partial record silently.',
      ],
    },
  },
  {
    id: 'drchrono',
    type: 'drchrono',
    position: { x: 0, y: 1340 },
    data: {
      resultA: [
        'Full chart created: demographics, medical history,',
        'consent docs, insurance. Zero staff data entry.',
        'Katie sees a complete patient before first session.',
      ],
      resultB: [
        "Appointment booked on Katie's schedule.",
        'Prior PA notes, session history, meds all accessible.',
        'No re-entry. No duplicate chart risk.',
      ],
    },
  },
  {
    id: 'stripe',
    type: 'stripe',
    position: { x: 0, y: 1560 },
    data: {},
  },
];

// ─── Edges ────────────────────────────────────────────────────────────────────
const edgeBase = {
  type: 'smoothstep' as const,
  style: { strokeWidth: 2 },
};

const initialEdges: Edge[] = [
  // site → cookie
  {
    id: 'e-site-cookie',
    source: 'site',
    sourceHandle: 'out',
    target: 'cookie',
    ...edgeBase,
    style: { ...edgeBase.style, stroke: C.teal },
    label: 'patient visits /book',
    labelStyle: { fontSize: 10, fill: C.teal, fontWeight: 600 },
    labelBgStyle: { fill: C.tealLight },
  },

  // cookie → book-new (no cookie)
  {
    id: 'e-cookie-new',
    source: 'cookie',
    sourceHandle: 'new',
    target: 'book-new',
    ...edgeBase,
    style: { ...edgeBase.style, stroke: C.red },
    label: 'no cookie',
    labelStyle: { fontSize: 10, fill: C.red, fontWeight: 700 },
    labelBgStyle: { fill: C.redLight },
  },

  // cookie → book-returning (cookie found)
  {
    id: 'e-cookie-returning',
    source: 'cookie',
    sourceHandle: 'returning',
    target: 'book-returning',
    ...edgeBase,
    style: { ...edgeBase.style, stroke: C.green },
    label: 'cookie found',
    labelStyle: { fontSize: 10, fill: C.green, fontWeight: 700 },
    labelBgStyle: { fill: C.greenLight },
  },

  // book-new → form-new
  {
    id: 'e-booknew-formnew',
    source: 'book-new',
    target: 'form-new',
    ...edgeBase,
    style: { ...edgeBase.style, stroke: C.teal },
    label: 'clicks CTA',
    labelStyle: { fontSize: 9, fill: C.teal },
    labelBgStyle: { fill: C.tealLight },
  },

  // book-returning → form-returning
  {
    id: 'e-bookreturning-formreturning',
    source: 'book-returning',
    target: 'form-returning',
    ...edgeBase,
    style: { ...edgeBase.style, stroke: C.purple },
    label: 'clicks CTA',
    labelStyle: { fontSize: 9, fill: C.purple },
    labelBgStyle: { fill: C.purpleLight },
  },

  // form-new → thanks (thank-you redirect)
  {
    id: 'e-formnew-thanks',
    source: 'form-new',
    sourceHandle: 'redirect',
    target: 'thanks',
    targetHandle: 'from-new',
    ...edgeBase,
    style: { ...edgeBase.style, stroke: C.teal },
    label: 'thank-you redirect',
    labelStyle: { fontSize: 9, fill: C.gray600 },
    labelBgStyle: { fill: C.gray100 },
  },

  // form-returning → thanks (thank-you redirect)
  {
    id: 'e-formreturning-thanks',
    source: 'form-returning',
    sourceHandle: 'redirect',
    target: 'thanks',
    targetHandle: 'from-returning',
    ...edgeBase,
    style: { ...edgeBase.style, stroke: C.purple },
    label: 'thank-you redirect',
    labelStyle: { fontSize: 9, fill: C.gray600 },
    labelBgStyle: { fill: C.gray100 },
  },

  // form-new → keragon (async webhook)
  {
    id: 'e-formnew-keragon',
    source: 'form-new',
    sourceHandle: 'webhook',
    target: 'keragon',
    targetHandle: 'new',
    ...edgeBase,
    animated: true,
    style: { ...edgeBase.style, stroke: C.amber, strokeDasharray: '6,3' },
    label: 'webhook (async)',
    labelStyle: { fontSize: 9, fill: C.amber, fontWeight: 600 },
    labelBgStyle: { fill: C.amberLight },
  },

  // form-returning → keragon (async webhook)
  {
    id: 'e-formreturning-keragon',
    source: 'form-returning',
    sourceHandle: 'webhook',
    target: 'keragon',
    targetHandle: 'returning',
    ...edgeBase,
    animated: true,
    style: { ...edgeBase.style, stroke: C.amber, strokeDasharray: '6,3' },
    label: 'webhook (async)',
    labelStyle: { fontSize: 9, fill: C.amber, fontWeight: 600 },
    labelBgStyle: { fill: C.amberLight },
  },

  // thanks → stripe (patient-facing payment)
  {
    id: 'e-thanks-stripe',
    source: 'thanks',
    target: 'stripe',
    ...edgeBase,
    style: { ...edgeBase.style, stroke: C.green },
    label: 'Stripe CTA click',
    labelStyle: { fontSize: 9, fill: C.green, fontWeight: 600 },
    labelBgStyle: { fill: C.greenLight },
  },

  // keragon → drchrono (new patient)
  {
    id: 'e-keragon-dc-new',
    source: 'keragon',
    sourceHandle: 'new',
    target: 'drchrono',
    targetHandle: 'new',
    ...edgeBase,
    style: { ...edgeBase.style, stroke: C.amber },
  },

  // keragon → drchrono (returning patient)
  {
    id: 'e-keragon-dc-returning',
    source: 'keragon',
    sourceHandle: 'returning',
    target: 'drchrono',
    targetHandle: 'returning',
    ...edgeBase,
    style: { ...edgeBase.style, stroke: C.amber },
  },
];

// ─── Main component ───────────────────────────────────────────────────────────
export default function CookieFlowDiagram() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div style={{ width: '100%', height: '100vh', background: '#f8fafc' }}>
      {/* Legend */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          right: 60,
          zIndex: 10,
          background: C.white,
          borderRadius: 8,
          padding: '8px 12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
          fontFamily: 'system-ui, sans-serif',
          fontSize: 9,
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 4, color: C.gray700 }}>
          OPTION 2 — Cookie-Based Detection
        </div>
        <div style={{ color: C.gray600, marginBottom: 2 }}>━━ Patient browser flow</div>
        <div style={{ color: C.amber, marginBottom: 2 }}>╌╌ JotForm webhook (async, HIPAA)</div>
        <div style={{ color: C.gray400 }}>No PHI on Vercel · No database · Cookie only</div>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.1 }}
        minZoom={0.15}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#cbd5e1" />
      </ReactFlow>
    </div>
  );
}
