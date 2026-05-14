import { defineField, defineType } from 'sanity';

/**
 * Reusable price-item object used inside the per-flow thanks singletons.
 * One item = one row in the service picker (or the lone new-patient deposit).
 *
 * Stripe price IDs live here so editors can swap to a new sandbox/live
 * price without a deploy. Amount is the display value in whole dollars.
 */
const priceItem = {
  name: 'priceItem',
  title: 'Price Item',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'amount',
      title: 'Amount (USD, whole dollars)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      description: 'Optional sub-label shown under the row.',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'stripePriceId',
      title: 'Stripe Price ID',
      description: 'Looks like price_1Txxx... Find it in the Stripe dashboard.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'label', subtitle: 'amount', priceId: 'stripePriceId' },
    prepare: ({
      title,
      subtitle,
      priceId,
    }: {
      title?: string;
      subtitle?: number;
      priceId?: string;
    }) => ({
      title: title ?? 'Untitled price',
      subtitle:
        typeof subtitle === 'number'
          ? `$${subtitle.toLocaleString()} · ${priceId ?? 'no Stripe ID'}`
          : 'Set an amount',
    }),
  },
} as const;

const flowCopyFields = [
  defineField({
    name: 'heading',
    title: 'Heading',
    type: 'string',
    validation: (Rule) => Rule.required(),
  }),
  defineField({
    name: 'subheading',
    title: 'Subheading',
    type: 'text',
    rows: 3,
  }),
  defineField({
    name: 'eyebrow',
    title: 'Eyebrow (above the deposit / picker)',
    type: 'string',
  }),
];

/* ──────────────────────────────────────────────────────────────────────────
 * Flow A — New Patient
 * Single deposit row, no picker.
 * ────────────────────────────────────────────────────────────────────────── */
export const bookThanksNewType = defineType({
  name: 'bookThanksNew',
  title: 'Thanks — New Patient',
  type: 'document',
  fields: [
    ...flowCopyFields,
    defineField({
      name: 'deposit',
      title: 'Deposit',
      description:
        'The single price charged on the new-patient thank-you page. Applied as a credit toward the first session.',
      type: 'object',
      fields: [...priceItem.fields],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title ?? 'Thanks — New Patient' }),
  },
  initialValue: {
    heading: "You're all set.",
    subheading:
      'Katie will review your intake before your first visit. One last step. A deposit holds your appointment slot.',
    eyebrow: 'Hold your appointment',
  },
});

/* ──────────────────────────────────────────────────────────────────────────
 * Flow B — Existing Patient (in-clinic)
 * Picker with N price rows.
 * ────────────────────────────────────────────────────────────────────────── */
export const bookThanksReturningType = defineType({
  name: 'bookThanksReturning',
  title: 'Thanks — Existing Patient (In-Clinic)',
  type: 'document',
  fields: [
    ...flowCopyFields,
    defineField({
      name: 'pickerLabel',
      title: 'Picker Label',
      description: 'Eyebrow text shown above the list of session options.',
      type: 'string',
      initialValue: 'Select your session',
    }),
    defineField({
      name: 'prices',
      title: 'Sessions / Memberships',
      description:
        'Each item is one selectable row. Drag to reorder. The first item is pre-selected by default.',
      type: 'array',
      of: [{ ...priceItem }],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title ?? 'Thanks — Existing Patient' }),
  },
  initialValue: {
    heading: 'See you soon.',
    subheading: "We've got your note. One last step. Choose your in-clinic session below.",
    eyebrow: 'In-clinic services',
    pickerLabel: 'Select your session',
  },
});

/* ──────────────────────────────────────────────────────────────────────────
 * Flow C — At-Home Patient
 * Picker with N price rows (video consults + refills).
 * ────────────────────────────────────────────────────────────────────────── */
export const bookThanksAthomeType = defineType({
  name: 'bookThanksAthome',
  title: 'Thanks — At-Home Patient',
  type: 'document',
  fields: [
    ...flowCopyFields,
    defineField({
      name: 'pickerLabel',
      title: 'Picker Label',
      type: 'string',
      initialValue: 'Select your visit type',
    }),
    defineField({
      name: 'prices',
      title: 'At-Home Visit Types',
      description:
        'Each item is one selectable row. Drag to reorder. The first item is pre-selected by default.',
      type: 'array',
      of: [{ ...priceItem }],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare: ({ title }) => ({ title: title ?? 'Thanks — At-Home Patient' }),
  },
  initialValue: {
    heading: 'Welcome back.',
    subheading: "We've got your note. One last step. Choose your at-home video visit below.",
    eyebrow: 'At-home services',
    pickerLabel: 'Select your visit type',
  },
});
