import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site')
        .child(
          S.list()
            .title('Site')
            .items([
              S.listItem()
                .title('Navigation')
                .child(
                  S.document()
                    .title('Navigation')
                    .schemaType('navSection')
                    .documentId('navSection-singleton'),
                ),
              S.listItem()
                .title('Footer')
                .child(
                  S.document()
                    .title('Footer')
                    .schemaType('footerSection')
                    .documentId('footerSection-singleton'),
                ),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Home Page')
        .child(
          S.list()
            .title('Home Page')
            .items([
              S.listItem()
                .title('1. Hero')
                .child(
                  S.document()
                    .title('Hero')
                    .schemaType('heroSection')
                    .documentId('heroSection-singleton'),
                ),
              S.listItem()
                .title('2. Three ways to heal')
                .child(
                  S.document()
                    .title('Services')
                    .schemaType('servicesSection')
                    .documentId('servicesSection-singleton'),
                ),
              S.listItem()
                .title('3. Conditions we treat')
                .child(
                  S.document()
                    .title('Conditions')
                    .schemaType('conditionsSection')
                    .documentId('conditionsSection-singleton'),
                ),
              S.listItem()
                .title('4. Meet Dr. Riley')
                .child(
                  S.document()
                    .title('Provider')
                    .schemaType('providerSection')
                    .documentId('providerSection-singleton'),
                ),
              S.listItem()
                .title('5. From first call to integration')
                .child(
                  S.document()
                    .title('Process Steps')
                    .schemaType('processSection')
                    .documentId('processSection-singleton'),
                ),
              S.listItem()
                .title('6. Private, calm, Westwood')
                .child(
                  S.document()
                    .title('The Clinic')
                    .schemaType('clinicSection')
                    .documentId('clinicSection-singleton'),
                ),
              S.listItem()
                .title('7. Transparent pricing')
                .child(
                  S.document()
                    .title('Pricing')
                    .schemaType('pricingCallout')
                    .documentId('pricingCallout-singleton'),
                ),
              S.listItem()
                .title('8. What Clients Are Saying')
                .child(
                  S.document()
                    .title('Testimonials')
                    .schemaType('testimonialsSection')
                    .documentId('testimonialsSection-singleton'),
                ),
              S.listItem()
                .title('9. Questions you might have')
                .child(
                  S.document()
                    .title('FAQ')
                    .schemaType('faqSection')
                    .documentId('faqSection-singleton'),
                ),
              S.listItem()
                .title('10. Forest Stories')
                .child(
                  S.document()
                    .title('Blog Section')
                    .schemaType('blogSection')
                    .documentId('blogSection-singleton'),
                ),
              S.listItem()
                .title('11. Glimpses of the Journey')
                .child(
                  S.document()
                    .title('Glimpses (Instagram)')
                    .schemaType('glimpsesSection')
                    .documentId('glimpsesSection-singleton'),
                ),
            ]),
        ),
      S.divider(),
      S.listItem().title('Blog Posts').child(S.documentTypeList('blogPost').title('Blog Posts')),
    ]);
