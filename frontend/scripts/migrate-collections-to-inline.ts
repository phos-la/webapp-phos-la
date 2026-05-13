/**
 * Migrates legacy top-level collection docs (pricingTier, testimonial, faq) into
 * inline arrays on their section singletons, and converts blogPost rows into a
 * references array on blogSection. Idempotent — safe to re-run.
 *
 * Usage: SANITY_API_TOKEN=... bun run scripts/migrate-collections-to-inline.ts
 */
import { createClient } from '@sanity/client';
import { randomUUID } from 'node:crypto';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'yfse28ye',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

type LegacyTier = {
  _id: string;
  name?: string;
  description?: string;
  price?: string;
  unit?: string;
  featured?: boolean;
  features?: string[];
  ctaLabel?: string;
  order?: number;
};
type LegacyTestimonial = { _id: string; quote?: string; name?: string; order?: number };
type LegacyFaq = { _id: string; question?: string; answer?: string; order?: number };
type LegacyBlogPost = { _id: string; order?: number };

const key = () => randomUUID().replace(/-/g, '').slice(0, 12);

async function run() {
  console.log('Fetching legacy collection docs...');
  const [tiers, testimonials, faqs, blogPosts] = await Promise.all([
    client.fetch<LegacyTier[]>('*[_type == "pricingTier"] | order(order asc)'),
    client.fetch<LegacyTestimonial[]>('*[_type == "testimonial"] | order(order asc)'),
    client.fetch<LegacyFaq[]>('*[_type == "faq"] | order(order asc)'),
    client.fetch<LegacyBlogPost[]>('*[_type == "blogPost"] | order(order asc)'),
  ]);
  console.log(
    `  ${tiers.length} pricingTier, ${testimonials.length} testimonial, ${faqs.length} faq, ${blogPosts.length} blogPost`,
  );

  const tx = client.transaction();

  if (tiers.length) {
    const inline = tiers.map((t) => ({
      _key: key(),
      _type: 'pricingTierItem',
      name: t.name,
      description: t.description,
      price: t.price,
      unit: t.unit,
      featured: t.featured,
      features: t.features,
      ctaLabel: t.ctaLabel,
    }));
    tx.patch('pricingCallout-singleton', (p) => p.set({ tiers: inline }));
    console.log(`  → patched pricingCallout-singleton with ${inline.length} tiers`);
  }

  if (testimonials.length) {
    const inline = testimonials.map((t) => ({
      _key: key(),
      _type: 'testimonialItem',
      quote: t.quote,
      name: t.name,
    }));
    tx.patch('testimonialsSection-singleton', (p) => p.set({ items: inline }));
    console.log(`  → patched testimonialsSection-singleton with ${inline.length} items`);
  }

  if (faqs.length) {
    const inline = faqs.map((f) => ({
      _key: key(),
      _type: 'faqItem',
      question: f.question,
      answer: f.answer,
    }));
    tx.patch('faqSection-singleton', (p) => p.set({ items: inline }));
    console.log(`  → patched faqSection-singleton with ${inline.length} items`);
  }

  if (blogPosts.length) {
    const refs = blogPosts.map((p) => ({
      _key: key(),
      _type: 'reference',
      _ref: p._id,
    }));
    tx.patch('blogSection-singleton', (p) => p.set({ posts: refs }));
    console.log(`  → patched blogSection-singleton with ${refs.length} post references`);
  }

  await tx.commit();
  console.log('Migration committed.');

  // Delete the now-orphaned legacy docs (pricingTier, testimonial, faq).
  // Blog posts are kept — they're still referenced from blogSection.posts.
  const orphans = [...tiers, ...testimonials, ...faqs].map((d) => d._id);
  if (orphans.length) {
    const delTx = client.transaction();
    orphans.forEach((id) => delTx.delete(id));
    await delTx.commit();
    console.log(`Deleted ${orphans.length} legacy collection docs.`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
