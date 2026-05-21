import { defineField, defineType } from 'sanity';

export const heroSectionType = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 3 }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Button Label',
      type: 'string',
      initialValue: 'Schedule a consultation',
    }),
    defineField({
      name: 'ctaHref',
      title: 'CTA Button Link',
      description:
        'Where the hero button sends visitors. Defaults to /book (the booking page). Use a full URL for external links.',
      type: 'string',
      initialValue: '/book',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Parallax Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Main background image with parallax scroll effect',
    }),
    defineField({ name: 'overlayHeadline', title: 'Image Overlay Headline', type: 'string' }),
    defineField({ name: 'overlayBody', title: 'Image Overlay Body', type: 'text', rows: 4 }),
  ],
});
