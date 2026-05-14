import { defineField, defineType } from 'sanity';

export const navSectionType = defineType({
  name: 'navSection',
  title: 'Navigation',
  type: 'document',
  groups: [
    { name: 'brand', title: 'Brand', default: true },
    { name: 'items', title: 'Nav Items' },
    { name: 'cta', title: 'CTA' },
  ],
  fields: [
    defineField({
      name: 'brandTitle',
      title: 'Brand Title',
      description: 'The large word in the logo (e.g. "PHOS")',
      type: 'string',
      group: 'brand',
    }),
    defineField({
      name: 'brandSubtitle',
      title: 'Brand Subtitle',
      description: 'Smaller text under the brand title (e.g. "And Wellness")',
      type: 'string',
      group: 'brand',
    }),
    defineField({
      name: 'logo',
      title: 'Logo Image',
      description: 'Optional. If set, replaces the default inline logo mark.',
      type: 'image',
      options: { hotspot: true },
      group: 'brand',
    }),
    defineField({
      name: 'logoAlt',
      title: 'Logo Alt Text',
      type: 'string',
      group: 'brand',
    }),
    defineField({
      name: 'items',
      title: 'Nav Items',
      type: 'array',
      group: 'items',
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
    defineField({ name: 'ctaLabel', title: 'CTA Label', type: 'string', group: 'cta' }),
    defineField({ name: 'ctaHref', title: 'CTA Href', type: 'string', group: 'cta' }),
  ],
});
