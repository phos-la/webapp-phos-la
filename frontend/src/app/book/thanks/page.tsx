import { client } from '@/lib/sanity/client';
import { bookThanksPageQuery } from '@/lib/sanity/queries';
import ThanksContent, {
  type ThanksCopy,
  type FlowNewCopy,
  type FlowPickerCopy,
  type Price,
} from './ThanksContent';

export const dynamic = 'force-dynamic';

/* ──────────────────────────────────────────────────────────────────────────
 * Defaults — used when Sanity has no doc yet (first deploy, seed pending)
 * or when individual fields come back empty. Stripe price IDs are sandbox
 * values; swap for live in the Sanity studio.
 * ────────────────────────────────────────────────────────────────────────── */

const DEFAULTS: ThanksCopy = {
  flowNew: {
    heading: "You're all set.",
    subheading:
      'Katie will review your intake before your first visit. One last step. A deposit holds your appointment slot.',
    eyebrow: 'Hold your appointment',
    deposit: {
      stripePriceId: 'price_1TUZfLAEmpFZtKZrBUkSXcKA',
      label: 'Initial Consultation',
      amount: 100,
      description: 'Applied as a credit toward your first session if you move forward.',
    },
  },
  flowReturning: {
    heading: 'See you soon.',
    subheading: "We've got your note. One last step. Choose your in-clinic session below.",
    eyebrow: 'In-clinic services',
    pickerLabel: 'Select your session',
    prices: [
      {
        stripePriceId: 'price_1TUZfMAEmpFZtKZrHVF413eb',
        label: 'Appointment Deposit',
        amount: 100,
        description: 'Required to schedule your infusion appointment.',
      },
      {
        stripePriceId: 'price_1TUZfMAEmpFZtKZrWTmNc1sn',
        label: '60 Min Infusion (sessions 1–4)',
        amount: 700,
      },
      {
        stripePriceId: 'price_1TUZfMAEmpFZtKZrYyEIRKJI',
        label: '60 Min Booster Infusion',
        amount: 550,
        description: 'For established patients.',
      },
      {
        stripePriceId: 'price_1TUZfNAEmpFZtKZroakOPLD9',
        label: '90 Min Ketamine Infusion',
        amount: 650,
      },
      {
        stripePriceId: 'price_1TUZfNAEmpFZtKZrYVpP4FPr',
        label: '2-Hour Pain or Mood Infusion',
        amount: 850,
      },
      {
        stripePriceId: 'price_1TUZfOAEmpFZtKZrMTAhDFkT',
        label: '3-Hour Pain or Mood Infusion',
        amount: 1150,
      },
      {
        stripePriceId: 'price_1TUZfOAEmpFZtKZrgVEs62v9',
        label: '4-Hour Pain or Mood Infusion',
        amount: 1650,
      },
      {
        stripePriceId: 'price_1TUZfPAEmpFZtKZrQUvOlB2u',
        label: '6-Infusion Membership',
        amount: 2750,
        description:
          'For existing patients or transfers with proof of 4 sessions. Non-transferable.',
      },
      {
        stripePriceId: 'price_1TUZfPAEmpFZtKZrZ76d0VgA',
        label: '12-Infusion Membership',
        amount: 5000,
        description:
          'For existing patients or transfers with proof of 4 sessions. Non-transferable.',
      },
    ],
  },
  flowAthome: {
    heading: 'Welcome back.',
    subheading: "We've got your note. One last step. Choose your at-home video visit below.",
    eyebrow: 'At-home services',
    pickerLabel: 'Select your visit type',
    prices: [
      {
        stripePriceId: 'price_1TUZfPAEmpFZtKZr9c3BFhxk',
        label: '1st Video Consultation',
        amount: 250,
        description: 'For new at-home patients. First month prescription filled by pharmacy.',
      },
      {
        stripePriceId: 'price_1TUZfQAEmpFZtKZrHz035xcy',
        label: '2nd Video Consultation',
        amount: 225,
        description: 'Ready for your second month refill.',
      },
      {
        stripePriceId: 'price_1TUZfQAEmpFZtKZr7U2B0sfN',
        label: '3rd Video Consultation',
        amount: 200,
        description: 'Includes a 3-month supply dispensed one month at a time.',
      },
      {
        stripePriceId: 'price_1TUZfRAEmpFZtKZrDSBgMRqO',
        label: 'Follow-up Video Visit',
        amount: 250,
        description: 'Required every 6 months for a continued prescription.',
      },
      {
        stripePriceId: 'price_1TUZfRAEmpFZtKZrKPXRcig0',
        label: 'Prescription Changes',
        amount: 200,
        description: 'Dosage adjustment consult before your 6-month follow-up.',
      },
    ],
  },
  newDepositCtaLabel: 'Pay with card →',
  newDepositLoadingLabel: 'Redirecting…',
  otherCtaLabel: 'Continue to payment →',
  secureNote: 'Secure payment via Stripe · PCI compliant',
  errorMessage: 'Something went wrong. Please try again or call us at (424) 278-4241.',
  backLinkLabel: '← Back to phos.la',
};

