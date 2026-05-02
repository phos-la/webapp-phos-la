import { defineField, defineType } from 'sanity';

export const processSectionType = defineType({
  name: 'processSection',
  title: 'Process Section',
  type: 'document',
  fields: [
    defineField({ name: 'label', title: 'Eyebrow Label', type: 'string' }),
    defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'num', title: 'Step Number', type: 'string' }),
            defineField({
              name: 'title',
              title: 'Step Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: 'body', title: 'Step Description', type: 'text', rows: 3 }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'num' },
          },
        },
      ],
    }),
  ],
});
