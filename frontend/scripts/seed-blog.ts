/**
 * Seeds the blogIndexPage singleton + three starter blogPost documents.
 * Mirrors the placeholder posts currently shown on the homepage BlogGrid
 * (Light through trees / Hands and presence / Night in the Wild) so the
 * /blog index renders with real, editable content immediately.
 *
 * Uses createIfNotExists so re-running never overwrites edits made in
 * the studio. To force-update the featured post reference, edit the
 * singleton directly in the studio.
 *
 * Usage: SANITY_API_TOKEN=<write-token> bun run scripts/seed-blog.ts
 */
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'yfse28ye',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

type Starter = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  imageAlt: string;
  author: string;
  publishDate: string;
  readMinutes: number;
};

const STARTERS: Starter[] = [
  {
    id: 'blogPost-light-through-trees',
    title: 'Light through trees',
    slug: 'light-through-trees',
    excerpt:
      'A quiet walk through morning light. The forest breathing with you, slow, soft, alive.',
    imageAlt: 'Sunlight through pine trees',
    author: 'Katie Besanko, PA-C',
    publishDate: '2026-04-22',
    readMinutes: 4,
    body: [
      'Most patients arrive carrying something dense. A grief, a long depression, a body that has been on alert for years. The work of the first session is rarely the infusion itself. The work is the half hour before, when we sit together and lower the temperature of the room.',
      "I think about morning light through trees for this. It doesn't arrive all at once. It comes through gaps. It softens what it touches without erasing it. That's most of what we are trying to do in the chair.",
      '## What we actually do',
      'Before any infusion, we go over how you are sleeping, what you ate, what felt different this week. If something has shifted, the dose shifts with it. If your blood pressure is high, we wait. If you are anxious, we slow down. The protocol is the floor, not the ceiling.',
      '## After the session',
      "When the infusion ends, you stay for 15 to 20 minutes. We talk if you want to talk. If you don't, we don't. Most people say less in this window than they expect, and that is fine. The integration happens later, in the days after, in your own life.",
    ].join('\n\n'),
  },
  {
    id: 'blogPost-hands-and-presence',
    title: 'Hands and presence',
    slug: 'hands-and-presence',
    excerpt: "Inside a session: soft touch, and the safety to feel what's ready to unfold.",
    imageAlt: 'A hand offered in a moment of care',
    author: 'Dr. Christa Riley',
    publishDate: '2026-04-08',
    readMinutes: 5,
    body: [
      "People ask me what makes a ketamine clinic safe. They mean the dosing, the monitors, the training. Those things matter, and we have all of them. But the safety patients actually feel during a session isn't built out of equipment. It is built out of presence.",
      '## The decision to stay in the room',
      "I sit with patients during their infusions. Not always at the bedside, but in the room. That is a clinical decision, not a hospitality one. The dissociative window is when most of the therapeutic shift happens, and it's also when people feel most vulnerable. Knowing someone is there changes what is possible in that window.",
      '## A small ritual',
      'Before we start the IV, I ask one question. What do you want to make room for? Not a goal. Not a problem to solve. A direction. The answers are usually quiet. Rest. Quiet. To stop being so tired. We hold that thread through the session.',
      'Ketamine does not give you the thing you ask for. But it tends to clear enough static that you can recognize it when it arrives on its own.',
    ].join('\n\n'),
  },
  {
    id: 'blogPost-night-in-the-wild',
    title: 'Night in the Wild',
    slug: 'night-in-the-wild',
    excerpt: 'How the forest shifts at night, and what it teaches us about stillness.',
    imageAlt: 'A forest at twilight',
    author: 'Katie Besanko, PA-C',
    publishDate: '2026-03-25',
    readMinutes: 3,
    body: [
      'Patients sometimes describe the deeper part of an infusion as being in the woods at night. Not lost, exactly. Just somewhere quieter than they remembered the world being.',
      '## Stillness is a clinical event',
      'The nervous system spends a lot of energy scanning. In treatment-resistant depression, that scan never really stops. One of the most measurable things we see after a successful infusion series is that the scanning slows down. Heart rate variability improves. Sleep deepens. Appetite shows up at predictable times.',
      'We do not promise this to every patient. We do tell people what to watch for, because the early signs of improvement are easy to miss if you are looking for big mood shifts. The first sign is usually that something small got easier. Cooking. A short walk. Returning a text.',
      '## The point of integration',
      "Integration is the practice of letting those small changes count. Not interpreting them away. Not waiting for the dramatic version. The forest is quieter at night because the daytime noise is gone. That's worth noticing.",
    ].join('\n\n'),
  },
];

