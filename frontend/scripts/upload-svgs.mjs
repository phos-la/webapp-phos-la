import { createClient } from '@sanity/client';
import fs from 'node:fs';
const env = Object.assign(
  {},
  ...['.env.local', '../../.env'].map((p) =>
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

async function up(file) {
  const a = await c.assets.upload('image', fs.createReadStream('public/svg/' + file), {
    filename: file,
    contentType: 'image/svg+xml',
  });
  return a._id;
}
const ids = {};
for (const f of [
  'iv-ketamine.svg',
  'kap.svg',
  'iv-spa.svg',
  'at-home.svg',
  'portrait-karly.svg',
  'portrait-guadalupe.svg',
  'portrait-maria.svg',
  'field-notes-pier.svg',
]) {
  ids[f.replace('.svg', '')] = await up(f);
  console.log('uploaded', f, '->', ids[f.replace('.svg', '')]);
}
function img(id) {
  return { _type: 'image', asset: { _ref: id, _type: 'reference' } };
}

// Patch treatment cards (cardPhoto on each treatment doc)
const tx = [
  ['treatment-iv-ketamine', { cardPhoto: img(ids['iv-ketamine']) }],
  ['treatment-kap', { cardPhoto: img(ids['kap']) }],
  ['treatment-iv-spa', { cardPhoto: img(ids['iv-spa']) }],
  ['treatment-at-home', { cardPhoto: img(ids['at-home']) }],
];
for (const [id, p] of tx) {
  await c.patch(id).set(p).commit();
  console.log('patched', id);
}

// Patch about page team portraits for Karly, Guadalupe, Maria
const about = await c.fetch(`*[_id=='aboutPage-singleton'][0]{teamMembers}`);
const tm = about.teamMembers.map((m) => {
  if (m.name === 'Karly Salcido') return { ...m, portrait: img(ids['portrait-karly']) };
  if (m.name === 'Guadalupe') return { ...m, portrait: img(ids['portrait-guadalupe']) };
  if (m.name === 'Maria') return { ...m, portrait: img(ids['portrait-maria']) };
  return m;
});
await c.patch('aboutPage-singleton').set({ teamMembers: tm }).commit();
console.log('patched aboutPage-singleton teamMembers (Karly/Guadalupe/Maria)');

fs.writeFileSync('../../assets/katie-photos/.sanity-svg-cache.json', JSON.stringify(ids, null, 2));
