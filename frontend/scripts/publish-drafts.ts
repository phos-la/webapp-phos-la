/**
 * Publishes a list of draft singletons by:
 *  1) reading drafts.X
 *  2) diffing against the published X (top-level field-by-field)
 *  3) writing draft content to X (createOrReplace)
 *  4) deleting drafts.X
 *
 * Steps 3 + 4 run in one transaction so the doc is never partially published.
 *
 * Usage: SANITY_API_TOKEN=<dev-token> bun run scripts/publish-drafts.ts
 */
import { createClient } from '@sanity/client';

const DRAFT_IDS = [
  'drafts.navSection-singleton',
  'drafts.servicesSection-singleton',
  'drafts.conditionsSection-singleton',
  'drafts.providerSection-singleton',
  'drafts.pricingCallout-singleton',
  'drafts.clinicSection-singleton',
];

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'yfse28ye',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const SYSTEM_FIELDS = new Set(['_id', '_rev', '_createdAt', '_updatedAt']);

function diffShallow(published: Record<string, unknown> | null, draft: Record<string, unknown>) {
  const changes: { field: string; from: unknown; to: unknown }[] = [];
  const all = new Set([...Object.keys(published ?? {}), ...Object.keys(draft)]);
  for (const k of all) {
    if (SYSTEM_FIELDS.has(k)) continue;
    const a = published?.[k];
    const b = draft[k];
    if (JSON.stringify(a) !== JSON.stringify(b)) {
      changes.push({ field: k, from: a, to: b });
    }
  }
  return changes;
}

function trunc(v: unknown, max = 80): string {
  const s = typeof v === 'string' ? v : JSON.stringify(v);
  if (s === undefined) return 'undefined';
  if (s.length <= max) return s;
  return s.slice(0, max - 1) + '…';
}

async function run() {
  for (const draftId of DRAFT_IDS) {
    const publishedId = draftId.replace(/^drafts\./, '');
    console.log(`\n── ${publishedId} ─────────────────────────────────────`);

    const [published, draft] = await Promise.all([
      client.getDocument(publishedId),
      client.getDocument(draftId),
    ]);

    if (!draft) {
      console.log('  draft missing — nothing to publish, skipping');
      continue;
    }

    const diff = diffShallow(
      published as Record<string, unknown> | null,
      draft as Record<string, unknown>,
    );

    if (diff.length === 0) {
      console.log('  no field-level differences (just deleting the orphan draft)');
    } else {
      console.log(`  ${diff.length} field(s) will change on publish:`);
      for (const { field, from, to } of diff) {
        console.log(`    • ${field}`);
        console.log(`        from: ${trunc(from)}`);
        console.log(`        to:   ${trunc(to)}`);
      }
    }

    // Build the publish payload — strip system fields, override _id.
    const payload: Record<string, unknown> = { ...draft, _id: publishedId };
    delete payload._rev;
    delete payload._createdAt;
    delete payload._updatedAt;

    await client
      .transaction()
      .createOrReplace(payload as Parameters<typeof client.createOrReplace>[0])
      .delete(draftId)
      .commit({ visibility: 'sync' });

    console.log('  published ✓');
  }

  console.log('\nDone.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
