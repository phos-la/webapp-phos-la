import { defineField, defineType } from 'sanity';

export const testimonialItemType = defineType({
  name: 'testimonialItem',
  title: 'Testimonial',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Attribution Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'quote' },
  },
});

export const testimonialsSectionType = defineType({
  name: 'testimonialsSection',
  title: 'Testimonials Section',
  type: 'document',
  fields: [
    defineField({ name: 'label', title: 'Eyebrow Label', type: 'string' }),
    defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
    defineField({ name: 'subheading', title: 'Section Subheading', type: 'text', rows: 2 }),
    defineField({
      name: 'items',
      title: 'Testimonials',
      description: 'Drag to reorder.',
      type: 'array',
      of: [{ type: 'testimonialItem' }],
    }),
  ],
});
