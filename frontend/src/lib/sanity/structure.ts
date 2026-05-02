import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
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
                .title('2. Services')
                .child(
                  S.document()
                    .title('Services')
                    .schemaType('servicesSection')
                    .documentId('servicesSection-singleton'),
                ),
              S.listItem()
                .title('3. Conditions')
                .child(
                  S.document()
                    .title('Conditions')
                    .schemaType('conditionsSection')
                    .documentId('conditionsSection-singleton'),
                ),
              S.listItem()
                .title('4. Provider (Dr. Riley)')
                .child(
                  S.document()
                    .title('Provider (Dr. Riley)')
                    .schemaType('providerSection')
                    .documentId('providerSection-singleton'),
                ),
              S.listItem()
                .title('5. Process Steps')
                .child(
                  S.document()
                    .title('Process Steps')
                    .schemaType('processSection')
                    .documentId('processSection-singleton'),
                ),
              S.listItem()
                .title('6. The Clinic (The Space)')
                .child(
                  S.document()
                    .title('The Clinic')
                    .schemaType('clinicSection')
                    .documentId('clinicSection-singleton'),
                ),
              S.listItem()
                .title('7. Pricing')
                .child(
                  S.list()
                    .title('Pricing')
                    .items([
                      S.listItem()
                        .title('Section Header & Callout')
                        .child(
                          S.document()
                            .title('Pricing Section Header')
                            .schemaType('pricingCallout')
                            .documentId('pricingCallout-singleton'),
                        ),
                      S.listItem()
                        .title('Pricing Tiers')
                        .child(S.documentTypeList('pricingTier').title('Pricing Tiers')),
                    ]),
                ),
              S.listItem()
                .title('8. Testimonials')
                .child(
                  S.list()
                    .title('Testimonials')
                    .items([
                      S.listItem()
                        .title('Section Header')
                        .child(
                          S.document()
                            .title('Testimonials Section Header')
                            .schemaType('testimonialsSection')
                            .documentId('testimonialsSection-singleton'),
                        ),
                      S.listItem()
                        .title('Testimonials')
                        .child(S.documentTypeList('testimonial').title('Testimonials')),
                    ]),
                ),
              S.listItem()
                .title('9. FAQ')
                .child(
                  S.list()
                    .title('FAQ')
                    .items([
                      S.listItem()
                        .title('Section Header')
                        .child(
                          S.document()
                            .title('FAQ Section Header')
                            .schemaType('faqSection')
                            .documentId('faqSection-singleton'),
                        ),
                      S.listItem()
                        .title('FAQ Items')
                        .child(S.documentTypeList('faq').title('FAQ Items')),
                    ]),
                ),
              S.listItem()
                .title('10. Blog')
                .child(
                  S.list()
                    .title('Blog')
                    .items([
                      S.listItem()
                        .title('Section Header')
                        .child(
                          S.document()
                            .title('Blog Section Header')
                            .schemaType('blogSection')
                            .documentId('blogSection-singleton'),
                        ),
                      S.listItem()
                        .title('Blog Posts')
                        .child(S.documentTypeList('blogPost').title('Blog Posts')),
                    ]),
                ),
              S.listItem()
                .title('11. Glimpses (Instagram)')
                .child(
                  S.document()
                    .title('Glimpses (Instagram)')
                    .schemaType('glimpsesSection')
                    .documentId('glimpsesSection-singleton'),
                ),
              S.listItem()
                .title('12. Footer')
                .child(
                  S.document()
                    .title('Footer')
                    .schemaType('footerSection')
                    .documentId('footerSection-singleton'),
                ),
            ]),
        ),
    ]);
