/**
 * Seeds the navSection and footerSection singletons with the same defaults the
 * frontend components use as fallbacks. Uses `createIfNotExists` so re-running
 * never overwrites edits made in the studio.
 *
 * Usage: SANITY_API_TOKEN=<write-token> bun run scripts/seed-nav-footer.ts
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'yfse28ye',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function run() {
  console.log('Seeding nav + footer singletons (createIfNotExists)...');

  await client.createIfNotExists({
    _type: 'navSection',
    _id: 'navSection-singleton',
    brandTitle: 'PHOS',
    brandSubtitle: 'And Wellness',
    items: [
      { _key: 'nav1', label: 'Practice', href: '#practice' },
      { _key: 'nav2', label: 'Treatments', href: '#treatments' },
      { _key: 'nav3', label: 'About', href: '#about' },
      { _key: 'nav4', label: 'Contact', href: '#contact' },
    ],
    ctaLabel: 'Book a consultation',
    ctaHref: '/book',
  });
  console.log('  navSection-singleton ready');

  await client.createIfNotExists({
    _type: 'footerSection',
    _id: 'footerSection-singleton',
    businessName: 'Phos Wellness',
    address: '1762 Westwood Blvd, Ste 320, Los Angeles, CA 90024',
    phone: '(424) 278-4241',
    email: 'support@ketaminehealing.com',
    instagramUrl: 'https://www.instagram.com/ketaminehealingla',
    facebookUrl: 'https://www.facebook.com/ketaminehealingla',
    disclaimer:
      'IV ketamine for mood disorders is an off-label use. Spravato (esketamine) is FDA-approved for TRD.',
  });
  console.log('  footerSection-singleton ready');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
