import { defineField, defineType } from 'sanity';

export const glimpsesSectionType = defineType({
  name: 'glimpsesSection',
  title: 'Glimpses Section',
  type: 'document',
  fields: [
    defineField({ name: 'heading', title: 'Heading', type: 'string' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 2 }),
    defineField({
      name: 'row1Images',
      title: 'Row 1 Images (scrolls left)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Upload clinic/lifestyle images for the first scrolling row',
    }),
    defineField({
      name: 'row2Images',
      title: 'Row 2 Images (scrolls right)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Upload clinic/lifestyle images for the second scrolling row',
    }),
  ],
});
