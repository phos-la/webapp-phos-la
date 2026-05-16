/* eslint-disable no-console */
// Idempotent Sanity content updater for Phos LA.
// Reads .env.local, uploads photos from ../../assets/katie-photos/, patches/creates docs.

import { createClient } from '@sanity/client';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const FRONTEND_DIR = path.resolve(import.meta.dirname, '..');
const PROJECT_DIR = path.resolve(FRONTEND_DIR, '..', '..');
const PHOTOS_DIR = path.join(PROJECT_DIR, 'assets', 'katie-photos', 'social-media-ready');
const BAMBOO = path.join(PROJECT_DIR, 'assets', 'katie-photos', 'katie-bamboo-garden.jpg');
const CACHE_FILE = path.join(PROJECT_DIR, 'assets', 'katie-photos', '.sanity-asset-cache.json');

function loadEnv(p) {
  if (!fs.existsSync(p)) return {};
  return fs
    .readFileSync(p, 'utf8')
    .split('\n')
    .reduce((a, l) => {
      const m = l.match(/^([A-Z_]+)=(.*)$/);
      if (m) a[m[1]] = m[2].replace(/^["']|["']$/g, '');
      return a;
    }, {});
}
const env = {
  ...loadEnv(path.join(FRONTEND_DIR, '.env.local')),
  ...loadEnv(path.join(PROJECT_DIR, '.env')),
};
const writeToken = env.SANITY_API_KEY || env.SANITY_API_TOKEN;

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  token: writeToken,
  apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
});

