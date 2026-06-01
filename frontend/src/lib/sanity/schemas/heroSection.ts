import { defineField, defineType } from 'sanity';

export const heroSectionType = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'subheading', title: 'Subheading', type: 'text', rows: 3 }),
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
