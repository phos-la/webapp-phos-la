import { defineField, defineType } from 'sanity';

const flowFields = [
  defineField({
    name: 'heading',
    title: 'Heading',
    type: 'string',
  }),
  defineField({
    name: 'subheading',
    title: 'Subheading',
    type: 'text',
    rows: 3,
  }),
  defineField({
    name: 'eyebrow',
    title: 'Eyebrow (above the picker / deposit)',
    type: 'string',
  }),
  defineField({
    name: 'pickerLabel',
    title: 'Picker Label',
    type: 'string',
    description:
      'Label above the service picker. Leave blank for the new-patient flow (which has no picker).',
  }),
];

export const bookThanksPageType = defineType({
  name: 'bookThanksPage',
  title: 'Book — Thank You Page',
  type: 'document',
  groups: [
    { name: 'flowNew', title: 'Flow — New Patient' },
    { name: 'flowReturning', title: 'Flow — Returning · In-Clinic' },
    { name: 'flowAthome', title: 'Flow — At-Home' },
    { name: 'shared', title: 'Shared Copy' },
  ],
  fields: [
    defineField({
      name: 'flowNew',
      title: 'New Patient Flow',
      type: 'object',
      group: 'flowNew',
      fields: flowFields,
    }),
    defineField({
      name: 'flowReturning',
      title: 'Returning · In-Clinic Flow',
      type: 'object',
      group: 'flowReturning',
      fields: flowFields,
    }),
    defineField({
      name: 'flowAthome',
      title: 'At-Home Flow',
      type: 'object',
      group: 'flowAthome',
      fields: flowFields,
    }),
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
      title: 'Returning / At-Home CTA Label',
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
    prepare: () => ({ title: 'Book — Thank You Page' }),
  },
});
