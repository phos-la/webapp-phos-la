import { client } from '@/lib/sanity/client';
import { bookThanksPageQuery } from '@/lib/sanity/queries';
import ThanksContent, { type ThanksCopy, type FlowCopy } from './ThanksContent';

export const revalidate = 300;

const DEFAULTS: ThanksCopy = {
  flowNew: {
    heading: "You're all set.",
    subheading:
      'Katie will review your intake before your first visit. One last step. A deposit holds your appointment slot.',
    eyebrow: 'Hold your appointment',
    pickerLabel: '',
  },
  flowReturning: {
    heading: 'See you soon.',
    subheading: "We've got your note. One last step. Choose your in-clinic session below.",
    eyebrow: 'In-clinic services',
    pickerLabel: 'Select your session',
  },
  flowAthome: {
    heading: 'Welcome back.',
    subheading: "We've got your note. One last step. Choose your at-home video visit below.",
    eyebrow: 'At-home services',
    pickerLabel: 'Select your visit type',
  },
  newDepositCtaLabel: 'Pay with card →',
  newDepositLoadingLabel: 'Redirecting…',
  otherCtaLabel: 'Continue to payment →',
  secureNote: 'Secure payment via Stripe · PCI compliant',
  errorMessage: 'Something went wrong. Please try again or call us at (424) 278-4241.',
  backLinkLabel: '← Back to phos.la',
};

function merge<T>(fallback: T, value: T | undefined | null): T {
  if (value === undefined || value === null) return fallback;
  if (typeof value === 'string' && value.trim() === '') return fallback;
  return value;
}

function mergeFlow(fallback: FlowCopy, value: Partial<FlowCopy> | null | undefined): FlowCopy {
  if (!value) return fallback;
  return {
    heading: merge(fallback.heading, value.heading),
    subheading: merge(fallback.subheading, value.subheading),
    eyebrow: merge(fallback.eyebrow, value.eyebrow),
    pickerLabel: value.pickerLabel ?? fallback.pickerLabel,
  };
}

export default async function ThanksPage() {
  const data = await client
    .fetch<Partial<ThanksCopy> | null>(bookThanksPageQuery)
    .catch(() => null);

  const copy: ThanksCopy = {
    flowNew: mergeFlow(DEFAULTS.flowNew, data?.flowNew),
    flowReturning: mergeFlow(DEFAULTS.flowReturning, data?.flowReturning),
    flowAthome: mergeFlow(DEFAULTS.flowAthome, data?.flowAthome),
    newDepositCtaLabel: merge(DEFAULTS.newDepositCtaLabel, data?.newDepositCtaLabel),
    newDepositLoadingLabel: merge(DEFAULTS.newDepositLoadingLabel, data?.newDepositLoadingLabel),
    otherCtaLabel: merge(DEFAULTS.otherCtaLabel, data?.otherCtaLabel),
    secureNote: merge(DEFAULTS.secureNote, data?.secureNote),
    errorMessage: merge(DEFAULTS.errorMessage, data?.errorMessage),
    backLinkLabel: merge(DEFAULTS.backLinkLabel, data?.backLinkLabel),
  };

  return <ThanksContent copy={copy} />;
}
