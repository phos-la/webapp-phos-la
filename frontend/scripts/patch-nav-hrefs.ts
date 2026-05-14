/**
 * Patches the existing navSection-singleton document so the four primary
 * nav items point at real routes instead of the homepage anchors:
 *
 *   Practice    /
 *   Treatments  /services
 *   About       /about
 *   Contact     /#contact
 *
 * Idempotent. Run after seed-nav-footer.ts (or independently) to fix the
 * legacy anchor-only nav items that shipped before /about and /services
 * existed as real routes.
 *
 * Usage: SANITY_API_TOKEN=<write-token> bun run scripts/patch-nav-hrefs.ts
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'yfse28ye',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const TARGET_HREFS: Record<string, string> = {
  Practice: '/',
  Treatments: '/services',
  About: '/about',
  Contact: '/#contact',
};

type NavItem = { _key?: string; label?: string; href?: string };

async function run() {
  const doc = await client.fetch<{ items?: NavItem[] } | null>(
    '*[_type == "navSection" && _id == "navSection-singleton"][0]{ items }',
  );
  if (!doc?.items?.length) {
    console.log('No navSection-singleton found (or no items). Nothing to patch.');
    return;
  }

  const patched = doc.items.map((item) => {
    const target = item.label ? TARGET_HREFS[item.label] : undefined;
    return target ? { ...item, href: target } : item;
  });

  await client.patch('navSection-singleton').set({ items: patched }).commit();
  console.log('Patched navSection-singleton.items to use route-based hrefs.');
  patched.forEach((item) => {
    console.log(`  ${item.label?.padEnd(12)} ${item.href}`);
  });
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
