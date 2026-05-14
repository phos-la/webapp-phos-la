import { defineField, defineType } from 'sanity';

export const aboutPageType = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'christa', title: 'Featured Provider (Dr. Christa Riley)' },
    { name: 'team', title: 'Clinic Team' },
    { name: 'kap', title: 'KAP (Extended Care)' },
    { name: 'location', title: 'Location + CTA' },
  ],
  fields: [
    // Hero
    defineField({
      name: 'eyebrowLabel',
      title: 'Eyebrow Label',
      type: 'string',
      group: 'hero',
      initialValue: 'About',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      group: 'hero',
      initialValue: 'About Phos',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'text',
      rows: 2,
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
    }),
    defineField({
      name: 'heroImageCaption',
      title: 'Hero Image Caption',
      type: 'string',
      description:
        "Shown over the bottom of the hero image. Example: 'Photo: Christa and Katie, Huntington Garden shoot, April 2026'.",
      group: 'hero',
    }),

    // Featured Provider — Dr. Christa Riley
    defineField({
      name: 'christaEyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'christa',
      initialValue: 'Medical Director',
    }),
    defineField({
      name: 'christaName',
      title: 'Name',
      type: 'string',
      group: 'christa',
      initialValue: 'Dr. Christa Riley, MD',
    }),
    defineField({
      name: 'christaBio',
      title: 'Bio',
      type: 'text',
      rows: 8,
      group: 'christa',
    }),
    defineField({
      name: 'christaCredentials',
      title: 'Credential Tags',
      description: 'Small pills shown at the bottom of the featured provider card.',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'christa',
    }),
    defineField({
      name: 'christaPortrait',
      title: 'Portrait Photo',
      type: 'image',
      options: { hotspot: true },
      group: 'christa',
    }),

    // Team grid
    defineField({
      name: 'teamLabel',
      title: 'Team Section Eyebrow',
      type: 'string',
      group: 'team',
      initialValue: 'The clinic',
    }),
    defineField({
      name: 'teamHeading',
      title: 'Team Section Heading',
      type: 'string',
      group: 'team',
      initialValue: "The team you'll see each visit",
    }),
    defineField({
      name: 'teamMembers',
      title: 'Team Members',
      description: 'Cards shown in the team grid below the featured provider. Drag to reorder.',
      type: 'array',
      group: 'team',
      of: [
        {
          type: 'object',
          name: 'teamMember',
          fields: [
            defineField({ name: 'role', title: 'Role', type: 'string' }),
            defineField({ name: 'name', title: 'Name', type: 'string' }),
            defineField({
              name: 'bio',
              title: 'Bio',
              type: 'text',
              rows: 4,
            }),
            defineField({
              name: 'portrait',
              title: 'Portrait Photo',
              type: 'image',
              options: { hotspot: true },
            }),
            defineField({
              name: 'gradient',
              title: 'Portrait Fallback Gradient',
              description: 'Used if no portrait photo is uploaded.',
              type: 'string',
              options: {
                list: [
                  { title: 'Steel (Katie default)', value: 'katie' },
                  { title: 'Sage (Vera default)', value: 'vera' },
                ],
                layout: 'radio',
              },
              initialValue: 'katie',
            }),
            defineField({
              name: 'placeholderNote',
              title: 'Placeholder Note',
              description:
                'Optional italic note shown under the bio (e.g. "Bio in progress. Katie to provide 2 to 3 sentences before publish."). Leave blank when the bio is final.',
              type: 'string',
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'role', media: 'portrait' },
          },
        },
      ],
    }),

    // KAP — extended care
    defineField({
      name: 'kapEyebrow',
      title: 'KAP Eyebrow',
      type: 'string',
      group: 'kap',
      initialValue: 'Extended care',
    }),
    defineField({
      name: 'kapHeading',
      title: 'KAP Heading',
      type: 'string',
      group: 'kap',
      initialValue: 'Ketamine-Assisted Psychotherapy',
    }),
    defineField({
      name: 'kapPartnerName',
      title: 'Partner Name',
      type: 'string',
      initialValue: 'With Carly Salcido',
      group: 'kap',
    }),
    defineField({
      name: 'kapBody',
      title: 'KAP Body',
      type: 'text',
      rows: 5,
      group: 'kap',
    }),
    defineField({
      name: 'kapLinkLabel',
      title: 'KAP Link Label',
      type: 'string',
      initialValue: 'Learn about KAP',
      group: 'kap',
    }),
    defineField({
      name: 'kapLinkHref',
      title: 'KAP Link Href',
      type: 'string',
      initialValue: '/services/kap',
      group: 'kap',
    }),
    defineField({
      name: 'kapPortrait',
      title: 'Partner Portrait',
      type: 'image',
      options: { hotspot: true },
      group: 'kap',
    }),

    // Location + CTA
    defineField({
      name: 'locationEyebrow',
      title: 'Location Eyebrow',
      type: 'string',
      group: 'location',
      initialValue: 'Find us',
    }),
    defineField({
      name: 'locationHeadline',
      title: 'Location Headline',
      type: 'string',
      group: 'location',
      initialValue: 'Westwood, Los Angeles',
    }),
    defineField({
      name: 'locationBody',
      title: 'Location Body',
      type: 'text',
      rows: 4,
      group: 'location',
    }),
    defineField({
      name: 'locationPrimaryCtaLabel',
      title: 'Primary CTA Label',
      type: 'string',
      group: 'location',
      initialValue: 'Book a consultation',
    }),
    defineField({
      name: 'locationPrimaryCtaHref',
      title: 'Primary CTA Href',
      type: 'string',
      group: 'location',
      initialValue: '/book',
    }),
    defineField({
      name: 'locationSecondaryCtaLabel',
      title: 'Secondary CTA Label',
      type: 'string',
      group: 'location',
      initialValue: 'See pricing',
    }),
    defineField({
      name: 'locationSecondaryCtaHref',
      title: 'Secondary CTA Href',
      type: 'string',
      group: 'location',
      initialValue: '/pricing',
    }),
    defineField({
      name: 'locationPhoto',
      title: 'Location Photo',
      type: 'image',
      options: { hotspot: true },
      group: 'location',
    }),
  ],
  preview: {
    select: { title: 'heroHeadline' },
    prepare: ({ title }) => ({ title: title ?? 'About Page' }),
  },
});
