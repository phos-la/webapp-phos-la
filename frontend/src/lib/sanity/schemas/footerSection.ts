import { defineField, defineType } from 'sanity';

export const footerSectionType = defineType({
  name: 'footerSection',
  title: 'Footer',
  type: 'document',
  fields: [
    defineField({ name: 'businessName', title: 'Business Name', type: 'string' }),
    defineField({ name: 'address', title: 'Address', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone Number', type: 'string' }),
    defineField({ name: 'email', title: 'Email Address', type: 'string' }),
    defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'url' }),
    defineField({ name: 'facebookUrl', title: 'Facebook URL', type: 'url' }),
    defineField({ name: 'disclaimer', title: 'Legal Disclaimer', type: 'text', rows: 2 }),
  ],
});
