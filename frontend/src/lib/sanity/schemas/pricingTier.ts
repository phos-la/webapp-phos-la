import { defineField, defineType } from 'sanity';

export const pricingTierItemType = defineType({
  name: 'pricingTierItem',
  title: 'Pricing Tier',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Tier Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'description', title: 'Short Description', type: 'text', rows: 2 }),
    defineField({
      name: 'price',
      title: 'Price Display',
      type: 'string',
      description: 'e.g. "$650" or "$400"',
    }),
    defineField({
      name: 'unit',
      title: 'Price Unit',
      type: 'string',
      description: 'e.g. "/session" or "/mo"',
    }),
    defineField({
      name: 'priceTiers',
      title: 'Multiple Prices',
      description:
        'Use this when one card has several prices (e.g. by duration), instead of the single Price Display above. Each row shows a label and an amount. When set, this replaces the single price.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g. "2-hour infusion"',
            }),
            defineField({
              name: 'amount',
              title: 'Amount',
              type: 'string',
              description: 'e.g. "$850"',
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'amount' } },
        },
      ],
    }),
    defineField({ name: 'featured', title: 'Featured (Best Value)', type: 'boolean' }),
    defineField({
      name: 'features',
      title: 'Included Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'price' },
  },
});

export const pricingCalloutType = defineType({
  name: 'pricingCallout',
  title: 'Pricing Section',
  type: 'document',
  fields: [
    defineField({ name: 'label', title: 'Eyebrow Label', type: 'string' }),
    defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
    defineField({ name: 'subheading', title: 'Section Subheading', type: 'text', rows: 2 }),
    defineField({
      name: 'tiers',
      title: 'Pricing Tiers',
      description: 'The tiers shown on the home page Pricing section. Drag to reorder.',
      type: 'array',
      of: [{ type: 'pricingTierItem' }],
    }),
    defineField({
      name: 'calloutText',
      title: 'Footer Callout Text',
      description: 'The "Not sure where to start?" message below the tiers.',
      type: 'text',
      rows: 2,
    }),
    defineField({ name: 'calloutPhone', title: 'Footer Callout Phone Number', type: 'string' }),
  ],
});
