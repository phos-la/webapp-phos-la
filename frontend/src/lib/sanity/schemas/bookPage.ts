import { defineField, defineType } from 'sanity';

const tabFields = (titlePrefix: string) => [
  defineField({
    name: 'label',
    title: 'Tab Label',
    type: 'string',
    description: `Short label shown on the ${titlePrefix} tab button.`,
  }),
  defineField({
    name: 'h2',
    title: 'Card Heading',
    type: 'string',
  }),
  defineField({
    name: 'sub',
    title: 'Card Subheading',
    type: 'text',
    rows: 3,
  }),
  defineField({
    name: 'bullets',
    title: 'Bullet List',
    type: 'array',
    of: [{ type: 'string' }],
    description:
      'Short lines under the subheading. Keep counts even across tabs so the card stays the same height.',
  }),
  defineField({
    name: 'ctaLabel',
    title: 'CTA Button Label',
    type: 'string',
  }),
];

export const bookPageType = defineType({
  name: 'bookPage',
  title: 'Book Page',
  type: 'document',
  groups: [
    { name: 'header', title: 'Header' },
    { name: 'tabNew', title: 'Tab — New Patient' },
    { name: 'tabClinic', title: 'Tab — Returning · In-Clinic' },
    { name: 'tabAthome', title: 'Tab — At-Home' },
    { name: 'footer', title: 'Footer Note' },
  ],
  fields: [
    // Header
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'header',
      initialValue: 'Phos Wellness',
    }),
    defineField({
      name: 'headlineDefault',
      title: 'Headline (first-time visitor)',
      type: 'string',
      group: 'header',
      initialValue: 'Start your journey.',
    }),
    defineField({
      name: 'headlineReturning',
      title: 'Headline (returning visitor)',
      type: 'string',
      group: 'header',
      initialValue: 'Welcome back.',
    }),
    defineField({
      name: 'subheadingDefault',
      title: 'Subheading (first-time visitor)',
      type: 'text',
      rows: 2,
      group: 'header',
      initialValue: 'Tell us a bit about yourself so Katie can prepare for your visit.',
    }),
    defineField({
      name: 'subheadingReturning',
      title: 'Subheading (returning visitor)',
      type: 'text',
      rows: 2,
      group: 'header',
      initialValue: "Your intake is on file. Just let us know why you're coming in.",
    }),

    // Tab — New Patient
    defineField({
      name: 'tabNew',
      title: 'New Patient Tab',
      type: 'object',
      group: 'tabNew',
      fields: tabFields('New Patient'),
    }),

    // Tab — Returning · In-Clinic
    defineField({
      name: 'tabClinic',
      title: 'Returning · In-Clinic Tab',
      type: 'object',
      group: 'tabClinic',
      fields: tabFields('Returning · In-Clinic'),
    }),

    // Tab — At-Home
    defineField({
      name: 'tabAthome',
      title: 'At-Home Tab',
      type: 'object',
      group: 'tabAthome',
      fields: tabFields('At-Home'),
    }),

    // Footer
    defineField({
      name: 'footerNote',
      title: 'Footer Note',
      type: 'string',
      group: 'footer',
      initialValue: 'Secure form · HIPAA compliant · Powered by JotForm',
    }),
  ],
  preview: {
    select: { title: 'headlineDefault' },
    prepare: ({ title }) => ({ title: title ?? 'Book Page' }),
  },
});
