import { defineField, defineType } from 'sanity';

export const blogPostType = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  groups: [
    { name: 'card', title: 'Card (index + homepage)' },
    { name: 'post', title: 'Post body' },
    { name: 'meta', title: 'SEO metadata' },
  ],
  fields: [
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      group: 'card',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'imageAlt', title: 'Image Alt Text', type: 'string', group: 'card' }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'card',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Excerpt',
      description: 'Shown on the index card and the homepage. Keep to 2 to 3 sentences.',
      type: 'text',
      rows: 3,
      group: 'card',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      group: 'card',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishDate',
      title: 'Publish Date',
      type: 'date',
      group: 'card',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      description: 'Shown under the title on the post. Usually Katie or Christa.',
      type: 'string',
      group: 'card',
    }),
    defineField({
      name: 'readMinutes',
      title: 'Read Time (minutes)',
      type: 'number',
      group: 'card',
    }),
    defineField({
      name: 'fullBody',
      title: 'Full Body',
      description:
        'The article. Use the rich text editor for headings, bold, italic, links, lists, and quotes.',
      type: 'array',
      group: 'post',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                title: 'Link',
                name: 'link',
                type: 'object',
                fields: [
                  defineField({ name: 'href', title: 'URL', type: 'url' }),
                  defineField({ name: 'blank', title: 'Open in new tab', type: 'boolean' }),
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string' }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'metaTitle',
      title: 'SEO Title (browser tab)',
      description: 'Defaults to the post title if empty.',
      type: 'string',
      group: 'meta',
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Description',
      description: 'Defaults to the excerpt if empty.',
      type: 'text',
      rows: 3,
      group: 'meta',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'author', media: 'image' },
  },
});

export const blogSectionType = defineType({
  name: 'blogSection',
  title: 'Field Notes (Home Section)',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Eyebrow Label',
      type: 'string',
      initialValue: 'Field Notes',
    }),
    defineField({
      name: 'heading',
      title: 'Section Heading',
      type: 'string',
      initialValue: 'Field Notes',
    }),
    defineField({
      name: 'posts',
      title: 'Posts Shown on Home Page',
      description:
        'Pick which Field Notes appear on the home page. Drag to reorder. Edit a post by clicking it.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'blogPost' }] }],
    }),
    defineField({
      name: 'cardCtaLabel',
      title: 'Card CTA Label',
      type: 'string',
      initialValue: 'Read →',
    }),
  ],
});
