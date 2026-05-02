import { defineField, defineType } from 'sanity';

export const conditionsSectionType = defineType({
  name: 'conditionsSection',
  title: 'Conditions Section',
  type: 'document',
  fields: [
    defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
    defineField({
      name: 'conditions',
      title: 'Condition Chips',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of conditions shown as pill badges',
    }),
    defineField({ name: 'disclaimer', title: 'Disclaimer Text', type: 'text', rows: 3 }),
  ],
});
