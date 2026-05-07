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

// ─── Brand tokens ────────────────────────────────────────────────────────────
const C = {
  teal: '#358c7a',
  tealDark: '#2a7062',
  tealLight: '#e8f4f1',
  aqua: '#80bcac',
  navy: '#1e3a48',
  amber: '#b88c50',
  amberLight: '#f9f2e8',
  cream: '#ede8dc',
  purple: '#6b46c1',
  purpleLight: '#f3f0ff',
  purpleDark: '#553c9a',
  red: '#c53030',
  redLight: '#fff5f5',
  green: '#276749',
  greenLight: '#f0fff4',
  blue: '#2b6cb0',
  blueLight: '#ebf8ff',
  // IV Spa colour
  spa: '#38a169',
  spaLight: '#e6ffed',
  spaDark: '#276749',
  white: '#ffffff',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray400: '#9ca3af',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
};

// ─── Shared node styles ───────────────────────────────────────────────────────
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

// ─── Custom node: Site Bar ────────────────────────────────────────────────────
function SiteNode({ data }: NodeProps) {
  return (
    <div
      style={{
        ...nodeBase,
        background: C.teal,
        padding: '14px 20px',
        width: 1280,
        border: `2px solid ${C.tealDark}`,
      }}
    >
      {/* Handles aligned with form column centres */}
      <Handle type="source" position={Position.Bottom} id="left" style={{ left: '20%' }} />
      <Handle type="source" position={Position.Bottom} id="book" style={{ left: '53%' }} />
      <Handle type="source" position={Position.Bottom} id="spa" style={{ left: '71%' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ color: C.white, fontWeight: 800, fontSize: 16, letterSpacing: '-0.02em' }}>
            phos.la
          </div>
          <div style={{ color: C.aqua, fontSize: 10, marginTop: 2 }}>
            Vercel · zero PHI stored or processed
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
          <div style={{ color: C.white, fontSize: 11, fontWeight: 600 }}>/pricing</div>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 9, marginTop: 1 }}>
            Real page · no form
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div
            style={{
              background: C.white,
              borderRadius: 8,
              padding: '6px 14px',
              textAlign: 'center',
            }}
          >
            <div style={{ color: C.teal, fontSize: 11, fontWeight: 700 }}>New Patient</div>
            <div style={{ color: C.teal, fontSize: 9, marginTop: 1 }}>First consultation →</div>
          </div>
          <div
            style={{
              background: C.white,
              borderRadius: 8,
              padding: '6px 14px',
              textAlign: 'center',
            }}
          >
            <div style={{ color: C.purple, fontSize: 11, fontWeight: 700 }}>Book a Session</div>
            <div style={{ color: C.purple, fontSize: 9, marginTop: 1 }}>New or returning →</div>
          </div>
          <div
            style={{
              background: C.white,
              borderRadius: 8,
              padding: '6px 14px',
              textAlign: 'center',
            }}
          >
            <div style={{ color: C.spa, fontSize: 11, fontWeight: 700 }}>IV Spa & Wellness</div>
            <div style={{ color: C.spa, fontSize: 9, marginTop: 1 }}>
              NAD+ · Myers · Glutathione →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Custom node: Form (JotForm intake) ──────────────────────────────────────
