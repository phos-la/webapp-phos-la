import { defineField, defineType } from 'sanity';

const ICON_OPTIONS = [
  { title: 'IV drip (default for IV ketamine)', value: 'iv' },
  { title: 'Home (default for at-home ketamine)', value: 'home' },
  { title: 'Droplet (default for IV spa)', value: 'drop' },
  { title: 'Conversation (default for KAP)', value: 'conversation' },
];

const GRADIENT_OPTIONS = [
  { title: 'Forest green', value: 'green' },
  { title: 'Warm sand', value: 'sand' },
  { title: 'Sage mist', value: 'mist' },
  { title: 'Amber', value: 'amber' },
];

export const treatmentType = defineType({
  name: 'treatment',
  title: 'Treatment',
  type: 'document',
  groups: [
    { name: 'card', title: 'Card on /treatments index' },
    { name: 'hero', title: 'Slug page hero' },
    { name: 'protocol', title: 'Protocol section' },
    { name: 'eligibility', title: 'Eligibility' },
    { name: 'pricing', title: 'Pricing' },
    { name: 'steps', title: 'What to expect' },
    { name: 'related', title: 'Related care' },
    { name: 'meta', title: 'SEO + flags' },
  ],
  fields: [
    // Core
    defineField({
      name: 'title',
      title: 'Treatment Title',
      description: 'Used as the slug page hero heading. Line breaks become real <br>.',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'hero',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
      group: 'meta',
    }),
    defineField({
      name: 'draft',
      title: 'Mark as draft',
      description:
        'When checked, the slug page shows a visible amber "Draft" banner so editors know the copy still needs clinical review before publish.',
      type: 'boolean',
      initialValue: false,
      group: 'meta',
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 2,
      group: 'meta',
    }),

    // Card on /services index
    defineField({
      name: 'cardDescription',
      title: 'Card Description',
      description: 'Short blurb shown in the 2x2 grid on /treatments.',
      type: 'text',
      rows: 3,
      group: 'card',
    }),
    defineField({
      name: 'cardIcon',
      title: 'Card Icon',
      type: 'string',
      options: { list: ICON_OPTIONS, layout: 'radio' },
      initialValue: 'iv',
      group: 'card',
    }),
    defineField({
      name: 'cardGradient',
      title: 'Card Photo-Slot Gradient',
      description: 'Fallback gradient when no card photo is set.',
      type: 'string',
      options: { list: GRADIENT_OPTIONS, layout: 'radio' },
      initialValue: 'mist',
      group: 'card',
    }),
    defineField({
      name: 'cardPhoto',
      title: 'Card Photo (optional)',
      type: 'image',
      options: { hotspot: true },
      group: 'card',
    }),

    // Hero
    defineField({
      name: 'heroSub',
      title: 'Hero Sub-line',
      type: 'text',
      rows: 2,
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image (optional)',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
    }),

    // Stats strip
    defineField({
      name: 'stats',
      title: 'At-a-Glance Stats',
      description: 'Four tiles below the hero (e.g., "60 min · per session").',
      type: 'array',
      group: 'protocol',
      of: [
        {
          type: 'object',
          name: 'stat',
          fields: [
            defineField({ name: 'value', title: 'Value', type: 'string' }),
            defineField({ name: 'label', title: 'Label', type: 'string' }),
          ],
          preview: { select: { title: 'value', subtitle: 'label' } },
        },
      ],
    }),

    // Protocol section
    defineField({
      name: 'protocolAsideTitle',
      title: 'Protocol Aside Title',
      description: 'Sticky title on the left of the protocol section. Line breaks become <br>.',
      type: 'string',
      group: 'protocol',
    }),
    defineField({
      name: 'protocolBody',
      title: 'Protocol Body (Markdown)',
      description: 'Renders as Markdown. Supports paragraphs, bold, links, lists.',
      type: 'text',
      rows: 12,
      group: 'protocol',
    }),

    // Eligibility
    defineField({
      name: 'treatList',
      title: 'Patients We Typically Treat',
      type: 'array',
      group: 'eligibility',
      of: [
        {
          type: 'object',
          name: 'condition',
          fields: [
            defineField({ name: 'label', title: 'Condition', type: 'string' }),
            defineField({
              name: 'offlabel',
              title: 'Mark as off-label',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'offlabel' } },
        },
      ],
    }),
    defineField({
      name: 'referList',
      title: "Patients We'd Refer Elsewhere",
      type: 'array',
      of: [{ type: 'string' }],
      group: 'eligibility',
    }),
    defineField({
      name: 'qualifyLinkLabel',
      title: 'Qualify Link Label',
      type: 'string',
      initialValue: 'Take the self-assessment',
      group: 'eligibility',
    }),
    defineField({
      name: 'qualifyLinkHref',
      title: 'Qualify Link Href',
      type: 'string',
      initialValue: '/qualify',
      group: 'eligibility',
    }),

    // Pricing
    defineField({
      name: 'pricingMain',
      title: 'Pricing Headline',
      type: 'string',
      group: 'pricing',
    }),
    defineField({
      name: 'pricingNote',
      title: 'Pricing Note (Markdown)',
      description: 'Renders as Markdown. Inline links use [label](/href) syntax.',
      type: 'text',
      rows: 5,
      group: 'pricing',
    }),

    // Steps
    defineField({
      name: 'steps',
      title: 'What to Expect Steps',
      type: 'array',
      group: 'steps',
      of: [
        {
          type: 'object',
          name: 'step',
          fields: [
            defineField({ name: 'num', title: 'Step Number', type: 'string' }),
            defineField({ name: 'title', title: 'Step Title', type: 'string' }),
            defineField({ name: 'body', title: 'Step Body', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'title', subtitle: 'num' } },
        },
      ],
    }),

    // Related
    defineField({
      name: 'related',
      title: 'Related Care',
      description: 'Cross-link cards shown at the bottom of the slug page.',
      type: 'array',
      group: 'related',
      of: [
        {
          type: 'object',
          name: 'relatedCard',
          fields: [
            defineField({ name: 'tag', title: 'Tag', type: 'string' }),
            defineField({
              name: 'treatment',
              title: 'Treatment',
              type: 'reference',
              to: [{ type: 'treatment' }],
            }),
            defineField({
              name: 'bodyOverride',
              title: 'Body Override (optional)',
              description: "Optional. If blank, uses the linked service's card description.",
              type: 'text',
              rows: 2,
            }),
          ],
          preview: {
            select: { title: 'service.title', subtitle: 'tag' },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current', draft: 'draft' },
    prepare: ({ title, subtitle, draft }) => ({
      title: title ?? 'Untitled treatment',
      subtitle: `/${subtitle ?? '?'}${draft ? '  ·  DRAFT' : ''}`,
    }),
  },
});

export const treatmentsPageType = defineType({
  name: 'treatmentsPage',
  title: 'Treatments Index Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'intro', title: 'Intro paragraph' },
    { name: 'grid', title: 'Treatments grid' },
    { name: 'cta', title: 'CTA card' },
  ],
  fields: [
    // Hero
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      initialValue: 'Treatments',
      group: 'hero',
    }),
    defineField({
      name: 'heroSub',
      title: 'Hero Sub-line',
      type: 'text',
      rows: 2,
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image (optional)',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
    }),

    // Intro
    defineField({
      name: 'introBody',
      title: 'Intro Paragraph (Markdown)',
      type: 'text',
      rows: 8,
      group: 'intro',
    }),

    // Grid
    defineField({
      name: 'treatments',
      title: 'Treatments Shown on This Page',
      description:
        'Pick which Treatment documents appear, in what order. Drag to reorder. Edit a treatment by clicking it.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'treatment' }] }],
      group: 'grid',
    }),

    // CTA
    defineField({
      name: 'ctaText',
      title: 'CTA Card Text',
      type: 'text',
      rows: 2,
      group: 'cta',
    }),
    defineField({
      name: 'ctaPrimaryLabel',
      title: 'CTA Primary Button Label',
      type: 'string',
      initialValue: 'Book a consultation',
      group: 'cta',
    }),
    defineField({
      name: 'ctaPrimaryHref',
      title: 'CTA Primary Button Href',
      type: 'string',
      initialValue: '/book',
      group: 'cta',
    }),
    defineField({
      name: 'ctaSecondaryLabel',
      title: 'CTA Secondary Button Label',
      type: 'string',
      initialValue: 'See pricing',
      group: 'cta',
    }),
    defineField({
      name: 'ctaSecondaryHref',
      title: 'CTA Secondary Button Href',
      type: 'string',
      initialValue: '/pricing',
      group: 'cta',
    }),
    defineField({
      name: 'ctaAddress',
      title: 'CTA Address Line',
      type: 'string',
      group: 'cta',
    }),
  ],
  preview: {
    select: { title: 'heroTitle' },
    prepare: ({ title }) => ({ title: title ?? 'Services Page' }),
  },
});