/* ──────────────────────────────────────────────────────────────────────────
 * Merge helpers — field-by-field fallback to defaults on empty/null.
 * ────────────────────────────────────────────────────────────────────────── */

function str(fallback: string, value: string | undefined | null): string {
  if (value === undefined || value === null) return fallback;
  if (typeof value === 'string' && value.trim() === '') return fallback;
  return value;
}

function mergePrice(fallback: Price, value: Partial<Price> | null | undefined): Price {
  if (!value) return fallback;
  return {
    stripePriceId: str(fallback.stripePriceId, value.stripePriceId),
    label: str(fallback.label, value.label),
    amount: typeof value.amount === 'number' ? value.amount : fallback.amount,
    description: value.description ?? fallback.description,
  };
}

function mergePriceArray(fallback: Price[], value: Partial<Price>[] | null | undefined): Price[] {
  if (!value || value.length === 0) return fallback;
  return value
    .map((p) => mergePrice({ stripePriceId: '', label: '', amount: 0 }, p))
    .filter((p) => p.stripePriceId && p.label);
}

function mergeFlowNew(
  fallback: FlowNewCopy,
  value: Partial<FlowNewCopy> | null | undefined,
): FlowNewCopy {
  if (!value) return fallback;
  return {
    heading: str(fallback.heading, value.heading),
    subheading: str(fallback.subheading, value.subheading),
    eyebrow: str(fallback.eyebrow, value.eyebrow),
    deposit: mergePrice(fallback.deposit, value.deposit),
  };
}

function mergeFlowPicker(
  fallback: FlowPickerCopy,
  value: Partial<FlowPickerCopy> | null | undefined,
): FlowPickerCopy {
  if (!value) return fallback;
  return {
    heading: str(fallback.heading, value.heading),
    subheading: str(fallback.subheading, value.subheading),
    eyebrow: str(fallback.eyebrow, value.eyebrow),
    pickerLabel: str(fallback.pickerLabel, value.pickerLabel),
    prices: mergePriceArray(fallback.prices, value.prices),
  };
}

/* ──────────────────────────────────────────────────────────────────────────
 * Page
 * ────────────────────────────────────────────────────────────────────────── */

export default async function ThanksPage() {
  const data = await client
    .fetch<Partial<ThanksCopy> | null>(bookThanksPageQuery)
    .catch(() => null);

  const copy: ThanksCopy = {
    flowNew: mergeFlowNew(DEFAULTS.flowNew, data?.flowNew),
    flowReturning: mergeFlowPicker(DEFAULTS.flowReturning, data?.flowReturning),
    flowAthome: mergeFlowPicker(DEFAULTS.flowAthome, data?.flowAthome),
    newDepositCtaLabel: str(DEFAULTS.newDepositCtaLabel, data?.newDepositCtaLabel),
    newDepositLoadingLabel: str(DEFAULTS.newDepositLoadingLabel, data?.newDepositLoadingLabel),
    otherCtaLabel: str(DEFAULTS.otherCtaLabel, data?.otherCtaLabel),
    secureNote: str(DEFAULTS.secureNote, data?.secureNote),
    errorMessage: str(DEFAULTS.errorMessage, data?.errorMessage),
    backLinkLabel: str(DEFAULTS.backLinkLabel, data?.backLinkLabel),
  };

  return <ThanksContent copy={copy} />;
}
