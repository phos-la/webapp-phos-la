import { defineField, defineType } from 'sanity';

export const blogIndexPageType = defineType({
  name: 'blogIndexPage',
  title: 'Blog Index Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'featured', title: 'Featured Post' },
    { name: 'empty', title: 'Empty State' },
  ],
  fields: [
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow',
      type: 'string',
      group: 'hero',
      initialValue: 'Field Notes',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      group: 'hero',
      initialValue: 'Field Notes',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'text',
      rows: 2,
      group: 'hero',
      initialValue:
        'Notes from the clinic on ketamine treatment, integration, and the science behind it.',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
    }),
    defineField({
      name: 'heroImageCaption',
      title: 'Hero Image Caption',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'featuredPost',
      title: 'Featured Post',
      description: 'Shown large at the top of the index. Pick from existing Blog Posts.',
      type: 'reference',
      to: [{ type: 'blogPost' }],
      group: 'featured',
    }),
    defineField({
      name: 'emptyHeadline',
      title: 'Empty-State Headline',
      type: 'string',
      group: 'empty',
      initialValue: 'New notes coming soon.',
    }),
    defineField({
      name: 'emptyBody',
      title: 'Empty-State Body',
      type: 'text',
      rows: 2,
      group: 'empty',
      initialValue:
        'Katie and Christa are working on the first batch. Check back in a couple weeks.',
    }),
  ],
  preview: {
    select: { title: 'heroHeadline' },
    prepare: ({ title }) => ({ title: title ?? 'Blog Index Page' }),
  },
});
