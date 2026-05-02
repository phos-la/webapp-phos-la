import { defineField, defineType } from 'sanity';

export const providerSectionType = defineType({
  name: 'providerSection',
  title: 'Provider Section (Meet Dr. Riley)',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Eyebrow Label',
      type: 'string',
      description: 'e.g. "Medical Director"',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'e.g. "Meet Dr. Riley"',
    }),
    defineField({ name: 'body', title: 'Bio Body', type: 'text', rows: 4 }),
    defineField({ name: 'quote', title: 'Pull Quote', type: 'text', rows: 2 }),
    defineField({
      name: 'portrait',
      title: 'Portrait Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
});