const cache = fs.existsSync(CACHE_FILE) ? JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8')) : {};
function saveCache() {
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

async function uploadImage(localPath, label) {
  const abs = path.isAbsolute(localPath) ? localPath : path.join(PHOTOS_DIR, localPath);
  if (!fs.existsSync(abs)) throw new Error(`missing photo: ${abs}`);
  const hash = crypto.createHash('sha1').update(fs.readFileSync(abs)).digest('hex');
  if (cache[hash]) {
    console.log(`  [cached] ${label || path.basename(abs)} -> ${cache[hash]}`);
    return imgRef(cache[hash]);
  }
  console.log(`  [uploading] ${label || path.basename(abs)}...`);
  const asset = await client.assets.upload('image', fs.createReadStream(abs), {
    filename: path.basename(abs),
  });
  cache[hash] = asset._id;
  saveCache();
  return imgRef(asset._id);
}

function imgRef(assetId) {
  return {
    _type: 'image',
    asset: { _ref: assetId, _type: 'reference' },
    crop: { bottom: 0, left: 0, right: 0, top: 0 },
    hotspot: { height: 0.5, width: 0.5, x: 0.5, y: 0.5 },
  };
}

// Existing docs snapshot, used to decide patch vs create.
const existing = await client.fetch(
  `*[!(_id in path('drafts.**'))][!(_type match 'system.*') && !(_type == 'sanity.imageAsset')]{_id, _type}`,
);
const existingIds = new Set(existing.map((d) => d._id));
console.log(`snapshot, ${existingIds.size} non-asset docs found`);

// ---- Upload images (only the ones we wire into docs) ----
console.log('\n=== uploading images ===');
const imgs = {
  // Homepage hero, use Venice-Beach landscape (calming, LA context)
  heroSwap: await uploadImage(
    'Venice-Beach_Ketamine-Healing-Clinic-LA_Kim-Brundage-Photography_021826_384.jpg',
    'hero-venice-beach',
  ),
  // About page hero, Christa and Katie together
  aboutHero: await uploadImage(
    'Christa and Katie_Ketamine-Healing-Clinic-LA_Kim-Brundage-Photography_021726_277.jpg',
    'about-hero-christa-katie',
  ),
  // Christa portrait, solo
  christa: await uploadImage(
    'Christa-Riley_Ketamine-Healing-Clinic-LA_Kim-Brundage-Photography_021726_223.jpg',
    'christa-portrait',
  ),
  // Katie portrait, solo
  katie: await uploadImage(
    'Katie-Besanko_Ketamine-Healing-Clinic-LA_Kim-Brundage-Photography_021726_262.jpg',
    'katie-portrait',
  ),
  katieAlt: await uploadImage(
    'Katie_Ketamine-Healing-Clinic-LA_Kim-Brundage-Photography_021726_259.jpg',
    'katie-alt',
  ),
  // Vera portrait
  vera: await uploadImage(
    'Vera_Ketamine-Healing-Clinic-LA_Kim-Brundage-Photography_021726_201.jpg',
    'vera-portrait',
  ),
  // Bamboo, Katie alternative
  bamboo: await uploadImage(BAMBOO, 'katie-bamboo'),
  // Glimpses row (varied)
  g1: await uploadImage(
    'Katie-iPad_Ketamine-Healing-Clinic-LA_Kim-Brundage-Photography_021726_307.jpg',
    'g-katie-ipad',
  ),
  g2: await uploadImage(
    'Green-Stone_Ketamine-Healing-Clinic-LA_Kim-Brundage-Photography_021826_332.jpg',
    'g-green-stone',
  ),
  g3: await uploadImage(
    'Venice-Beach_Ketamine-Healing-Clinic-LA_Kim-Brundage-Photography_021826_364.jpg',
    'g-venice-364',
  ),
  g4: await uploadImage(
    'Venice-Beach_Ketamine-Healing-Clinic-LA_Kim-Brundage-Photography_021826_371.jpg',
    'g-venice-371',
  ),
  g5: await uploadImage(
    'Venice-Beach_Ketamine-Healing-Clinic-LA_Kim-Brundage-Photography_021826_387.jpg',
    'g-venice-387',
  ),
  g6: await uploadImage(
    'Venice-Beach_Ketamine-Healing-Clinic-LA_Kim-Brundage-Photography_021826_390.jpg',
    'g-venice-390',
  ),
  g7: await uploadImage(
    'Katie-Christa_Ketamine-Healing-Clinic-LA_Kim-Brundage-Photography_021726_289.jpg',
    'g-katie-christa',
  ),
  g8: await uploadImage(
    'Katie_Ketamine-Healing-Clinic-LA_Kim-Brundage-Photography_021726_299.jpg',
    'g-katie-299',
  ),
  g9: await uploadImage(
    'Katie and Christa_Ketamine-Healing-Clinic-LA_Kim-Brundage-Photography_021726_287.jpg',
    'g-katie-christa-287',
  ),
};

function glimpseRow(prefix, items) {
  return items.map((img, i) => ({ ...img, _key: `${prefix}-${i}` }));
}

// ---- Patches ----
console.log('\n=== applying content updates ===');

const ops = [
  // Hero, swap image only, copy stays (already strong)
  {
    id: 'heroSection-singleton',
    patch: { heroImage: imgs.heroSwap },
  },

  // Services, Katie corrections: "five to six" not "six"; clarify NAD+ note
  {
    id: 'servicesSection-singleton',
    patch: {
      cards: [
        {
          _key: 'card-1',
          title: 'IV Ketamine Infusions',
          body: 'An initial series of five to six subanesthetic infusions over two to three weeks, overseen by Dr. Christa Riley, board-certified anesthesiologist. Your PA meets with you before and after every 60-minute session, adjusting dosing, duration, and supportive therapies based on your response.',
        },
        {
          _key: 'card-2',
          title: 'Ketamine-Assisted Therapy',
          body: 'Bring your existing therapist to the session, or work with Karly Salcido, our partner therapist trained in neurobiologically-informed integration. Therapy is optional and priced separately, never bundled into infusion costs.',
        },
        {
          _key: 'card-3',
          title: 'IV Spa Vitamin Wellness',
          body: "NAD+, Myers' Cocktail, glutathione, and other IV wellness infusions administered by our clinical team. Priced separately from ketamine infusions, available as a standalone service or alongside your protocol.",
        },
      ],
    },
  },

  // FAQs, Katie's corrections (no "highest success rate" claim, fix counts/timings)
  {
    id: 'faqSection-singleton',
    patch: {
      items: [
        {
          _key: 'f1',
          _type: 'faqItem',
          question: 'What is IV ketamine therapy?',
          answer:
            "IV ketamine blocks NMDA glutamate receptors, triggering rapid increases in BDNF (brain-derived neurotrophic factor) and new synaptic connections in the prefrontal cortex. Unlike SSRIs, which modulate serotonin over weeks, ketamine's antidepressant effect often appears within hours to days. A standard initial series is five to six 60-minute infusions over two to three weeks.",
        },
        {
          _key: 'f2',
          _type: 'faqItem',
          question: 'Who is a candidate?',
          answer:
            "Adults with treatment-resistant depression, anxiety, PTSD, or chronic pain who haven't found adequate relief from conventional treatments. We use a pre-screening process. People are generally not candidates if they have schizophrenia, active psychosis, bipolar mania, uncontrolled cardiovascular disease or hypertension, or pregnancy. Your candidacy is confirmed at your initial consultation.",
        },
        {
          _key: 'f3',
          _type: 'faqItem',
          question: 'How many sessions will I need?',
          answer:
            'Most patients start with five to six infusions over two to three weeks. After the initial series, your PA reviews your response and discusses maintenance timing based on how you are doing, not a preset schedule. Single sessions are allowed, but the full protocol is recommended because most patients need several sessions to reach a transition point.',
        },
        {
          _key: 'f4',
          _type: 'faqItem',
          question: 'What happens during an infusion?',
          answer:
            'Your PA meets with you first to confirm the protocol for the session. The infusion itself runs 60 minutes for a standard session, with longer 90-minute, 2-hour, 3-hour and 4-hour options available for pain or mood. You will experience a transient dissociative state. Afterwards your PA checks in for 15 to 20 minutes of integration before you leave. You will need a driver to take you home.',
        },
        {
          _key: 'f5',
          _type: 'faqItem',
          question: 'What is included in the price?',
          answer:
            'No hidden fees. The infusion price covers the initial consultation, IV placement, the ketamine itself, and any supportive medications added during the session (Zofran for nausea, Ketorolac for headache, magnesium). NAD+ and IV spa wellness modalities are priced separately under our IV Spa offerings. Add-ons are a shared decision between you and your PA.',
        },
        {
          _key: 'f6',
          _type: 'faqItem',
          question: 'Does insurance cover IV ketamine?',
          answer:
            'IV ketamine for mood disorders is an off-label use and is not covered by most insurance plans. It is cash-pay. HSA and FSA funds are eligible. Spravato (esketamine nasal spray), the FDA-approved version for treatment-resistant depression, will be available at our clinic soon and is covered by many insurance plans.',
        },
        {
          _key: 'f7',
          _type: 'faqItem',
          question: 'What makes Phos different from other LA clinics?',
          answer:
            'At most clinics you see a nurse during your infusions and a physician only periodically. Here, a licensed PA meets with you before and after every single infusion, actively adjusting your dosing, duration, and supportive therapies each visit. Protocols start at 0.4 to 0.7 mg/kg/hr and are weight-based, then refined to your response. Led by Dr. Christa Riley, board-certified anesthesiologist and military veteran.',
        },
      ],
    },
  },

  // Process, fix step-3 count
  {
    id: 'processSection-singleton',
    patch: {
      steps: [
        {
          _key: 'step-1',
          num: '1',
          title: 'Screening call',
          body: 'A short consultation to understand your history, walk through candidacy, and answer your questions. If you are a fit we will get you scheduled. If not we will tell you honestly and point you in the right direction.',
        },
        {
          _key: 'step-2',
          num: '2',
          title: 'PA evaluation',
          body: 'Before your first infusion, your PA reviews your medical history, current medications, and goals. This is where your starting protocol is set, dose (0.4 to 0.7 mg/kg/hr weight-based), session duration, and any supportive therapies like magnesium or anti-nausea support.',
        },
        {
          _key: 'step-3',
          num: '3',
          title: 'Your infusions',
          body: 'Five to six sessions over two to three weeks, administered in our Westwood clinic under medical supervision. Your PA checks in before and after every infusion, adjusting your protocol based on how you are responding, not a fixed template.',
        },
        {
          _key: 'step-4',
          num: '4',
          title: 'Integration support',
          body: 'After your series, your PA discusses your outcomes and next steps. Whether that is maintenance sessions, connecting with a therapist, or both, you leave with a clear plan rather than a handoff.',
        },
      ],
    },
  },

  // Pricing, rewrite to match real bookThanksPage prices (was a fictional $400 callout)
  {
    id: 'pricingCallout-singleton',
    patch: {
      heading: 'Transparent pricing',
      label: 'Pricing',
      subheading:
        'Every session includes PA consultation before and after, plus any supportive medications added to your protocol. No surprise line items. NAD+ and IV spa wellness are priced separately.',
      tiers: [
        {
          _key: 'tier-1',
          _type: 'pricingTierItem',
          name: 'Initial Consultation',
          price: '$100',
          unit: '',
          featured: false,
          description:
            'A 15-minute screening call to confirm candidacy and answer questions. Applied as credit toward your first infusion.',
          features: [
            'PA review of your intake',
            'Candidacy confirmation',
            'Credit toward first infusion',
          ],
          ctaLabel: 'Book a consultation',
        },
        {
          _key: 'tier-2',
          _type: 'pricingTierItem',
          name: 'IV Ketamine Infusion',
          price: '$700',
          unit: '/session',
          featured: true,
          description:
            'Standard 60-minute IV ketamine infusion. Sessions one through four of the initial protocol.',
          features: [
            'Pre-infusion PA consultation',
            'IV ketamine administration',
            'Supportive medications included',
            'Post-infusion integration',
          ],
          ctaLabel: 'Book a consultation',
        },
        {
          _key: 'tier-3',
          _type: 'pricingTierItem',
          name: 'Booster Infusion',
          price: '$550',
          unit: '/session',
          featured: false,
          description:
            'For established patients returning for maintenance. Same 60-minute session, same level of clinical attention.',
          features: [
            'Full PA evaluation',
            'Protocol adjustment as needed',
            'Available biweekly, monthly, or on your timing',
          ],
          ctaLabel: 'Ask about boosters',
        },
        {
          _key: 'tier-4',
          _type: 'pricingTierItem',
          name: '6-Infusion Membership',
          price: '$2,750',
          unit: '',
          featured: false,
          description:
            'For established patients with proof of four prior sessions. Six additional infusions to use at your pace. Non-transferable, non-refundable.',
          features: [
            'Six 60-minute infusions',
            'Use over months or longer',
            'Locks in lower per-session rate',
          ],
          ctaLabel: 'Ask about eligibility',
        },
        {
          _key: 'tier-5',
          _type: 'pricingTierItem',
          name: 'At-Home Program',
          price: 'Starting at $200',
          unit: '/visit',
          featured: false,
          description:
            'Telehealth-based ketamine therapy for eligible existing patients. First video consult $250, second $225, third $200, follow-ups $250.',
          features: [
            'Video evaluation',
            'Prescription dispensed monthly',
            '6-month re-evaluation visit',
            'For established patients only',
          ],
          ctaLabel: 'Ask about eligibility',
        },
      ],
      calloutText:
        'Not sure where to start? A free 15-minute screening call walks you through candidacy and options before you commit to anything.',
      calloutPhone: '(424) 278-4241',
    },
  },

  // Testimonials, replace forest-retreat placeholder content with empty array until real ones land
  {
    id: 'testimonialsSection-singleton',
    patch: {
      heading: 'What patients say',
      label: 'Patient stories',
      subheading:
        'Verified patient experiences are being gathered. We will publish them with permission and HIPAA-appropriate detail.',
      items: [],
    },
  },

  // Glimpses, refresh image rows with Katie's new shoot
  {
    id: 'glimpsesSection-singleton',
    patch: {
      heading: 'Glimpses of the practice',
      label: 'Photography',
      subheading: 'A look at the clinic, the team, and the city.',
      instagramHandle: '@ketaminehealingla',
      instagramUrl: 'https://www.instagram.com/ketaminehealingla',
      row1Images: glimpseRow('r1', [
        imgs.g1,
        imgs.g2,
        imgs.g3,
        imgs.g4,
        imgs.g5,
        imgs.g6,
        imgs.g7,
        imgs.g8,
        imgs.g9,
      ]),
      row2Images: glimpseRow('r2', [
        imgs.g6,
        imgs.g3,
        imgs.g7,
        imgs.g4,
        imgs.g2,
        imgs.g5,
        imgs.g1,
        imgs.g8,
        imgs.g9,
      ]),
    },
  },

  // About page, full create (does not yet exist)
  {
    id: 'aboutPage-singleton',
    type: 'aboutPage',
    create: {
      heroHeadline: 'About Phos',
      heroSubheading:
        'A Westwood ketamine clinic built around a board-certified anesthesiologist and a small, hands-on care team. We bought this practice to run it like a real medical operation, not a wellness brand.',
      heroImage: imgs.aboutHero,
      heroImageCaption: 'Christa and Katie, clinic shoot, Westwood',
      christaName: 'Dr. Christa Riley, MD',
      christaBio:
        'Christa is a board-certified anesthesiologist and the medical director of Phos. Her work in operating rooms and on active military service in Afghanistan shaped how she runs this clinic, patient-by-patient judgment, careful dosing, full evaluation before and after every infusion. She bought the practice because she wanted a ketamine clinic that took itself seriously as a medical operation, not a wellness brand. She sees every Phos patient herself and sets the standard the rest of the team works to.',
      christaCredentials: [
        'Board-certified anesthesiologist',
        'Military veteran, Afghanistan',
        'Owner of Phos',
      ],
      christaPortrait: imgs.christa,
      teamHeading: "The team you'll see each visit",
      teamMembers: [
        {
          _key: 'tm-katie',
          _type: 'teamMember',
          role: 'Physician Assistant, PA-C',
          name: 'Katie Besanko',
          bio: 'Katie is the PA you will spend the most time with at Phos. She sits with every patient before infusion to set intentions, runs the 60-minute session alongside Christa, and stays for 15 to 20 minutes of integration after. She handles patient communications, protocol adjustments, and the day-to-day operation of the clinic.',
          portrait: imgs.katie,
          gradient: 'katie',
        },
        {
          _key: 'tm-vera',
          _type: 'teamMember',
          role: 'Registered Nurse, RN',
          name: 'Vera',
          bio: 'Vera is our clinical nurse, present for infusions and patient care during your visit.',
          placeholderNote:
            'Bio in progress. Vera to provide credentials and clinical background before publish.',
          portrait: imgs.vera,
          gradient: 'vera',
        },
        {
          _key: 'tm-karly',
          _type: 'teamMember',
          role: 'Therapist, LMFT (independent partner)',
          name: 'Karly Salcido',
          bio: 'Karly is an independent licensed therapist who partners with Phos for ketamine-assisted integration. Her approach is neurobiologically-informed, designed to leverage the 7 to 10 day neuroplastic window that follows infusion. She specializes in trauma (including complex PTSD), dissociation, chronic stress, mood disorders, and dual diagnosis. Sessions are $300 for 50 minutes and booked separately, in person or via telehealth.',
          placeholderNote: 'Photo to follow.',
          gradient: 'vera',
        },
        {
          _key: 'tm-guadalupe',
          _type: 'teamMember',
          role: 'Patient Coordinator',
          name: 'Guadalupe',
          bio: 'Guadalupe handles new-patient onboarding, scheduling, and front-desk coordination at the Westwood clinic.',
          placeholderNote: 'Bio in progress. Photo and longer bio to follow.',
          gradient: 'katie',
        },
        {
          _key: 'tm-maria',
          _type: 'teamMember',
          role: 'Virtual Patient Coordinator',
          name: 'Maria',
          bio: 'Maria has worked as a virtual assistant for several years across healthcare and other industries. She supports the clinic remotely through administrative coordination, client communication, and operational assistance, helping maintain efficient and compassionate care.',
          placeholderNote: 'Photo to follow.',
          gradient: 'vera',
        },
      ],
      kapHeading: 'Ketamine-Assisted Psychotherapy',
      kapPartnerName: 'With Karly Salcido, LMFT',
      kapBody:
        'For patients who want adjunctive psychotherapy alongside their infusion protocol, Phos partners with Karly Salcido. Her work is structured around the neuroplastic window that follows ketamine, a 7 to 10 day period when the brain is more receptive to new patterns. Pre-infusion sessions clarify symptom targets and prepare the nervous system. Post-infusion integration metabolises the experience and translates insight into lasting change. Karly sees patients independently and prices her sessions separately, never bundled into infusion costs.',
      kapLinkLabel: 'Learn about KAP',
      kapLinkHref: '/treatments/kap',
      locationHeadline: 'Westwood, Los Angeles',
      locationBody:
        '1762 Westwood Blvd, Ste 320\nLos Angeles, CA 90024\n\nThird floor. Private suite, designed for medical privacy and patient comfort. Near UCLA.',
      locationPrimaryCtaLabel: 'Book a consultation',
      locationPrimaryCtaHref: '/book',
      locationSecondaryCtaLabel: 'See pricing',
      locationSecondaryCtaHref: '/#pricing',
      locationPhoto: imgs.bamboo,
    },
  },

  // Treatment, IV Ketamine
  {
    id: 'treatment-iv-ketamine',
    type: 'treatment',
    create: {
      title: 'IV Ketamine Infusions',
      slug: { _type: 'slug', current: 'iv-ketamine' },
      metaDescription:
        'IV ketamine infusions in Westwood, Los Angeles. PA-supervised protocol with 60-minute sessions, weight-based dosing, and real-time adjustments. Free 15-minute screening call.',
      cardDescription:
        'Five to six 60-minute infusions over two to three weeks. PA evaluation before and after every session.',
      cardIcon: 'iv',
      cardGradient: 'mist',
      heroSub:
        'Five to six 60-minute infusions over two to three weeks, with a licensed PA in the room before and after every session.',
      stats: [
        { _key: 's1', value: '5 to 6', label: 'infusions over 2 to 3 weeks' },
        { _key: 's2', value: '60 min', label: 'standard session' },
        { _key: 's3', value: 'PA-led', label: 'before and after every visit' },
        { _key: 's4', value: '$700', label: 'per session, sessions 1 to 4' },
      ],
      protocolAsideTitle: 'The protocol',
      protocolBody: `Each session is 60 minutes of supervised IV ketamine, with a licensed PA evaluation before and after. Starting dose is 0.4 to 0.7 mg per kg per hour, weight-based, then refined session to session based on how you respond.

**What that means in practice.** Most ketamine clinics run a fixed dose against a fixed schedule. Here, dosing, duration, and supportive medications (magnesium, Zofran for nausea, Ketorolac for headache) are adjusted at each visit. NAD+ and IV spa modalities are available separately if you want to add them, never bundled in.

The standard initial series is five to six sessions over two to three weeks. Single sessions are allowed, but the full protocol is recommended because most patients need several sessions to reach a transition point.`,
      treatList: [
        { _key: 't1', label: 'Treatment-resistant depression', offlabel: true },
        { _key: 't2', label: 'PTSD and complex trauma', offlabel: true },
        { _key: 't3', label: 'Generalized anxiety', offlabel: true },
        { _key: 't4', label: 'Chronic pain, CRPS, neuropathy, fibromyalgia', offlabel: true },
        { _key: 't5', label: 'Refractory migraine', offlabel: true },
        { _key: 't6', label: 'Passive suicidal ideation', offlabel: true },
        { _key: 't7', label: 'OCD', offlabel: true },
        { _key: 't8', label: 'Alcohol or marijuana cravings', offlabel: true },
      ],
      referList: [
        'Schizophrenia, active psychosis, or bipolar mania',
        'Uncontrolled hypertension or active cardiac condition',
        'Pregnancy',
        'Concurrent use of benzodiazepines, lamotrigine, diphenhydramine, or aminophylline',
      ],
      qualifyLinkLabel: 'Book a screening call',
      qualifyLinkHref: '/book',
      pricingMain: 'Transparent per-session pricing',
      pricingNote: `**$700 per 60-minute infusion** for sessions one through four of the initial protocol.
**$550 per booster session** once you are established.
**$2,750 for a 6-infusion membership** after your first four sessions, non-transferable.
**$100 screening call** applied as credit toward your first infusion.

Longer infusions for pain or mood are available at $650 (90 min), $850 (2 hr), $1,150 (3 hr), and $1,650 (4 hr). NAD+ and IV spa wellness are priced separately.`,
      steps: [
        {
          _key: 'st1',
          num: '1',
          title: 'Arrive and check in',
          body: 'Show up 15 minutes early. Vitals taken. Brief clinical check-in with your PA on baseline mood, pain, sleep.',
        },
        {
          _key: 'st2',
          num: '2',
          title: 'Protocol set or adjusted',
          body: "Your PA reviews your response from prior sessions and sets today's dose and duration. Anti-nausea, magnesium, or other supportive medications added as needed.",
        },
        {
          _key: 'st3',
          num: '3',
          title: '60-minute infusion',
          body: 'You recline in a private suite while the ketamine infusion runs. Continuous heart-rate monitoring. PA on site throughout. Most patients report a sense of spaciousness or a transient dissociative experience.',
        },
        {
          _key: 'st4',
          num: '4',
          title: 'Integration and notes',
          body: '15 to 20 minutes with your PA after the infusion. We talk through what you noticed and any insights. Your PA documents your response for the next session. You need a driver to take you home.',
        },
      ],
    },
  },

  // Treatment, KAP
  {
    id: 'treatment-kap',
    type: 'treatment',
    create: {
      title: 'Ketamine-Assisted Therapy',
      slug: { _type: 'slug', current: 'kap' },
      metaDescription:
        'Optional psychotherapy alongside IV ketamine at Phos, with Karly Salcido LMFT. Neurobiologically-informed integration therapy designed for the post-infusion neuroplastic window.',
      cardDescription:
        'Optional psychotherapy alongside your infusion protocol. Bring your own therapist or work with Karly Salcido, our partner. Never bundled into infusion costs.',
      cardIcon: 'conversation',
      cardGradient: 'sand',
      heroSub:
        'Therapy is optional, never required. Bring your own, work with our partner Karly Salcido, or skip it entirely.',
      stats: [
        { _key: 's1', value: '$300', label: 'per 50-minute session' },
        { _key: 's2', value: '7 to 10', label: 'day neuroplastic window' },
        { _key: 's3', value: 'In person', label: 'or telehealth' },
        { _key: 's4', value: 'Mon to Wed', label: '4:30 to 9:30 PM, select Saturdays' },
      ],
      protocolAsideTitle: 'How we think about therapy',
      protocolBody: `Ketamine creates a 7 to 10 day neuroplastic window after infusion, a period when the brain is more receptive to new patterns. Therapy in that window can help translate the experience into lasting change. But it is not required, and we do not bundle it into infusion pricing.

You have three options.

1. **Bring your own therapist.** If you already work with someone, keep working with them. We share intake and treatment notes with appropriate consent.
2. **Work with Karly Salcido,** our partner therapist. Karly's approach is neurobiologically-informed integration therapy, structured around the post-infusion window. She specializes in trauma, including complex PTSD, dissociation, chronic stress, mood disorders, and dual diagnosis. Pre-infusion preparation sessions clarify symptom targets and ready your nervous system. Post-infusion integration sessions metabolise the experience and consolidate behavioural change.
3. **Skip therapy.** Some patients respond well to infusions alone, particularly for chronic pain. We do not push therapy on anyone who does not want it.

Karly is independent. She is licensed in California (LMFT), takes payment separately, and is not part of Phos billing.`,
      treatList: [
        { _key: 't1', label: 'Complex PTSD and trauma integration', offlabel: false },
        { _key: 't2', label: 'Dissociation and chronic stress', offlabel: false },
        { _key: 't3', label: 'Anxiety and panic disorders', offlabel: false },
        { _key: 't4', label: 'Mood disorders, including dual diagnosis', offlabel: false },
        {
          _key: 't5',
          label: 'Long-standing relational or developmental patterns',
          offlabel: false,
        },
      ],
      qualifyLinkLabel: 'Ask Katie about scheduling',
      qualifyLinkHref: '/book',
      pricingMain: 'Separately priced, not bundled',
      pricingNote: `**$300 per 50-minute psychotherapy session** with Karly Salcido.
**Same $300 rate for enhanced support sessions** (more frequent during the neuroplastic window, or in-room presence during infusion as a scheduled therapeutic hour).
Available Monday through Wednesday, 4:30 PM to 9:30 PM, and select Saturdays. Telehealth or in-person.

Bringing your own therapist? Free. We will coordinate notes with appropriate consent.`,
      steps: [
        {
          _key: 'st1',
          num: '1',
          title: 'Pre-infusion preparation',
          body: 'A 50-minute session before your first infusion. Clarify symptom targets, identify entrenched cognitive loops, map defensive parts likely to surface, build a post-infusion regulation plan.',
        },
        {
          _key: 'st2',
          num: '2',
          title: 'During the infusion',
          body: 'For patients with complex trauma or heightened anxiety, Karly offers an optional in-room presence as a scheduled therapeutic hour. Real-time grounding and affect regulation if needed.',
        },
        {
          _key: 'st3',
          num: '3',
          title: 'Post-infusion integration',
          body: 'Sessions in the 7 to 10 day window after each infusion. Reconstruct and metabolise the experience, identify shifts in self-perception, translate insight into concrete behaviour.',
        },
        {
          _key: 'st4',
          num: '4',
          title: 'Long-term integration',
          body: 'Continued sessions at the cadence that fits your nervous system. Some patients need weekly, others biweekly. Karly tailors frequency to clinical need, not a standard package.',
        },
      ],
    },
  },

  // Treatment, IV Spa
  {
    id: 'treatment-iv-spa',
    type: 'treatment',
    create: {
      title: 'IV Spa Vitamin Wellness',
      slug: { _type: 'slug', current: 'iv-spa' },
      metaDescription:
        'IV vitamin wellness in Westwood, Los Angeles. NAD+, Myers Cocktail, glutathione, and other modalities. Standalone or alongside ketamine protocols.',
      cardDescription:
        'NAD+, Myers Cocktail, glutathione, and other IV wellness modalities. Standalone or as adjunct support during ketamine protocols.',
      cardIcon: 'drop',
      cardGradient: 'amber',
      heroSub:
        'NAD+, Myers Cocktail, glutathione, and other IV wellness infusions administered by our clinical team.',
      stats: [
        { _key: 's1', value: '30 to 90', label: 'minute sessions' },
        { _key: 's2', value: 'Custom', label: 'protocols' },
        { _key: 's3', value: 'Standalone', label: 'or adjunct' },
        { _key: 's4', value: 'In-clinic', label: 'Westwood' },
      ],
      protocolAsideTitle: 'What we offer',
      protocolBody: `IV spa wellness is a separate service line from ketamine. We offer it because patients ask for it, and because it pairs well with the supportive infrastructure already in the clinic, IV access, monitoring, private suite.

Common modalities include.
- **NAD+** for energy, cellular metabolism, cognitive recovery
- **Myers' Cocktail** (B vitamins, magnesium, calcium, vitamin C) for general wellness, hangover, immune support
- **Glutathione** as an antioxidant push, sometimes paired with NAD+
- **Custom blends** for performance, recovery, or specific nutrient deficits

These are priced separately from ketamine infusions. If you are an existing ketamine patient and want to add NAD+ or glutathione to a session, your PA discusses cost and clinical fit during your pre-infusion check-in.`,
      treatList: [
        { _key: 't1', label: 'Energy and cognitive performance', offlabel: false },
        { _key: 't2', label: 'Athletic recovery', offlabel: false },
        { _key: 't3', label: 'Immune support', offlabel: false },
        { _key: 't4', label: 'Hangover and dehydration', offlabel: false },
        { _key: 't5', label: 'Add-on alongside ketamine protocols', offlabel: false },
      ],
      qualifyLinkLabel: 'Ask about availability',
      qualifyLinkHref: '/book',
      pricingMain: 'Priced per modality',
      pricingNote: `IV spa pricing depends on the specific modality and session length. Call (424) 278-4241 or text us to discuss what you are looking for. Existing patients can also ask their PA at any visit.`,
      steps: [
        {
          _key: 'st1',
          num: '1',
          title: 'Tell us what you are looking for',
          body: 'Send a note about energy, recovery, or specific concerns. We help you pick a modality that fits.',
        },
        {
          _key: 'st2',
          num: '2',
          title: 'Clinical check-in',
          body: 'Brief PA review before the infusion runs, basic vitals, any history that affects dosing.',
        },
        {
          _key: 'st3',
          num: '3',
          title: 'Infusion',
          body: '30 to 90 minutes depending on the modality, in the same private suite we use for ketamine.',
        },
        {
          _key: 'st4',
          num: '4',
          title: 'Carry on',
          body: 'No driver required for IV spa. You can drive yourself home and resume normal activity.',
        },
      ],
    },
  },

  // Treatment, At-Home Ketamine
  {
    id: 'treatment-at-home',
    type: 'treatment',
    create: {
      title: 'At-Home Ketamine Therapy',
      slug: { _type: 'slug', current: 'at-home' },
      metaDescription:
        'At-home ketamine therapy via telehealth for established Phos patients. Monthly video visits, prescription support, and PA oversight after your initial IV protocol.',
      cardDescription:
        'Telehealth ketamine therapy for established patients who have completed an in-clinic IV protocol. PA video visits and prescription support.',
      cardIcon: 'home',
      cardGradient: 'green',
      heroSub:
        'For established patients who have completed an in-clinic IV protocol. PA telehealth visits, prescription support, and continued oversight.',
      stats: [
        { _key: 's1', value: '$250', label: '1st video consult' },
        { _key: 's2', value: '$225', label: '2nd video consult' },
        { _key: 's3', value: '$200', label: '3rd video consult' },
        { _key: 's4', value: '6 mo', label: 'in-person re-evaluation' },
      ],
      protocolAsideTitle: 'Who this is for',
      protocolBody: `At-home ketamine therapy is a maintenance and continuation option for patients who have already completed an initial IV protocol with us and demonstrated response.

It is not a substitute for IV. Most patients still benefit from periodic in-clinic booster infusions even while on at-home medication. The PA telehealth visits are how we adjust dose, refill the prescription, and check in on how you are doing.

**Required for participation.**
- You have completed at least the initial IV ketamine series in our clinic
- You demonstrated clinical response and tolerated the treatment well
- You can attend video visits and follow the prescribed regimen safely
- You agree to a 6-month in-person re-evaluation at our Westwood clinic

DEA compliance for telehealth-prescribed controlled substances requires a documented prior in-person clinical relationship, which is why we limit at-home to established patients.`,
      treatList: [
        {
          _key: 't1',
          label: 'Established patients with documented response to IV protocol',
          offlabel: true,
        },
        { _key: 't2', label: 'Maintenance between in-clinic boosters', offlabel: true },
        {
          _key: 't3',
          label: 'Patients with logistical barriers to weekly in-clinic visits',
          offlabel: true,
        },
      ],
      referList: [
        'New patients with no prior in-clinic relationship',
        'Patients with active suicidality or unstable medical conditions',
        'Patients on contraindicated medications',
      ],
      qualifyLinkLabel: 'Ask about eligibility',
      qualifyLinkHref: '/book',
      pricingMain: 'Per video visit',
      pricingNote: `**$250** for your first video consultation. First-month prescription filled by pharmacy.
**$225** for your second video consultation. Second-month refill.
**$200** for your third video consultation. Includes a 3-month supply dispensed monthly.
**$250** every 6 months for the required in-person follow-up video visit.
**$200** for dosage-adjustment consults between scheduled follow-ups.

Prescription cost is separate, paid to the pharmacy.`,
      steps: [
        {
          _key: 'st1',
          num: '1',
          title: 'First video consult',
          body: 'Once you have completed the initial IV protocol and demonstrated response, we set up a video visit to evaluate your candidacy for at-home medication and write the first prescription.',
        },
        {
          _key: 'st2',
          num: '2',
          title: 'Monthly refills',
          body: 'A short video visit each month for the first three months to track your response and refill.',
        },
        {
          _key: 'st3',
          num: '3',
          title: '6-month in-person re-evaluation',
          body: 'You return to the Westwood clinic for a full PA evaluation. Required for continued at-home prescribing.',
        },
        {
          _key: 'st4',
          num: '4',
          title: 'Ongoing',
          body: 'After the 6-month visit, refills continue with regular check-ins. Adjustments to dose require a separate consult.',
        },
      ],
    },
  },

  // Treatments index page
  {
    id: 'treatmentsPage-singleton',
    type: 'treatmentsPage',
    create: {
      heroTitle: 'Treatments',
      heroSub:
        'IV ketamine is the core of what we do. Therapy, IV spa, and at-home maintenance are optional services priced separately.',
      heroImage: imgs.bamboo,
      introBody: `Our practice is built around in-clinic IV ketamine infusions. Every other service is optional, priced separately, and never bundled into your infusion costs.

That structure exists for two reasons. First, it is honest, you pay for what you use. Second, it forces us to make sure each service stands on its own, instead of padding revenue by tying things together.`,
      treatments: [
        { _key: 'tref-1', _type: 'reference', _ref: 'treatment-iv-ketamine' },
        { _key: 'tref-2', _type: 'reference', _ref: 'treatment-kap' },
        { _key: 'tref-3', _type: 'reference', _ref: 'treatment-iv-spa' },
        { _key: 'tref-4', _type: 'reference', _ref: 'treatment-at-home' },
      ],
      ctaText:
        'Not sure where to start? A free 15-minute screening call walks you through candidacy and options before you commit to anything.',
      ctaPrimaryLabel: 'Book a consultation',
      ctaPrimaryHref: '/book',
      ctaSecondaryLabel: 'See pricing',
      ctaSecondaryHref: '/#pricing',
      ctaAddress: '1762 Westwood Blvd, Ste 320, Los Angeles, CA 90024',
    },
  },
];

// Apply
for (const op of ops) {
  try {
    if (existingIds.has(op.id)) {
      const fields = Object.keys(op.patch || {});
      await client.patch(op.id).set(op.patch).commit();
      console.log(`  [patched] ${op.id} fields: ${fields.join(', ')}`);
    } else {
      const doc = { _id: op.id, _type: op.type, ...op.create };
      await client.createOrReplace(doc);
      console.log(`  [created] ${op.id} (${op.type})`);
    }
  } catch (e) {
    console.error(`  [FAILED] ${op.id}: ${e.message}`);
    if (e.responseBody) console.error('  resp:', e.responseBody);
    throw e;
  }
}

console.log('\ndone.');
