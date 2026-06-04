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
                    .title('Treatments')
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
                .title('10. Field Notes')
                .child(
                  S.document()
                    .title('Field Notes (Home Section)')
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
      S.listItem()
        .title('About Page')
        .child(
          S.document()
            .title('About Page')
            .schemaType('aboutPage')
            .documentId('aboutPage-singleton'),
        ),
      S.listItem()
        .title('Treatments Index')
        .child(
          S.document()
            .title('Treatments Index')
            .schemaType('treatmentsPage')
            .documentId('treatmentsPage-singleton'),
        ),
      S.listItem().title('Treatments').child(S.documentTypeList('treatment').title('Treatments')),
      S.divider(),
      S.listItem()
        .title('Book Page')
        .child(
          S.list()
            .title('Book Page')
            .items([
              S.listItem()
                .title('Booking — Tabs + Copy')
                .child(
                  S.document()
                    .title('Book Page')
                    .schemaType('bookPage')
                    .documentId('bookPage-singleton'),
                ),
              S.listItem()
                .title('Thanks')
                .child(
                  S.document()
                    .title('Thanks Page')
                    .schemaType('bookThanksPage')
                    .documentId('bookThanksPage-singleton'),
                ),
              S.listItem()
                .title('Success (post-payment)')
                .child(
                  S.document()
                    .title('Success Page')
                    .schemaType('bookSuccessPage')
                    .documentId('bookSuccessPage-singleton'),
                ),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Field Notes (Blog)')
        .child(
          S.list()
            .title('Field Notes')
            .items([
              S.listItem()
                .title('Index Page — Hero + Featured')
                .child(
                  S.document()
                    .title('Blog Index Page')
                    .schemaType('blogIndexPage')
                    .documentId('blogIndexPage-singleton'),
                ),
              S.listItem()
                .title('Post Page — Detail Layout')
                .child(
                  S.document()
                    .title('Blog Post Layout (shared labels)')
                    .schemaType('blogPostPage')
                    .documentId('blogPostPage-singleton'),
                ),
              S.listItem()
                .title('All Posts')
                .child(S.documentTypeList('blogPost').title('Blog Posts')),
            ]),
        ),
    ]);
