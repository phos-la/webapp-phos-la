import { defineField, defineType } from 'sanity';

export const pricingTierType = defineType({
  name: 'pricingTier',
  title: 'Pricing Tier',
  type: 'document',
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
    defineField({ name: 'featured', title: 'Featured (Best Value)', type: 'boolean' }),
    defineField({
      name: 'features',
      title: 'Included Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'ctaLabel', title: 'CTA Button Label', type: 'string' }),
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

export const pricingCalloutType = defineType({
  name: 'pricingCallout',
  title: 'Pricing Callout',
  type: 'document',
  fields: [
    defineField({ name: 'label', title: 'Eyebrow Label', type: 'string' }),
    defineField({ name: 'heading', title: 'Section Heading', type: 'string' }),
    defineField({ name: 'subheading', title: 'Section Subheading', type: 'text', rows: 2 }),
    defineField({ name: 'calloutText', title: 'Callout Text', type: 'text', rows: 2 }),
    defineField({ name: 'calloutPhone', title: 'Callout Phone Number', type: 'string' }),
  ],
});
