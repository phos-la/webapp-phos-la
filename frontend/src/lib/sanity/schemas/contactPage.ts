import { defineField, defineType } from 'sanity';

// Only the page title and intro paragraph are editable. The form fields,
// clinic address, phone, and map are intentionally hard-coded in the route.
export const contactPageType = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Page Title',
      type: 'string',
      initialValue: "Have a question? We're here.",
    }),
    defineField({
      name: 'intro',
      title: 'Intro Text',
      description: 'The paragraph under the title, above the form.',
      type: 'text',
      rows: 3,
      initialValue:
        'Send us a note and our team will get back to you, usually within one business day. Prefer to talk? Call or text (424) 278-4241.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Contact Page' }),
  },
});