async function run() {
  console.log('Seeding blog: 3 starter posts + index singleton (createIfNotExists)...');

  for (const post of STARTERS) {
    await client.createIfNotExists({
      _type: 'blogPost',
      _id: post.id,
      title: post.title,
      slug: { _type: 'slug', current: post.slug },
      body: post.excerpt,
      fullBody: post.body,
      imageAlt: post.imageAlt,
      author: post.author,
      publishDate: post.publishDate,
      readMinutes: post.readMinutes,
    });
    console.log(`  ${post.id} ready`);
  }

  await client.createIfNotExists({
    _type: 'blogIndexPage',
    _id: 'blogIndexPage-singleton',
    heroEyebrow: 'Field Notes',
    heroHeadline: 'Field Notes',
    heroSubheading:
      'Notes from the clinic on ketamine treatment, integration, and the science behind it.',
    heroImageAlt: 'Field Notes hero photo',
    featuredEyebrow: 'Featured',
    featuredCtaLabel: 'Read the note →',
    gridHeadingWithFeatured: 'More notes',
    gridHeadingNoFeatured: 'All notes',
    noteCountSingular: 'note',
    noteCountPlural: 'notes',
    cardCtaLabel: 'Read →',
    emptyHeadline: 'New notes coming soon.',
    emptyBody: 'Katie and Christa are working on the first batch. Check back in a couple weeks.',
    metaTitle: 'Field Notes — Phos',
    metaDescription:
      'Notes from the clinic on ketamine treatment, integration, and the science behind it.',
    featuredPost: {
      _type: 'reference',
      _ref: STARTERS[0]!.id,
    },
  });
  console.log('  blogIndexPage-singleton ready');

  // Apply defaults to any new fields added after the first seed.
  // setIfMissing leaves edited fields alone but fills in the new ones.
  await client
    .patch('blogIndexPage-singleton')
    .setIfMissing({
      heroImageAlt: 'Field Notes hero photo',
      featuredEyebrow: 'Featured',
      featuredCtaLabel: 'Read the note →',
      gridHeadingWithFeatured: 'More notes',
      gridHeadingNoFeatured: 'All notes',
      noteCountSingular: 'note',
      noteCountPlural: 'notes',
      cardCtaLabel: 'Read →',
      metaTitle: 'Field Notes — Phos',
      metaDescription:
        'Notes from the clinic on ketamine treatment, integration, and the science behind it.',
    })
    .commit();
  console.log('  blogIndexPage-singleton: new fields backfilled');

  await client.createIfNotExists({
    _type: 'blogPostPage',
    _id: 'blogPostPage-singleton',
    eyebrowLabel: 'Field Notes',
    readMinutesSuffix: 'min read',
    backLinkLabel: '← All field notes',
    backLinkHref: '/blog',
    placeholderBody:
      'This note is still being written. Come back soon, or browse the rest of our Field Notes.',
    placeholderLinkLabel: 'Field Notes',
    metaTitleSuffix: 'Field Notes — Phos',
    metaTitleSeparator: ' — ',
    fallbackMetaTitle: 'Field Notes — Phos',
  });
  console.log('  blogPostPage-singleton ready');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
