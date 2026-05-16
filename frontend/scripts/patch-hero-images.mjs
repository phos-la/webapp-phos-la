import { createClient } from '@sanity/client';
import fs from 'node:fs';
const env = Object.assign(
  {},
  ...[
    '/Users/davidfox-powell/dev/cowork/project-tracker-parent/projects/cowork-phos-la/app/frontend/.env.local',
    '/Users/davidfox-powell/dev/cowork/project-tracker-parent/projects/cowork-phos-la/.env',
  ].map((p) =>
    fs
      .readFileSync(p, 'utf8')
      .split('\n')
      .reduce((a, l) => {
        const m = l.match(/^([A-Z_]+)=(.+)$/);
        if (m) a[m[1]] = m[2].replace(/^["']|["']$/g, '');
        return a;
      }, {}),
  ),
);
const c = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  token: env.SANITY_API_KEY,
  apiVersion: '2024-01-01',
  useCdn: false,
});
const cache = JSON.parse(
  fs.readFileSync(
    '/Users/davidfox-powell/dev/cowork/project-tracker-parent/projects/cowork-phos-la/assets/katie-photos/.sanity-asset-cache.json',
    'utf8',
  ),
);
const ids = Object.values(cache);
function img(ref) {
  return {
    _type: 'image',
    asset: { _ref: ref, _type: 'reference' },
    crop: { bottom: 0, left: 0, right: 0, top: 0 },
    hotspot: { height: 0.5, width: 0.5, x: 0.5, y: 0.5 },
  };
}
// pick by label substring on cached asset ids - just use the array order from seed:
// 0 heroVenice 1 aboutHero 2 christa 3 katie 4 katieAlt 5 vera 6 bamboo 7 katie-ipad 8 green-stone 9 venice-364 10 venice-371 11 venice-387 12 venice-390 13 katie-christa 14 katie-299 15 katie-christa-287
const venice364 = ids[9];
const katieIpad = ids[7];
const bamboo = ids[6];
const venice371 = ids[10];
const venice390 = ids[12];
const ops = [
  { id: 'treatmentsPage-singleton', patch: { heroImage: img(venice364) } },
  { id: 'treatment-iv-ketamine', patch: { heroImage: img(katieIpad) } },
  { id: 'treatment-kap', patch: { heroImage: img(bamboo) } },
  { id: 'treatment-iv-spa', patch: { heroImage: img(venice371) } },
  { id: 'treatment-at-home', patch: { heroImage: img(venice390) } },
];
for (const op of ops) {
  await c.patch(op.id).set(op.patch).commit();
  console.log('patched', op.id);
}
