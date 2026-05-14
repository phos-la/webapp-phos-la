/**
 * Seeds bookPage + bookThanksPage singletons.
 *
 * bookThanksPage now holds the three flows (flowNew, flowReturning, flowAthome)
 * as inline object fields, mirroring the bookPage pattern (tabNew, tabClinic,
 * tabAthome). Stripe price IDs and amounts live inside the flow objects so
 * editors can swap sandbox/live without a deploy.
 *
 * Uses createIfNotExists for bookPage (never clobber edits) and createOrReplace
 * for bookThanksPage to ensure the new schema shape replaces any legacy data.
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
  console.log('Seeding bookPage + bookThanksPage singletons...');

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

  await client.createOrReplace({
    _type: 'bookThanksPage',
    _id: 'bookThanksPage-singleton',
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
          _key: 'r1',
          stripePriceId: 'price_1TUZfMAEmpFZtKZrHVF413eb',
          label: 'Appointment Deposit',
          amount: 100,
          description: 'Required to schedule your infusion appointment.',
        },
        {
          _key: 'r2',
          stripePriceId: 'price_1TUZfMAEmpFZtKZrWTmNc1sn',
          label: '60 Min Infusion (sessions 1–4)',
          amount: 700,
        },
        {
          _key: 'r3',
          stripePriceId: 'price_1TUZfMAEmpFZtKZrYyEIRKJI',
          label: '60 Min Booster Infusion',
          amount: 550,
          description: 'For established patients.',
        },
        {
          _key: 'r4',
          stripePriceId: 'price_1TUZfNAEmpFZtKZroakOPLD9',
          label: '90 Min Ketamine Infusion',
          amount: 650,
        },
        {
          _key: 'r5',
          stripePriceId: 'price_1TUZfNAEmpFZtKZrYVpP4FPr',
          label: '2-Hour Pain or Mood Infusion',
          amount: 850,
        },
        {
          _key: 'r6',
          stripePriceId: 'price_1TUZfOAEmpFZtKZrMTAhDFkT',
          label: '3-Hour Pain or Mood Infusion',
          amount: 1150,
        },
        {
          _key: 'r7',
          stripePriceId: 'price_1TUZfOAEmpFZtKZrgVEs62v9',
          label: '4-Hour Pain or Mood Infusion',
          amount: 1650,
        },
        {
          _key: 'r8',
          stripePriceId: 'price_1TUZfPAEmpFZtKZrQUvOlB2u',
          label: '6-Infusion Membership',
          amount: 2750,
          description:
            'For existing patients or transfers with proof of 4 sessions. Non-transferable.',
        },
        {
          _key: 'r9',
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
    },
    newDepositCtaLabel: 'Pay with card →',
    newDepositLoadingLabel: 'Redirecting…',
    otherCtaLabel: 'Continue to payment →',
    secureNote: 'Secure payment via Stripe · PCI compliant',
    errorMessage: 'Something went wrong. Please try again or call us at (424) 278-4241.',
    backLinkLabel: '← Back to phos.la',
  });
  console.log('  bookThanksPage-singleton ready');

  console.log('Done.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
