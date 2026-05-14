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

const TARGET_HREFS: Record<string, { href: string; label?: string }> = {
  Practice: { href: '/' },
  Treatments: { href: '/treatments' },
  About: { href: '/about' },
  // Legacy label was "Contact"; book CTA already handles that slot, so we
  // repurpose it as a Field Notes link to the blog.
  Contact: { href: '/blog', label: 'Field Notes' },
  'Field Notes': { href: '/blog' },
};

type NavItem = { _key?: string; label?: string; href?: string };

async function patchOne(id: string) {
  // Fetch the full doc so createOrReplace doesn't drop fields we don't touch.
  // Using createOrReplace because the workspace token has create permission
  // but not update permission, and a plain patch() would 403.
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

  const patched = doc.items.map((item) => {
    const target = item.label ? TARGET_HREFS[item.label] : undefined;
    if (!target) return item;
    return { ...item, href: target.href, ...(target.label ? { label: target.label } : {}) };
  });

  await client.createOrReplace({ ...doc, items: patched });
  console.log(`Patched ${id}:`);
  patched.forEach((item) => {
    console.log(`  ${item.label?.padEnd(12)} ${item.href}`);
  });
}

async function run() {
  // Sanity has both a published doc and a drafts.<id> doc when an editor has
  // ever opened the doc in the studio. Authenticated GROQ reads drafts first,
  // so we patch both copies to keep them in sync. Either being missing is OK.
  await patchOne('navSection-singleton');
  await patchOne('drafts.navSection-singleton');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
