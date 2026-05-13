import { defineField, defineType } from 'sanity';

export const navSectionType = defineType({
  name: 'navSection',
  title: 'Navigation',
  type: 'document',
  fields: [
    defineField({
      name: 'brandTitle',
      title: 'Brand Title',
      description: 'The large word in the logo (e.g. "PHOS")',
      type: 'string',
    }),
    defineField({
      name: 'brandSubtitle',
      title: 'Brand Subtitle',
      description: 'Smaller text under the brand title (e.g. "And Wellness")',
      type: 'string',
    }),
    defineField({
      name: 'logo',
      title: 'Logo Image',
      description: 'Optional. If set, replaces the default inline logo mark.',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logoAlt',
      title: 'Logo Alt Text',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'Nav Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navItem',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({
              name: 'href',
              title: 'Href',
              type: 'string',
              description: 'Anchor (e.g. "#practice") or path (e.g. "/about")',
            }),
          ],
          preview: {
            select: { title: 'label', subtitle: 'href' },
          },
        },
      ],
    }),
    defineField({ name: 'ctaLabel', title: 'CTA Label', type: 'string' }),
    defineField({ name: 'ctaHref', title: 'CTA Href', type: 'string' }),
  ],
});
