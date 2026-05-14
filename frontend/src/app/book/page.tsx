import { client } from '@/lib/sanity/client';
import { bookPageQuery } from '@/lib/sanity/queries';
import BookForm, { type BookCopy } from './BookForm';

export const revalidate = 300;

const DEFAULTS: BookCopy = {
  eyebrow: 'Phos Wellness',
  headlineDefault: 'Start your journey.',
  headlineReturning: 'Welcome back.',
  subheadingDefault: 'Tell us a bit about yourself so Katie can prepare for your visit.',
  subheadingReturning: "Your intake is on file. Just let us know why you're coming in.",
  tabNew: {
    label: 'New Patient',
    h2: 'First consultation',
    sub: 'Takes about five minutes. We gather a few basics so Katie can look over your profile before you come in.',
    bullets: ['Date of birth, phone, email', 'Gender', 'Electronic signature'],
    ctaLabel: 'Begin new patient intake →',
  },
  tabClinic: {
    label: 'Returning · In-Clinic',
    h2: 'Book an in-clinic session',
    sub: "Quick one. Just your email and a short note on what's bringing you in. Your intake's already on file.",
    bullets: [
      '60 min, 90 min, 2, 3, or 4 hour infusions',
      'Booster sessions and 6 or 12 pack memberships',
    ],
    ctaLabel: 'Continue as returning patient →',
  },
  tabAthome: {
    label: 'At-Home',
    h2: 'Schedule an at-home video visit',
    sub: "Quick one. Just your email and a short note on what's bringing you in. Your intake's already on file.",
    bullets: ['1st, 2nd, or 3rd video consultation', '6 month follow-up and prescription changes'],
    ctaLabel: 'Continue with at-home visit →',
  },
  footerNote: 'Secure form · HIPAA compliant · Powered by JotForm',
};

function merge<T>(fallback: T, value: T | undefined | null): T {
  if (value === undefined || value === null) return fallback;
  if (typeof value === 'string' && value.trim() === '') return fallback;
  return value;
}

function mergeTab(fallback: BookCopy['tabNew'], value: Partial<BookCopy['tabNew']> | null) {
  if (!value) return fallback;
  return {
    label: merge(fallback.label, value.label),
    h2: merge(fallback.h2, value.h2),
    sub: merge(fallback.sub, value.sub),
    bullets: value.bullets && value.bullets.length > 0 ? value.bullets : fallback.bullets,
    ctaLabel: merge(fallback.ctaLabel, value.ctaLabel),
  };
}

export default async function BookPage() {
  const data = await client.fetch<Partial<BookCopy> | null>(bookPageQuery).catch(() => null);

  const copy: BookCopy = {
    eyebrow: merge(DEFAULTS.eyebrow, data?.eyebrow),
    headlineDefault: merge(DEFAULTS.headlineDefault, data?.headlineDefault),
    headlineReturning: merge(DEFAULTS.headlineReturning, data?.headlineReturning),
    subheadingDefault: merge(DEFAULTS.subheadingDefault, data?.subheadingDefault),
    subheadingReturning: merge(DEFAULTS.subheadingReturning, data?.subheadingReturning),
    tabNew: mergeTab(DEFAULTS.tabNew, data?.tabNew ?? null),
    tabClinic: mergeTab(DEFAULTS.tabClinic, data?.tabClinic ?? null),
    tabAthome: mergeTab(DEFAULTS.tabAthome, data?.tabAthome ?? null),
    footerNote: merge(DEFAULTS.footerNote, data?.footerNote),
  };

  return <BookForm copy={copy} />;
}
