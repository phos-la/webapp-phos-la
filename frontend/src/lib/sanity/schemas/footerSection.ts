import { defineField, defineType } from 'sanity';

export const footerSectionType = defineType({
  name: 'footerSection',
  title: 'Footer',
  type: 'document',
  groups: [
    { name: 'brand', title: 'Brand', default: true },
    { name: 'contact', title: 'Contact' },
    { name: 'social', title: 'Social' },
    { name: 'legal', title: 'Legal' },
  ],
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo Image',
      description: 'Optional. Shown above the address block in the footer.',
      type: 'image',
      options: { hotspot: true },
      group: 'brand',
    }),
    defineField({ name: 'logoAlt', title: 'Logo Alt Text', type: 'string', group: 'brand' }),
    defineField({
      name: 'businessName',
      title: 'Business Name',
      type: 'string',
      group: 'brand',
    }),
    defineField({ name: 'address', title: 'Address', type: 'string', group: 'contact' }),
    defineField({ name: 'phone', title: 'Phone Number', type: 'string', group: 'contact' }),
    defineField({ name: 'email', title: 'Email Address', type: 'string', group: 'contact' }),
    defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'url', group: 'social' }),
    defineField({ name: 'facebookUrl', title: 'Facebook URL', type: 'url', group: 'social' }),
    defineField({
      name: 'disclaimer',
      title: 'Legal Disclaimer',
      type: 'text',
      rows: 2,
      group: 'legal',
    }),
  ],
});
