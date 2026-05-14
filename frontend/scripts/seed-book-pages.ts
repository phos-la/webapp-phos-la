/**
 * Seeds the bookPage + bookThanksPage singletons with the copy currently in
 * src/app/book/page.tsx and src/app/book/thanks/page.tsx (already rewritten
 * through my-voice on 2026-05-14, em dashes removed).
 *
 * Uses createIfNotExists so re-running never overwrites edits made in the studio.
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
  console.log('Seeding bookPage + bookThanksPage singletons (createIfNotExists)...');

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

  await client.createIfNotExists({
    _type: 'bookThanksPage',
    _id: 'bookThanksPage-singleton',
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
  });
  console.log('  bookThanksPage-singleton ready');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
