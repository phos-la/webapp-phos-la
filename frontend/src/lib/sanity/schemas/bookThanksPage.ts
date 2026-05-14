import { defineField, defineType } from 'sanity';

/**
 * Shared chrome for the three /book/thanks flow pages.
 * Per-flow copy + prices live in:
 *   - bookThanksNew
 *   - bookThanksReturning
 *   - bookThanksAthome
 *
 * This singleton holds the labels and notes that are identical across
 * every flow: the two checkout button labels, the loading label, the
 * secure-payment note, the error message, and the back link.
 */
export const bookThanksPageType = defineType({
  name: 'bookThanksPage',
  title: 'Thanks — Shared Copy',
  type: 'document',
  fields: [
    defineField({
      name: 'newDepositCtaLabel',
      title: 'New Patient Deposit CTA Label',
      type: 'string',
      initialValue: 'Pay with card →',
    }),
    defineField({
      name: 'newDepositLoadingLabel',
      title: 'New Patient Deposit CTA Loading Label',
      type: 'string',
      initialValue: 'Redirecting…',
    }),
    defineField({
      name: 'otherCtaLabel',
      title: 'Existing / At-Home CTA Label',
      type: 'string',
      initialValue: 'Continue to payment →',
    }),
    defineField({
      name: 'secureNote',
      title: 'Secure Payment Note',
      type: 'string',
      initialValue: 'Secure payment via Stripe · PCI compliant',
    }),
    defineField({
      name: 'errorMessage',
      title: 'Generic Checkout Error',
      type: 'text',
      rows: 2,
      initialValue: 'Something went wrong. Please try again or call us at (424) 278-4241.',
    }),
    defineField({
      name: 'backLinkLabel',
      title: 'Back Link Label',
      type: 'string',
      initialValue: '← Back to phos.la',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Thanks — Shared Copy' }),
  },
});
