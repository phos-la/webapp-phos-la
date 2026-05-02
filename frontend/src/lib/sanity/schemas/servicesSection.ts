import { defineField, defineType } from 'sanity';

export const servicesSectionType = defineType({
  name: 'servicesSection',
  title: 'Services Section',
  type: 'document',
  fields: [
    defineField({ name: 'label', title: 'Eyebrow Label', type: 'string' }),
    defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
    defineField({ name: 'subheading', title: 'Section Subheading', type: 'text', rows: 2 }),
    defineField({
      name: 'cards',
      title: 'Service Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Card Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: 'body', title: 'Card Body', type: 'text', rows: 4 }),
          ],
          preview: {
            select: { title: 'title' },
          },
        },
      ],
      description: 'Exactly 3 service cards in order: IV Infusions, Therapy, Wellness/NAD+',
    }),
  ],
});
