import { defineField, defineType } from 'sanity';

/**
 * Shared chrome for /blog/[slug] (the post detail route).
 * Per-post fields (title, body, author, etc.) live on `blogPost`.
 * This singleton holds the page-level labels that are identical across every
 * post: eyebrow, read-time suffix, placeholder copy, back link, SEO template.
 */
export const blogPostPageType = defineType({
  name: 'blogPostPage',
  title: 'Blog Post Page (Detail Chrome)',
  type: 'document',
  groups: [
    { name: 'chrome', title: 'Page Chrome' },
    { name: 'placeholder', title: 'Placeholder Body' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'eyebrowLabel',
      title: 'Hero Eyebrow',
      description: 'Small label shown above the post title (e.g. "Field Notes").',
      type: 'string',
      group: 'chrome',
      initialValue: 'Field Notes',
    }),
    defineField({
      name: 'readMinutesSuffix',
      title: 'Read-Time Suffix',
      description: 'Text appended after the read-minutes number (e.g. "min read").',
      type: 'string',
      group: 'chrome',
      initialValue: 'min read',
    }),
    defineField({
      name: 'backLinkLabel',
      title: 'Back Link Label',
      type: 'string',
      group: 'chrome',
      initialValue: '← All field notes',
    }),
    defineField({
      name: 'backLinkHref',
      title: 'Back Link Href',
      type: 'string',
      group: 'chrome',
      initialValue: '/blog',
    }),
    defineField({
      name: 'placeholderBody',
      title: 'Placeholder Body (when post has no full body yet)',
      type: 'text',
      rows: 3,
      group: 'placeholder',
      initialValue:
        'This note is still being written. Come back soon, or browse the rest of our Field Notes.',
    }),
    defineField({
      name: 'placeholderLinkLabel',
      title: 'Placeholder Link Label',
      description: 'The clickable text inside the placeholder body that links back to /blog.',
      type: 'string',
      group: 'placeholder',
      initialValue: 'Field Notes',
    }),
    defineField({
      name: 'metaTitleSuffix',
      title: 'Meta Title Suffix',
      description:
        'Appended after each post title in the browser tab. Example: "Field Notes — Phos" gives "Light through trees — Field Notes — Phos".',
      type: 'string',
      group: 'seo',
      initialValue: 'Field Notes — Phos',
    }),
    defineField({
      name: 'metaTitleSeparator',
      title: 'Meta Title Separator',
      description: 'Character(s) between the post title and the suffix.',
      type: 'string',
      group: 'seo',
      initialValue: ' — ',
    }),
    defineField({
      name: 'fallbackMetaTitle',
      title: 'Fallback Meta Title',
      description: 'Used when a post is missing or has no title.',
      type: 'string',
      group: 'seo',
      initialValue: 'Field Notes — Phos',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Blog Post Page (Detail Chrome)' }),
  },
});
