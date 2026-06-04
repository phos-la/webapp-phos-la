import { defineField, defineType } from 'sanity';

export const bookSuccessPageType = defineType({
  name: 'bookSuccessPage',
  title: 'Success Page',
  type: 'document',
  groups: [
    { name: 'confirmed', title: 'Payment Confirmed' },
    { name: 'fallback', title: 'No-Session Fallback' },
    { name: 'shared', title: 'Shared' },
  ],
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'confirmed',
      initialValue: 'Payment confirmed.',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      description:
        'Follow-up copy under the heading. The amount and receipt-email sentence are prepended automatically when available from Stripe.',
      type: 'text',
      rows: 3,
      group: 'confirmed',
      initialValue: 'Our support staff will be in touch shortly to confirm your appointment.',
    }),
    defineField({
      name: 'contactCardText',
      title: 'Contact Card Text',
      description:
        'Shown in the white card below the heading. Use {phone} where the phone number should appear as a clickable link.',
      type: 'text',
      rows: 2,
      group: 'confirmed',
      initialValue: 'Questions? Call or text our support staff at {phone}.',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact Phone (display)',
      type: 'string',
      group: 'shared',
      initialValue: '(424) 278-4241',
    }),
    defineField({
      name: 'contactPhoneTel',
      title: 'Contact Phone (tel: link)',
      description: 'Used as the href for the contact link. E.g. +14242784241.',
      type: 'string',
      group: 'shared',
      initialValue: '+14242784241',
    }),
    defineField({
      name: 'backLinkLabel',
      title: 'Back Link Label',
      type: 'string',
      group: 'shared',
      initialValue: '← Back to phos.la',
    }),
    defineField({
      name: 'fallbackHeading',
      title: 'Fallback Heading',
      description: 'Shown when the page is reached without a Stripe session_id.',
      type: 'string',
      group: 'fallback',
      initialValue: 'Payment received.',
    }),
    defineField({
      name: 'fallbackBody',
      title: 'Fallback Body',
      type: 'text',
      rows: 2,
      group: 'fallback',
      initialValue: 'Our support staff will be in touch shortly to confirm your appointment.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Success Page' }),
  },
});