function FormNode({ data }: NodeProps) {
  const d = data as { title: string; subtitle: string; fields: string[]; color: string };
  return (
    <div style={{ ...nodeBase, border: `2px solid ${d.color}`, width: 300 }}>
      <Handle type="target" position={Position.Top} />
      <div style={headerStyle(d.color)}>
        <div>{d.title}</div>
        <div style={{ fontWeight: 400, fontSize: 10, opacity: 0.85, marginTop: 2 }}>
          {d.subtitle}
        </div>
      </div>
      <div style={bodyStyle}>
        {d.fields.map((f: string, i: number) => (
          <div
            key={i}
            style={{
              color: f.startsWith('·') ? C.gray400 : C.gray700,
              fontSize: 10,
              lineHeight: '1.6',
              paddingLeft: f.startsWith('·') ? 6 : 0,
            }}
          >
            {f}
          </div>
        ))}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

// ─── Custom node: Email Lookup ────────────────────────────────────────────────
function LookupNode({ data }: NodeProps) {
  const d = data as { title: string; subtitle: string; note: string };
  return (
    <div style={{ ...nodeBase, border: `2px solid ${C.purple}`, width: 300 }}>
      <Handle type="target" position={Position.Top} />
      <div style={headerStyle(C.purple)}>
        <div>{d.title}</div>
        <div style={{ fontWeight: 400, fontSize: 10, opacity: 0.85, marginTop: 2 }}>
          {d.subtitle}
        </div>
      </div>
      <div style={bodyStyle}>
        <div style={{ color: C.gray700, fontSize: 10, lineHeight: '1.7' }}>{d.note}</div>
        <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
          <span
            style={{
              background: C.greenLight,
              color: C.green,
              fontSize: 9,
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: 20,
            }}
          >
            FOUND → returning form
          </span>
          <span
            style={{
              background: C.redLight,
              color: C.red,
              fontSize: 9,
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: 20,
            }}
          >
            NOT FOUND → new patient
          </span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="found" style={{ left: '30%' }} />
      <Handle type="source" position={Position.Left} id="notfound" />
    </div>
  );
}

// ─── Custom node: Keragon (3-column) ─────────────────────────────────────────
function KeragonNode({ data }: NodeProps) {
  const d = data as { workflowA: string[]; workflowB: string[]; workflowC: string[] };
  return (
    <div style={{ ...nodeBase, border: `2px solid ${C.amber}`, width: 1000 }}>
      <Handle type="target" position={Position.Top} id="left" style={{ left: '17%' }} />
      <Handle type="target" position={Position.Top} id="center" style={{ left: '50%' }} />
      <Handle type="target" position={Position.Top} id="right" style={{ left: '83%' }} />
      <div style={headerStyle(C.amber)}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>KERAGON — HIPAA Integration Bridge</span>
          <div style={{ display: 'flex', gap: 6 }}>
            <span
              style={{
                background: 'rgba(255,255,255,0.2)',
                fontSize: 9,
                padding: '2px 6px',
                borderRadius: 10,
              }}
            >
              $269/mo
            </span>
            <span
              style={{
                background: 'rgba(255,255,255,0.2)',
                fontSize: 9,
                padding: '2px 6px',
                borderRadius: 10,
              }}
            >
              SOC2 Type II
            </span>
            <span
              style={{
                background: 'rgba(255,255,255,0.2)',
                fontSize: 9,
                padding: '2px 6px',
                borderRadius: 10,
              }}
            >
              BAA signed
            </span>
          </div>
        </div>
        <div style={{ fontWeight: 400, fontSize: 10, opacity: 0.85, marginTop: 2 }}>
          Receives JotForm webhooks · Maps fields · Manages DrChrono OAuth2 · Retries on failure ·
          Audit logs every run
        </div>
      </div>
      <div style={{ ...bodyStyle, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        <div style={{ background: C.amberLight, borderRadius: 8, padding: '8px 10px' }}>
          <div style={{ color: C.amber, fontWeight: 700, fontSize: 10, marginBottom: 4 }}>
            Workflow A — New Patient
          </div>
          {d.workflowA.map((line: string, i: number) => (
            <div key={i} style={{ color: C.gray600, fontSize: 9, lineHeight: '1.6' }}>
              {line}
            </div>
          ))}
        </div>
        <div style={{ background: C.amberLight, borderRadius: 8, padding: '8px 10px' }}>
          <div style={{ color: C.amber, fontWeight: 700, fontSize: 10, marginBottom: 4 }}>
            Workflow B — Returning Patient
          </div>
          {d.workflowB.map((line: string, i: number) => (
            <div key={i} style={{ color: C.gray600, fontSize: 9, lineHeight: '1.6' }}>
              {line}
            </div>
          ))}
        </div>
        <div style={{ background: C.spaLight, borderRadius: 8, padding: '8px 10px' }}>
          <div style={{ color: C.spa, fontWeight: 700, fontSize: 10, marginBottom: 4 }}>
            Workflow C — IV Spa
          </div>
          {d.workflowC.map((line: string, i: number) => (
            <div key={i} style={{ color: C.gray600, fontSize: 9, lineHeight: '1.6' }}>
              {line}
            </div>
          ))}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="left" style={{ left: '17%' }} />
      <Handle type="source" position={Position.Bottom} id="center" style={{ left: '50%' }} />
      <Handle type="source" position={Position.Bottom} id="right" style={{ left: '83%' }} />
    </div>
  );
}

// ─── Custom node: DrChrono (3-column) ────────────────────────────────────────
function DrChronoNode({ data }: NodeProps) {
  const d = data as { resultA: string[]; resultB: string[]; resultC: string[] };
  return (
    <div style={{ ...nodeBase, border: `2px solid ${C.blue}`, width: 1000 }}>
      <Handle type="target" position={Position.Top} id="left" style={{ left: '17%' }} />
      <Handle type="target" position={Position.Top} id="center" style={{ left: '50%' }} />
      <Handle type="target" position={Position.Top} id="right" style={{ left: '83%' }} />
      <div style={headerStyle(C.blue)}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>DrChrono — EHR, System of Record</span>
          <span
            style={{
              background: 'rgba(255,255,255,0.2)',
              fontSize: 9,
              padding: '2px 6px',
              borderRadius: 10,
            }}
          >
            BAA signed
          </span>
        </div>
      </div>
      <div style={{ ...bodyStyle, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        <div style={{ background: C.blueLight, borderRadius: 8, padding: '8px 10px' }}>
          <div style={{ color: C.blue, fontWeight: 700, fontSize: 10, marginBottom: 4 }}>
            New Patient Chart Created
          </div>
          {d.resultA.map((line: string, i: number) => (
            <div key={i} style={{ color: C.gray600, fontSize: 9, lineHeight: '1.6' }}>
              {line}
            </div>
          ))}
        </div>
        <div style={{ background: C.blueLight, borderRadius: 8, padding: '8px 10px' }}>
          <div style={{ color: C.blue, fontWeight: 700, fontSize: 10, marginBottom: 4 }}>
            Appointment Added to Chart
          </div>
          {d.resultB.map((line: string, i: number) => (
            <div key={i} style={{ color: C.gray600, fontSize: 9, lineHeight: '1.6' }}>
              {line}
            </div>
          ))}
        </div>
        <div style={{ background: C.spaLight, borderRadius: 8, padding: '8px 10px' }}>
          <div style={{ color: C.spa, fontWeight: 700, fontSize: 10, marginBottom: 4 }}>
            IV Spa Appointment
          </div>
          {d.resultC.map((line: string, i: number) => (
            <div key={i} style={{ color: C.gray600, fontSize: 9, lineHeight: '1.6' }}>
              {line}
            </div>
          ))}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="left" style={{ left: '17%' }} />
      <Handle type="source" position={Position.Bottom} id="center" style={{ left: '50%' }} />
      <Handle type="source" position={Position.Bottom} id="right" style={{ left: '83%' }} />
    </div>
  );
}

// ─── Custom node: Stripe (3-column) ──────────────────────────────────────────
function StripeNode({ data }: NodeProps) {
  const d = data as { paymentA: string; paymentB: string; paymentC: string };
  return (
    <div style={{ ...nodeBase, border: `2px solid #635bff`, width: 1000 }}>
      <Handle type="target" position={Position.Top} id="left" style={{ left: '17%' }} />
      <Handle type="target" position={Position.Top} id="center" style={{ left: '50%' }} />
      <Handle type="target" position={Position.Top} id="right" style={{ left: '83%' }} />
      <div style={headerStyle('#635bff')}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Stripe — Payments</span>
          <div style={{ display: 'flex', gap: 6 }}>
            <span
              style={{
                background: 'rgba(255,255,255,0.2)',
                fontSize: 9,
                padding: '2px 6px',
                borderRadius: 10,
              }}
            >
              PCI compliant
            </span>
            <span
              style={{
                background: 'rgba(255,255,255,0.2)',
                fontSize: 9,
                padding: '2px 6px',
                borderRadius: 10,
              }}
            >
              BAA signed
            </span>
            <span
              style={{
                background: 'rgba(255,255,255,0.2)',
                fontSize: 9,
                padding: '2px 6px',
                borderRadius: 10,
              }}
            >
              no CC in JotForm
            </span>
          </div>
        </div>
      </div>
      <div style={{ ...bodyStyle, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
        <div style={{ background: '#f5f3ff', borderRadius: 8, padding: '8px 10px' }}>
          <div style={{ color: '#635bff', fontWeight: 700, fontSize: 10, marginBottom: 2 }}>
            New Ketamine Patient — Deposit
          </div>
          <div style={{ color: C.gray600, fontSize: 9 }}>{d.paymentA}</div>
        </div>
        <div style={{ background: '#f5f3ff', borderRadius: 8, padding: '8px 10px' }}>
          <div style={{ color: '#635bff', fontWeight: 700, fontSize: 10, marginBottom: 2 }}>
            Returning — Session + At-Home Sub
          </div>
          <div style={{ color: C.gray600, fontSize: 9 }}>{d.paymentB}</div>
        </div>
        <div style={{ background: C.spaLight, borderRadius: 8, padding: '8px 10px' }}>
          <div style={{ color: C.spa, fontWeight: 700, fontSize: 10, marginBottom: 2 }}>
            IV Spa — Session Payment
          </div>
          <div style={{ color: C.gray600, fontSize: 9 }}>{d.paymentC}</div>
        </div>
      </div>
    </div>
  );
}

// ─── Node types registry ──────────────────────────────────────────────────────
const nodeTypes = {
  site: SiteNode,
  form: FormNode,
  lookup: LookupNode,
  keragon: KeragonNode,
  drchrono: DrChronoNode,
  stripe: StripeNode,
};

// ─── Initial nodes ────────────────────────────────────────────────────────────
// Three columns aligned to Keragon/DrChrono/Stripe handle positions:
//   left 17% of 1000 + 80 = 250   → form-new   centre (x:100 + 150 = 250) ✓
//   centre 50% of 1000 + 80 = 580 → lookup centre (x:530 + 150 = 680) ~ok
//   right  83% of 1000 + 80 = 910 → iv-spa centre (x:760 + 150 = 910) ✓
const initialNodes: Node[] = [
  {
    id: 'site',
    type: 'site',
    position: { x: 0, y: 0 },
    data: {},
    draggable: true,
  },

  // ── Column 1: New Patient (ketamine) ──
  {
    id: 'form-new',
    type: 'form',
    position: { x: 100, y: 160 },
    data: {
      title: 'New Patient Form',
      subtitle: 'intake.phos.la · Branded CSS · HIPAA Gold',
      color: C.teal,
      fields: [
        '• Name, DOB, phone, email, address',
        '• Medical history + current medications',
        '• Insurance, emergency contact',
        '• Therapist (BYOT) + consent + e-signature',
        '· No CC field — Stripe redirect after submit',
        '· ~15 fields · one time only · never repeated',
      ],
    },
  },

  // ── Column 2: Book a Session (returning patient email lookup) ──
  {
    id: 'lookup',
    type: 'lookup',
    position: { x: 530, y: 160 },
    data: {
      title: 'Book a Session',
      subtitle: 'phos.la/book · patient enters email',
      note: 'Vercel API checks JotForm for prior submission on that email (stateless — email transits but is never stored). Routes patient to correct form instantly.',
    },
  },
  {
    id: 'form-returning',
    type: 'form',
    position: { x: 530, y: 400 },
    data: {
      title: 'Returning Patient Form',
      subtitle: 'intake.phos.la · 3 fields only · email pre-filled',
      color: C.purple,
      fields: [
        '• Email (pre-filled, read-only)',
        '• Preferred appointment date + time',
        '• Therapist (if BYOT or changed)',
        '· No demographics, history, consent',
        '· All already in DrChrono from visit 1',
      ],
    },
  },

  // ── Column 3: IV Spa & Wellness ──
  {
    id: 'iv-spa',
    type: 'form',
    position: { x: 760, y: 160 },
    data: {
      title: 'IV Spa Form',
      subtitle: 'intake.phos.la · Wellness track · lighter intake',
      color: C.spa,
      fields: [
        '• Name, email, phone, date of birth',
        '• Service: NAD+ / Myers Cocktail / Glutathione',
        '• Known allergies + current medications',
        '• Medical clearance checkbox',
        '· No mental health history required',
        '· ~8 fields · faster than ketamine intake',
      ],
    },
  },

  // ── Shared infrastructure ──
  {
    id: 'keragon',
    type: 'keragon',
    position: { x: 80, y: 680 },
    data: {
      workflowA: [
        'Map ~15 fields → first_name, last_name, date_of_birth...',
        'POST /api/patients → chart created, patient_id returned',
        'Optional: grant OnPatient portal access',
      ],
      workflowB: [
        'GET /api/patients?search={email} → find patient_id',
        "POST /api/appointments → on Katie's schedule",
        'If not found → alert Katie, do NOT create partial record',
      ],
      workflowC: [
        'GET /api/patients?search={email} → check for existing chart',
        'If none: POST /api/patients (basic chart, no psych history)',
        'POST /api/appointments → IV spa schedule',
        'Shorter field map, no consent/insurance docs',
      ],
    },
  },
  {
    id: 'drchrono',
    type: 'drchrono',
    position: { x: 80, y: 940 },
    data: {
      resultA: [
        'Full chart created: demographics, history,',
        'consent, insurance. Zero staff data entry.',
        'OnPatient access granted if configured.',
      ],
      resultB: [
        "Appointment on Katie's schedule.",
        'Prior PA notes, adjunct history, meds accessible.',
        'No re-entry. No duplicate chart risk. Ever.',
      ],
      resultC: [
        'Lightweight chart or existing chart updated.',
        'IV spa appointment on wellness schedule.',
        'Service type + allergies recorded.',
        'No psychiatric eval required.',
      ],
    },
  },
  {
    id: 'stripe',
    type: 'stripe',
    position: { x: 80, y: 1160 },
    data: {
      paymentA: 'JotForm thank-you → Stripe Payment Link · Deposit amount TBD ($100–$200)',
      paymentB:
        'Session rate $400 member · At-home subscription $65/mo via Stripe Billing · Customer Portal for card mgmt',
      paymentC:
        'Full session rate upfront (no deposit model) · Per-service pricing: NAD+, Myers, Glutathione · Stripe Payment Link on JotForm thank-you',
    },
  },
];

// ─── Initial edges ────────────────────────────────────────────────────────────
const edgeDefaults = {
  type: 'smoothstep' as const,
  style: { strokeWidth: 2 },
};

const initialEdges: Edge[] = [
  // site → new patient form (col 1)
  {
    id: 'e-site-new',
    source: 'site',
    sourceHandle: 'left',
    target: 'form-new',
    ...edgeDefaults,
    style: { ...edgeDefaults.style, stroke: C.teal },
    label: 'New Patient CTA',
    labelStyle: { fontSize: 10, fill: C.teal, fontWeight: 600 },
    labelBgStyle: { fill: C.tealLight },
  },
  // site → book a session (col 2)
  {
    id: 'e-site-book',
    source: 'site',
    sourceHandle: 'book',
    target: 'lookup',
    ...edgeDefaults,
    style: { ...edgeDefaults.style, stroke: C.purple },
    label: 'Book a Session CTA',
    labelStyle: { fontSize: 10, fill: C.purple, fontWeight: 600 },
    labelBgStyle: { fill: C.purpleLight },
  },
  // site → iv spa (col 3)
  {
    id: 'e-site-spa',
    source: 'site',
    sourceHandle: 'spa',
    target: 'iv-spa',
    ...edgeDefaults,
    style: { ...edgeDefaults.style, stroke: C.spa },
    label: 'IV Spa CTA',
    labelStyle: { fontSize: 10, fill: C.spa, fontWeight: 600 },
    labelBgStyle: { fill: C.spaLight },
  },
  // lookup → returning form (FOUND)
  {
    id: 'e-lookup-returning',
    source: 'lookup',
    sourceHandle: 'found',
    target: 'form-returning',
    ...edgeDefaults,
    style: { ...edgeDefaults.style, stroke: C.purple },
    label: 'FOUND',
    labelStyle: { fontSize: 10, fill: C.green, fontWeight: 700 },
    labelBgStyle: { fill: C.greenLight },
  },
  // lookup → new patient form (NOT FOUND)
  {
    id: 'e-lookup-new',
    source: 'lookup',
    sourceHandle: 'notfound',
    target: 'form-new',
    ...edgeDefaults,
    animated: true,
    style: { ...edgeDefaults.style, stroke: C.red, strokeDasharray: '5,4' },
    label: 'NOT FOUND',
    labelStyle: { fontSize: 10, fill: C.red, fontWeight: 700 },
    labelBgStyle: { fill: C.redLight },
  },
  // form-new → keragon (col 1)
  {
    id: 'e-new-keragon',
    source: 'form-new',
    target: 'keragon',
    targetHandle: 'left',
    ...edgeDefaults,
    style: { ...edgeDefaults.style, stroke: C.teal, strokeDasharray: '6,3' },
    label: 'webhook on submit',
    labelStyle: { fontSize: 9, fill: C.gray600 },
    labelBgStyle: { fill: C.gray100 },
  },
  // form-returning → keragon (col 2)
  {
    id: 'e-returning-keragon',
    source: 'form-returning',
    target: 'keragon',
    targetHandle: 'center',
    ...edgeDefaults,
    style: { ...edgeDefaults.style, stroke: C.purple, strokeDasharray: '6,3' },
    label: 'webhook on submit',
    labelStyle: { fontSize: 9, fill: C.gray600 },
    labelBgStyle: { fill: C.gray100 },
  },
  // iv-spa → keragon (col 3)
  {
    id: 'e-spa-keragon',
    source: 'iv-spa',
    target: 'keragon',
    targetHandle: 'right',
    ...edgeDefaults,
    style: { ...edgeDefaults.style, stroke: C.spa, strokeDasharray: '6,3' },
    label: 'webhook on submit',
    labelStyle: { fontSize: 9, fill: C.gray600 },
    labelBgStyle: { fill: C.gray100 },
  },
  // keragon → drchrono (all 3 columns)
  {
    id: 'e-keragon-dc-left',
    source: 'keragon',
    sourceHandle: 'left',
    target: 'drchrono',
    targetHandle: 'left',
    ...edgeDefaults,
    style: { ...edgeDefaults.style, stroke: C.amber },
  },
  {
    id: 'e-keragon-dc-center',
    source: 'keragon',
    sourceHandle: 'center',
    target: 'drchrono',
    targetHandle: 'center',
    ...edgeDefaults,
    style: { ...edgeDefaults.style, stroke: C.amber },
  },
  {
    id: 'e-keragon-dc-right',
    source: 'keragon',
    sourceHandle: 'right',
    target: 'drchrono',
    targetHandle: 'right',
    ...edgeDefaults,
    style: { ...edgeDefaults.style, stroke: C.spa },
  },
  // drchrono → stripe (all 3 columns)
  {
    id: 'e-dc-stripe-left',
    source: 'drchrono',
    sourceHandle: 'left',
    target: 'stripe',
    targetHandle: 'left',
    ...edgeDefaults,
    style: { ...edgeDefaults.style, stroke: C.blue, strokeDasharray: '4,3' },
    label: 'thank-you redirect',
    labelStyle: { fontSize: 9, fill: C.gray600 },
    labelBgStyle: { fill: C.gray100 },
  },
  {
    id: 'e-dc-stripe-center',
    source: 'drchrono',
    sourceHandle: 'center',
    target: 'stripe',
    targetHandle: 'center',
    ...edgeDefaults,
    style: { ...edgeDefaults.style, stroke: C.blue, strokeDasharray: '4,3' },
  },
  {
    id: 'e-dc-stripe-right',
    source: 'drchrono',
    sourceHandle: 'right',
    target: 'stripe',
    targetHandle: 'right',
    ...edgeDefaults,
    style: { ...edgeDefaults.style, stroke: C.spa, strokeDasharray: '4,3' },
  },
];

// ─── Main diagram component ───────────────────────────────────────────────────
export default function IntakeFlowDiagram() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div style={{ width: '100%', height: '100vh', background: '#f8fafc' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.12 }}
        minZoom={0.2}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
      >
        <Controls />
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#cbd5e1" />
      </ReactFlow>
    </div>
  );
}
