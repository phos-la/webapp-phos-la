/**
 * Seeds the bookPage + the four thanks singletons:
 *   - bookPage-singleton (booking tabs + copy)
 *   - bookThanksPage-singleton (shared chrome — CTA labels, secure note, etc.)
 *   - bookThanksNew-singleton (new patient flow + deposit price)
 *   - bookThanksReturning-singleton (existing patient flow + in-clinic prices)
 *   - bookThanksAthome-singleton (at-home flow + video visit prices)
 *
 * The shared-chrome singleton previously held flowNew/flowReturning/flowAthome
 * inline objects. Those moved to dedicated singletons so editors can manage
 * Stripe price IDs without touching the rest of the chrome. We unset the
 * legacy fields here so the studio doesn't keep showing stale copy.
 *
 * Uses createIfNotExists for the bookPage doc (never clobber edits) and
 * createOrReplace for the four thanks singletons on first seed. Re-running
 * is safe — switch to createIfNotExists if you want to preserve studio edits.
 *
 * Usage: SANITY_API_TOKEN=<write-token> bun run scripts/seed-book-pages.ts
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'yfse28ye',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function run() {
  console.log('Seeding bookPage + thanks singletons...');

  await client.createIfNotExists({
    _type: 'bookPage',
    _id: 'bookPage-singleton',
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
      bullets: [
        '1st, 2nd, or 3rd video consultation',
        '6 month follow-up and prescription changes',
      ],
      ctaLabel: 'Continue with at-home visit →',
    },
    footerNote: 'Secure form · HIPAA compliant · Powered by JotForm',
  });
  console.log('  bookPage-singleton ready');

  /* ── Shared chrome — strip legacy flow fields, ensure shared copy ─── */
  await client.createOrReplace({
    _type: 'bookThanksPage',
    _id: 'bookThanksPage-singleton',
    newDepositCtaLabel: 'Pay with card →',
    newDepositLoadingLabel: 'Redirecting…',
    otherCtaLabel: 'Continue to payment →',
    secureNote: 'Secure payment via Stripe · PCI compliant',
    errorMessage: 'Something went wrong. Please try again or call us at (424) 278-4241.',
    backLinkLabel: '← Back to phos.la',
  });
  console.log('  bookThanksPage-singleton ready (legacy flow fields cleared)');

  /* ── New Patient flow ─────────────────────────────────────────────── */
  await client.createOrReplace({
    _type: 'bookThanksNew',
    _id: 'bookThanksNew-singleton',
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
  });
  console.log('  bookThanksNew-singleton ready');

  /* ── Existing Patient (in-clinic) flow ────────────────────────────── */
  await client.createOrReplace({
    _type: 'bookThanksReturning',
    _id: 'bookThanksReturning-singleton',
    heading: 'See you soon.',
    subheading: "We've got your note. One last step. Choose your in-clinic session below.",
    eyebrow: 'In-clinic services',
    pickerLabel: 'Select your session',
    prices: [
      {
        _key: 'p1',
        stripePriceId: 'price_1TUZfMAEmpFZtKZrHVF413eb',
        label: 'Appointment Deposit',
        amount: 100,
        description: 'Required to schedule your infusion appointment.',
      },
      {
        _key: 'p2',
        stripePriceId: 'price_1TUZfMAEmpFZtKZrWTmNc1sn',
        label: '60 Min Infusion (sessions 1–4)',
        amount: 700,
      },
      {
        _key: 'p3',
        stripePriceId: 'price_1TUZfMAEmpFZtKZrYyEIRKJI',
        label: '60 Min Booster Infusion',
        amount: 550,
        description: 'For established patients.',
      },
      {
        _key: 'p4',
        stripePriceId: 'price_1TUZfNAEmpFZtKZroakOPLD9',
        label: '90 Min Ketamine Infusion',
        amount: 650,
      },
      {
        _key: 'p5',
        stripePriceId: 'price_1TUZfNAEmpFZtKZrYVpP4FPr',
        label: '2-Hour Pain or Mood Infusion',
        amount: 850,
      },
      {
        _key: 'p6',
        stripePriceId: 'price_1TUZfOAEmpFZtKZrMTAhDFkT',
        label: '3-Hour Pain or Mood Infusion',
        amount: 1150,
      },
      {
        _key: 'p7',
        stripePriceId: 'price_1TUZfOAEmpFZtKZrgVEs62v9',
        label: '4-Hour Pain or Mood Infusion',
        amount: 1650,
      },
      {
        _key: 'p8',
        stripePriceId: 'price_1TUZfPAEmpFZtKZrQUvOlB2u',
        label: '6-Infusion Membership',
        amount: 2750,
        description:
          'For existing patients or transfers with proof of 4 sessions. Non-transferable.',
      },
      {
        _key: 'p9',
        stripePriceId: 'price_1TUZfPAEmpFZtKZrZ76d0VgA',
        label: '12-Infusion Membership',
        amount: 5000,
        description:
          'For existing patients or transfers with proof of 4 sessions. Non-transferable.',
      },
    ],
  });
  console.log('  bookThanksReturning-singleton ready');

  /* ── At-Home flow ─────────────────────────────────────────────────── */
  await client.createOrReplace({
    _type: 'bookThanksAthome',
    _id: 'bookThanksAthome-singleton',
    heading: 'Welcome back.',
    subheading: "We've got your note. One last step. Choose your at-home video visit below.",
    eyebrow: 'At-home services',
    pickerLabel: 'Select your visit type',
    prices: [
      {
        _key: 'a1',
        stripePriceId: 'price_1TUZfPAEmpFZtKZr9c3BFhxk',
        label: '1st Video Consultation',
        amount: 250,
        description: 'For new at-home patients. First month prescription filled by pharmacy.',
      },
      {
        _key: 'a2',
        stripePriceId: 'price_1TUZfQAEmpFZtKZrHz035xcy',
        label: '2nd Video Consultation',
        amount: 225,
        description: 'Ready for your second month refill.',
      },
      {
        _key: 'a3',
        stripePriceId: 'price_1TUZfQAEmpFZtKZr7U2B0sfN',
        label: '3rd Video Consultation',
        amount: 200,
        description: 'Includes a 3-month supply dispensed one month at a time.',
      },
      {
        _key: 'a4',
        stripePriceId: 'price_1TUZfRAEmpFZtKZrDSBgMRqO',
        label: 'Follow-up Video Visit',
        amount: 250,
        description: 'Required every 6 months for a continued prescription.',
      },
      {
        _key: 'a5',
        stripePriceId: 'price_1TUZfRAEmpFZtKZrKPXRcig0',
        label: 'Prescription Changes',
        amount: 200,
        description: 'Dosage adjustment consult before your 6-month follow-up.',
      },
    ],
  });
  console.log('  bookThanksAthome-singleton ready');

  console.log('Done.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
