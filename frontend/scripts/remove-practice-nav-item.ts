/**
 * Removes the "Practice" item from the navSection-singleton doc.
 *
 * "Practice" pointed at `/` which collides with the homepage. Final nav is
 * Treatments, About, Field Notes, plus the persistent Book a consultation CTA.
 *
 * Idempotent. Run with SANITY_API_TOKEN set.
 *
 * Usage: SANITY_API_TOKEN=<write-token> bun run scripts/remove-practice-nav-item.ts
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'yfse28ye',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

type NavItem = { _key?: string; label?: string; href?: string };

async function patchOne(id: string) {
  const doc = await client.fetch<{
    _id: string;
    _type: string;
    items?: NavItem[];
    [key: string]: unknown;
  } | null>('*[_id == $id][0]', { id });
  if (!doc?.items?.length) {
    console.log(`  (skip) ${id} not found or no items`);
    return;
  }

  const filtered = doc.items.filter((item) => item.label !== 'Practice');
  if (filtered.length === doc.items.length) {
    console.log(`  (skip) ${id} has no "Practice" item`);
    return;
  }

  await client.createOrReplace({ ...doc, items: filtered });
  console.log(`Patched ${id}:`);
  filtered.forEach((item) => {
    console.log(`  ${item.label?.padEnd(12)} ${item.href}`);
  });
}

async function run() {
  await patchOne('navSection-singleton');
  await patchOne('drafts.navSection-singleton');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
