import { defineField, defineType } from 'sanity';

export const clinicSectionType = defineType({
  name: 'clinicSection',
  title: 'Clinic Section (The Space)',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'body', title: 'Body', type: 'text', rows: 3 }),
    defineField({ name: 'address', title: 'Address Display Text', type: 'string' }),
    defineField({ name: 'mapsUrl', title: 'Google Maps URL', type: 'url' }),
    defineField({
      name: 'chips',
      title: 'Feature Chips',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'e.g. "Private suite", "Medical-grade monitoring"',
    }),
    defineField({
      name: 'photo1',
      title: 'Photo 1',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'photo2',
      title: 'Photo 2',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
});
