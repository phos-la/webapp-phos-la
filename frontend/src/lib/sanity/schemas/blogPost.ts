import { defineField, defineType } from 'sanity';

export const blogPostType = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'imageAlt', title: 'Image Alt Text', type: 'string' }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'body', title: 'Excerpt / Body', type: 'text', rows: 3 }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
  orderings: [
    {
      title: 'Manual Order',
      name: 'manualOrder',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});

export const blogSectionType = defineType({
  name: 'blogSection',
  title: 'Blog Section',
  type: 'document',
  fields: [
    defineField({ name: 'label', title: 'Eyebrow Label', type: 'string' }),
    defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
  ],
});
