import { defineField, defineType } from 'sanity';

/**
 * Reusable price-item shape — one row in a service picker, or a single
 * deposit row. Stripe price IDs live here so editors can swap sandbox/live
 * without a deploy. Amount is whole dollars (display value).
 */
const priceItemFields = [
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
];

const priceItemType = {
  name: 'priceItem',
  title: 'Price Item',
  type: 'object',
  fields: priceItemFields,
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
};

/**
 * The /book/thanks page. One singleton with three inline flow objects.
 * Mirrors the bookPage shape (tabNew / tabClinic / tabAthome) so editors
 * see the booking + thanks pages with the same mental model.
 */
export const bookThanksPageType = defineType({
  name: 'bookThanksPage',
  title: 'Thanks Page',
  type: 'document',
  groups: [
    { name: 'flowNew', title: 'Flow — New Patient' },
    { name: 'flowReturning', title: 'Flow — Existing (In-Clinic)' },
    { name: 'flowAthome', title: 'Flow — At-Home' },
    { name: 'shared', title: 'Shared Copy' },
  ],
  fields: [
    /* ── Flow — New Patient ───────────────────────────────────────────── */
    defineField({
      name: 'flowNew',
      title: 'New Patient Flow',
      type: 'object',
      group: 'flowNew',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 3 }),
        defineField({ name: 'eyebrow', title: 'Eyebrow (above deposit row)', type: 'string' }),
        defineField({
          name: 'deposit',
          title: 'Deposit',
          description:
            'The single price shown to new patients. Applied as a credit toward the first session.',
          type: 'object',
          fields: [...priceItemFields],
        }),
      ],
    }),

    /* ── Flow — Existing Patient (in-clinic) ──────────────────────────── */
    defineField({
      name: 'flowReturning',
      title: 'Existing Patient Flow (In-Clinic)',
      type: 'object',
      group: 'flowReturning',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 3 }),
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
        defineField({
          name: 'pickerLabel',
          title: 'Picker Label',
          description: 'Eyebrow text shown above the list of session options.',
          type: 'string',
        }),
        defineField({
          name: 'prices',
          title: 'Sessions / Memberships',
          description:
            'Each item is one selectable row. Drag to reorder. The first item is pre-selected by default.',
          type: 'array',
          of: [{ ...priceItemType }],
        }),
      ],
    }),

    /* ── Flow — At-Home ──────────────────────────────────────────────── */
    defineField({
      name: 'flowAthome',
      title: 'At-Home Flow',
      type: 'object',
      group: 'flowAthome',
      fields: [
        defineField({ name: 'heading', title: 'Heading', type: 'string' }),
        defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 3 }),
        defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string' }),
        defineField({
          name: 'pickerLabel',
          title: 'Picker Label',
          type: 'string',
        }),
        defineField({
          name: 'prices',
          title: 'At-Home Visit Types',
          description:
            'Each item is one selectable row. Drag to reorder. The first item is pre-selected by default.',
          type: 'array',
          of: [{ ...priceItemType }],
        }),
      ],
    }),

    /* ── Shared chrome — applies to all three flows ───────────────────── */
    defineField({
      name: 'newDepositCtaLabel',
      title: 'New Patient Deposit CTA Label',
      type: 'string',
      group: 'shared',
      initialValue: 'Pay with card →',
    }),
    defineField({
      name: 'newDepositLoadingLabel',
      title: 'New Patient Deposit CTA Loading Label',
      type: 'string',
      group: 'shared',
      initialValue: 'Redirecting…',
    }),
    defineField({
      name: 'otherCtaLabel',
      title: 'Existing / At-Home CTA Label',
      type: 'string',
      group: 'shared',
      initialValue: 'Continue to payment →',
    }),
    defineField({
      name: 'secureNote',
      title: 'Secure Payment Note',
      type: 'string',
      group: 'shared',
      initialValue: 'Secure payment via Stripe · PCI compliant',
    }),
    defineField({
      name: 'errorMessage',
      title: 'Generic Checkout Error',
      type: 'text',
      rows: 2,
      group: 'shared',
      initialValue: 'Something went wrong. Please try again or call us at (424) 278-4241.',
    }),
    defineField({
      name: 'backLinkLabel',
      title: 'Back Link Label',
      type: 'string',
      group: 'shared',
      initialValue: '← Back to phos.la',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Thanks Page' }),
  },
});
