import { createClient } from '@sanity/client';
import fs from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';
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

// Resolve assetIds by reading cache + matching label-ish filename mapping.
// Simpler: do another upload by exact local filename and read the SHA1->assetId from cache.
const cache = JSON.parse(
  fs.readFileSync('../../assets/katie-photos/.sanity-asset-cache.json', 'utf8'),
);
const PHOTOS = path.resolve('../../assets/katie-photos/social-media-ready');
function idFor(filename) {
  const abs = path.join(PHOTOS, filename);
  const hash = crypto.createHash('sha1').update(fs.readFileSync(abs)).digest('hex');
  if (!cache[hash]) throw new Error('not in cache: ' + filename);
  return cache[hash];
}
function img(assetId, hotY = 0.5) {
  return {
    _type: 'image',
    asset: { _ref: assetId, _type: 'reference' },
    crop: { bottom: 0, left: 0, right: 0, top: 0 },
    hotspot: { height: 0.6, width: 0.6, x: 0.5, y: hotY },
  };
}

const christa = idFor(
  'Christa-Riley_Ketamine-Healing-Clinic-LA_Kim-Brundage-Photography_021726_223.jpg',
);
const katie = idFor(
  'Katie-Besanko_Ketamine-Healing-Clinic-LA_Kim-Brundage-Photography_021726_262.jpg',
);
const vera = idFor('Vera_Ketamine-Healing-Clinic-LA_Kim-Brundage-Photography_021726_201.jpg');
const aboutHero = idFor(
  'Christa and Katie_Ketamine-Healing-Clinic-LA_Kim-Brundage-Photography_021726_277.jpg',
);
const katieChrista287 = idFor(
  'Katie and Christa_Ketamine-Healing-Clinic-LA_Kim-Brundage-Photography_021726_287.jpg',
);
const katieIpad = idFor(
  'Katie-iPad_Ketamine-Healing-Clinic-LA_Kim-Brundage-Photography_021726_307.jpg',
);
const greenStone = idFor(
  'Green-Stone_Ketamine-Healing-Clinic-LA_Kim-Brundage-Photography_021826_332.jpg',
);

// HEAD-AT-TOP portraits, hotspot y=0.22 keeps faces visible
const ops = [
  // Homepage Christa provider section, set portrait
  { id: 'providerSection-singleton', patch: { portrait: img(christa, 0.22) } },
  // About page hero -> Christa+Katie, faces are upper half, y=0.30
  {
    id: 'aboutPage-singleton',
    patch: {
      heroImage: img(aboutHero, 0.3),
      christaPortrait: img(christa, 0.22),
      teamMembers: [
        {
          _key: 'tm-katie',
          _type: 'teamMember',
          role: 'Physician Assistant, PA-C',
          name: 'Katie Besanko',
          bio: 'Katie is the PA you will spend the most time with at Phos. She sits with every patient before infusion to set intentions, runs the 60-minute session alongside Christa, and stays for 15 to 20 minutes of integration after. She handles patient communications, protocol adjustments, and the day-to-day operation of the clinic.',
          portrait: img(katie, 0.22),
          gradient: 'katie',
        },
        {
          _key: 'tm-vera',
          _type: 'teamMember',
          role: 'Registered Nurse, RN',
          name: 'Vera',
          bio: 'Vera is our clinical nurse, present for infusions and patient care during your visit.',
          portrait: img(vera, 0.22),
          gradient: 'vera',
          placeholderNote:
            'Bio in progress. Vera to provide credentials and clinical background before publish.',
        },
        {
          _key: 'tm-karly',
          _type: 'teamMember',
          role: 'Licensed Therapist, LMFT',
          name: 'Karly Salcido',
          bio: 'Karly offers adjunct neurobiologically-informed integration therapy for patients who want structured psychotherapy alongside their ketamine protocol. She practices independently; sessions are booked directly with her and priced separately.',
          gradient: 'katie',
          placeholderNote: 'Portrait placeholder. Karly to provide headshot.',
        },
        {
          _key: 'tm-guadalupe',
          _type: 'teamMember',
          role: 'Patient Coordinator',
          name: 'Guadalupe',
          bio: 'Guadalupe handles patient onboarding, scheduling, and the front-of-house experience. She is often your first point of contact at Phos.',
          gradient: 'vera',
          placeholderNote: 'Portrait placeholder.',
        },
        {
          _key: 'tm-maria',
          _type: 'teamMember',
          role: 'Administrative Coordinator (Remote)',
          name: 'Maria',
          bio: 'Maria supports the clinic remotely with administrative coordination, client communication, and operational assistance. She brings several years of experience as a virtual assistant in healthcare.',
          gradient: 'katie',
          placeholderNote: 'Portrait placeholder.',
        },
      ],
    },
  },
  // Homepage clinicSection (Westwood) photos -> Katie shoot
  {
    id: 'clinicSection-singleton',
    patch: {
      photo1: img(katieIpad, 0.5),
      photo2: img(greenStone, 0.5),
    },
  },
  // Treatments page hero -> Christa+Katie, better than a solo bamboo
  { id: 'treatmentsPage-singleton', patch: { heroImage: img(katieChrista287, 0.3) } },
];
for (const op of ops) {
  await c.patch(op.id).set(op.patch).commit();
  console.log('patched', op.id, '->', Object.keys(op.patch).join(', '));
}
