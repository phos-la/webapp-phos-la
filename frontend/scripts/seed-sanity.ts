import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'yfse28ye',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function seed() {
  console.log('Seeding Sanity (Phos Wellness)...');

  const mutations: { createOrReplace: Record<string, unknown> }[] = [];

  // ── 1. Hero Section (singleton) ────────────────────────────────────────────
  mutations.push({
    createOrReplace: {
      _type: 'heroSection',
      _id: 'heroSection-singleton',
      pill: 'Accepting new patients in Westwood',
      headline: 'Your protocol evolves with you.',
      subheading:
        'IV ketamine therapy in a private Los Angeles practice — a licensed provider evaluates your response before and after every infusion, adjusting your treatment in real time.',
      ctaLabel: 'Schedule a consultation',
      overlayHeadline: 'The only LA clinic in the room after every infusion.',
      overlayBody:
        "Most clinics hand you off to a nurse and check in periodically. At Phos, your PA is there before and after every session, adjusting your dosing, duration, and supportive therapies based on how you're actually responding. Led by Dr. Christa Riley, board-certified anesthesiologist and military veteran.",
    },
  });

  // ── 2. Services Section (singleton) ────────────────────────────────────────
  mutations.push({
    createOrReplace: {
      _type: 'servicesSection',
      _id: 'servicesSection-singleton',
      label: 'What We Offer',
      heading: 'Three ways to heal',
      subheading:
        'IV ketamine infusions, ketamine-assisted psychotherapy, and IV wellness — each tailored to where you are right now.',
      cards: [
        {
          _key: 'card-1',
          title: 'IV Ketamine Infusions',
          body: 'A standard series of six subanesthetic infusions over two to three weeks, overseen by Dr. Christa Riley, board-certified anesthesiologist. Your PA meets with you before and after every session, adjusting dosing, duration, and supportive therapies based on your response.',
        },
        {
          _key: 'card-2',
          title: 'Ketamine-Assisted Therapy',
          body: "Bring your existing therapist to the session, or we'll connect you with one from our referral network. No in-house upsell, no added cost for the therapy component. Your mental health work and your infusion stay integrated from day one.",
        },
        {
          _key: 'card-3',
          title: 'IV Wellness & NAD+',
          body: "NAD+, Myers' Cocktail, glutathione, and other IV wellness infusions administered by our clinical team. Available as a standalone service or alongside your ketamine protocol to support energy, recovery, and overall cellular health.",
        },
      ],
    },
  });

  // ── 3. Conditions Section (singleton) ──────────────────────────────────────
  mutations.push({
    createOrReplace: {
      _type: 'conditionsSection',
      _id: 'conditionsSection-singleton',
      heading: 'Conditions we treat',
      conditions: [
        'Treatment-resistant depression',
        'PTSD and complex trauma',
        'Generalized anxiety',
        'Chronic pain and CRPS',
        'Refractory migraine',
        'Acute suicidal ideation',
        'Social anxiety',
      ],
      disclaimer:
        'IV ketamine for depression, anxiety, PTSD, and chronic pain is an off-label use in the United States. Only Spravato (esketamine nasal spray) is FDA-approved for treatment-resistant depression.',
    },
  });

  // ── 4. Provider Section (singleton) ────────────────────────────────────────
  mutations.push({
    createOrReplace: {
      _type: 'providerSection',
      _id: 'providerSection-singleton',
      label: 'Medical Director',
      heading: 'Meet Dr. Riley',
      body: 'Dr. Christa Riley is a board-certified anesthesiologist and military veteran who served in Afghanistan. Her experience performing nerve blocks and anesthesia on wounded service members shaped a firsthand understanding of trauma, resilience, and the lasting effects of high-stress on the body and mind. She brings that perspective to every patient at Phos.',
      quote:
        "Healing isn't one-size-fits-all. Your protocol should reflect how you're actually responding, not what worked for someone else.",
    },
  });

  // ── 5. Process Section (singleton) ─────────────────────────────────────────
  mutations.push({
    createOrReplace: {
      _type: 'processSection',
      _id: 'processSection-singleton',
      label: 'What to expect',
      heading: 'From first call to integration',
      steps: [
        {
          _key: 'step-1',
          num: '1',
          title: 'Screening call',
          body: "A short consultation to understand your history, walk through candidacy, and answer your questions. If you're a fit, we'll get you scheduled. If not, we'll tell you honestly and point you in the right direction.",
        },
        {
          _key: 'step-2',
          num: '2',
          title: 'PA evaluation',
          body: 'Before your first infusion, your PA reviews your medical history, current medications, and goals. This is where your protocol is set, including dosing, session duration, and any supportive therapies like NAD+ or magnesium.',
        },
        {
          _key: 'step-3',
          num: '3',
          title: 'Your infusions',
          body: "Six sessions over two to three weeks, administered in our Westwood clinic under medical supervision. Your PA checks in before and after every infusion, adjusting your protocol based on how you're responding, not a fixed template.",
        },
        {
          _key: 'step-4',
          num: '4',
          title: 'Integration support',
          body: "After your series, your PA discusses your outcomes and next steps. Whether that's maintenance sessions, connecting with a therapist, or both, you leave with a clear plan rather than a handoff.",
        },
      ],
    },
  });

  // ── 6. Clinic Section / The Space (singleton) ──────────────────────────────
  mutations.push({
    createOrReplace: {
      _type: 'clinicSection',
      _id: 'clinicSection-singleton',
      headline: 'Private, calm, Westwood',
      body: 'Our clinic is on the third floor of 1762 Westwood Blvd, a quiet suite designed for medical privacy and patient comfort. No waiting room full of strangers. No sterile hospital feel. Just a calm, unhurried space where you can arrive, settle in, and focus entirely on your session.',
      address: '1762 Westwood Blvd, Ste 320',
      mapsUrl: 'https://maps.google.com/?q=1762+Westwood+Blvd+Suite+320+Los+Angeles+CA+90024',
      chips: ['Private suite', 'Medical-grade monitoring', 'Near UCLA'],
    },
  });

  // ── 7. Pricing callout (singleton) ─────────────────────────────────────────
  mutations.push({
    createOrReplace: {
      _type: 'pricingCallout',
      _id: 'pricingCallout-singleton',
      label: 'Pricing',
      heading: 'Transparent pricing',
      subheading:
        'Every session includes PA consultation before and after, plus any supportive therapies adjusted to your protocol. No surprise line items.',
      calloutText:
        'Not sure where to start? A free 15-minute call with our team will walk you through candidacy, options, and what to expect before you commit to anything.',
      calloutPhone: '(424) 278-4241',
    },
  });

  // ── 7b. Pricing tiers ──────────────────────────────────────────────────────
  const pricingTiers = [
    {
      _type: 'pricingTier',
      _id: 'pricingTier-single',
      name: 'Single Infusion',
      description: 'One standalone IV ketamine session with full clinical support',
      price: '$650',
      featured: false,
      features: [
        'Pre-infusion PA consultation',
        'IV ketamine administration',
        'Supportive therapies as needed',
        'Post-infusion PA check-in',
      ],
      ctaLabel: 'Book a consultation',
      order: 1,
    },
    {
      _type: 'pricingTier',
      _id: 'pricingTier-membership',
      name: 'Membership Rate',
      description:
        'Lowest published IV ketamine rate in Los Angeles, based on our patient outcomes.',
      price: '$400',
      unit: '/session',
      featured: true,
      features: [
        'Everything in single infusion',
        'Protocol adjustments every visit',
        'NAD+, magnesium, Zofran as needed',
        'Integration follow-up',
      ],
      ctaLabel: 'Ask about membership',
      order: 2,
    },
    {
      _type: 'pricingTier',
      _id: 'pricingTier-athome',
      name: 'At-Home Program',
      description:
        'Telehealth-based ketamine therapy for eligible existing patients, managed by your PA.',
      price: 'Starting at $65',
      unit: '/mo',
      featured: false,
      features: [
        'Initial video evaluation',
        'Prescription up to 3 months',
        '3-refill self-evaluation check-in',
        '6-month re-evaluation visit',
      ],
      ctaLabel: 'Ask about eligibility',
      order: 3,
    },
  ];

  pricingTiers.forEach((t) => mutations.push({ createOrReplace: t }));

  // ── 8. Testimonials section header (singleton) ─────────────────────────────
  mutations.push({
    createOrReplace: {
      _type: 'testimonialsSection',
      _id: 'testimonialsSection-singleton',
      label: 'Testimonials',
      heading: 'What Clients Are Saying',
      subheading: 'Real words from people who experienced deep rest, clarity, and reconnection.',
    },
  });

  // ── 8b. Testimonials ───────────────────────────────────────────────────────
  const testimonials = [
    {
      _type: 'testimonial',
      _id: 'testimonial-1',
      quote:
        'It felt like time slowed down. I left feeling lighter, clearer, and more in touch with what matters.',
      name: 'Mona S.',
      order: 1,
    },
    {
      _type: 'testimonial',
      _id: 'testimonial-2',
      quote:
        'Every part of the retreat felt intentional — from the silence to the tea. It gave me space to breathe and reset.',
      name: 'Sophia Lee',
      order: 2,
    },
    {
      _type: 'testimonial',
      _id: 'testimonial-3',
      quote:
        "It wasn't just a retreat. It was a return — to nature, to stillness, to myself. I'm carrying that feeling with me.",
      name: 'Olivia S.',
      order: 3,
    },
    {
      _type: 'testimonial',
      _id: 'testimonial-4',
      quote:
        "I didn't expect something so powerful. The forest session helped me pause and truly reconnect.",
      name: 'David R.',
      order: 4,
    },
  ];

  testimonials.forEach((t) => mutations.push({ createOrReplace: t }));

  // ── 9. FAQ section header (singleton) ──────────────────────────────────────
  mutations.push({
    createOrReplace: {
      _type: 'faqSection',
      _id: 'faqSection-singleton',
      label: 'FAQ',
      heading: 'Questions you might have',
    },
  });

  // ── 9b. FAQ items ──────────────────────────────────────────────────────────
  const faqs = [
    {
      _type: 'faq',
      _id: 'faq-1',
      question: 'What is IV ketamine therapy?',
      answer:
        "IV ketamine blocks NMDA glutamate receptors, triggering rapid increases in BDNF (brain-derived neurotrophic factor) and new synaptic connections in the prefrontal cortex. Unlike SSRIs, which modulate serotonin over weeks, ketamine's antidepressant effect often appears within hours to days. A standard initial series is six infusions over two to three weeks.",
      order: 1,
    },
    {
      _type: 'faq',
      _id: 'faq-2',
      question: 'Who is a candidate?',
      answer:
        "Adults with treatment-resistant depression, anxiety, PTSD, or chronic pain who haven't found adequate relief from conventional treatments. We use a pre-screening process. People are generally not candidates if they have schizophrenia, active psychosis, bipolar mania, uncontrolled cardiovascular disease or hypertension, or pregnancy. Your candidacy will be confirmed at your initial consultation.",
      order: 2,
    },
    {
      _type: 'faq',
      _id: 'faq-3',
      question: 'How many sessions will I need?',
      answer:
        "Most patients start with six infusions over two to three weeks. After that, your PA reviews your response and discusses maintenance timing based on how you're doing, not a preset schedule.",
      order: 3,
    },
    {
      _type: 'faq',
      _id: 'faq-4',
      question: 'What happens during an infusion?',
      answer:
        "Your PA meets with you first to confirm your protocol for the session. The infusion itself typically runs 40 to 60 minutes. You'll experience a transient dissociative state. Afterward, your PA checks in to discuss your experience and note any adjustments for your next visit. You'll need a driver to take you home.",
      order: 4,
    },
    {
      _type: 'faq',
      _id: 'faq-5',
      question: 'Does insurance cover IV ketamine?',
      answer:
        "IV ketamine for mood disorders is an off-label use and is not covered by most insurance plans. It's cash-pay. HSA and FSA funds are eligible. Spravato (esketamine nasal spray), the FDA-approved version for treatment-resistant depression, will be available at our clinic soon and is covered by many insurance plans.",
      order: 5,
    },
    {
      _type: 'faq',
      _id: 'faq-6',
      question: 'What makes Phos different from other LA clinics?',
      answer:
        "At most clinics, you'll see a nurse during your infusions and a physician only periodically. Here, a licensed PA meets with you before and after every single infusion, actively adjusting your dosing, duration, and supportive therapies each visit. Led by Dr. Christa Riley, board-certified anesthesiologist and military veteran, with the highest published success rate in the LA market.",
      order: 6,
    },
  ];

  faqs.forEach((f) => mutations.push({ createOrReplace: f }));

  // ── 10. Blog section header (singleton) ────────────────────────────────────
  mutations.push({
    createOrReplace: {
      _type: 'blogSection',
      _id: 'blogSection-singleton',
      label: 'Our Blog',
      heading: 'From the Clinic',
    },
  });

  // ── 10b. Blog posts (placeholder — replace images via Studio) ──────────────
  const blogPosts = [
    {
      _type: 'blogPost',
      _id: 'blogPost-1',
      imageAlt: 'Sunlight through pine trees',
      title: 'Light through trees',
      body: 'A quiet walk through morning light. The forest breathing with you - slow, soft, alive.',
      slug: { _type: 'slug', current: 'blog-1' },
      order: 1,
    },
    {
      _type: 'blogPost',
      _id: 'blogPost-2',
      imageAlt: 'Hands giving a healing touch',
      title: 'Hands and presence',
      body: "Inside a session: soft touch, and the safety to feel what's ready to unfold.",
      slug: { _type: 'slug', current: 'blog-2' },
      order: 2,
    },
    {
      _type: 'blogPost',
      _id: 'blogPost-3',
      imageAlt: 'Forest at twilight',
      title: 'Night in the Wild',
      body: 'How the forest shifts at night and what it teaches us about stillness.',
      slug: { _type: 'slug', current: 'blog-3' },
      order: 3,
    },
  ];

  blogPosts.forEach((p) => mutations.push({ createOrReplace: p }));

  // ── 11. Glimpses Section (singleton) ───────────────────────────────────────
  mutations.push({
    createOrReplace: {
      _type: 'glimpsesSection',
      _id: 'glimpsesSection-singleton',
      label: 'Instagram',
      heading: 'Glimpses of the Journey',
      subheading: 'Follow for a look at the clinic and team.',
      instagramHandle: '@ketaminehealingla',
      instagramUrl: 'https://www.instagram.com/ketaminehealingla',
    },
  });

  // ── 12. Footer (singleton) ─────────────────────────────────────────────────
  mutations.push({
    createOrReplace: {
      _type: 'footerSection',
      _id: 'footerSection-singleton',
      businessName: 'Phos Wellness',
      address: '1762 Westwood Blvd, Ste 320, Los Angeles, CA 90024',
      phone: '(424) 278-4241',
      email: 'support@ketaminehealing.com',
      instagramUrl: 'https://www.instagram.com/ketaminehealingla',
      facebookUrl: 'https://www.facebook.com/ketaminehealingla',
      disclaimer:
        'IV ketamine for mood disorders is an off-label use. Spravato (esketamine) is FDA-approved for TRD.',
    },
  });

  // ── Execute ─────────────────────────────────────────────────────────────────
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await client.mutate(mutations as any);
  console.log(`Created/updated ${(result as any).results?.length ?? mutations.length} documents.`);
  console.log('Done. Open /studio to verify and publish drafts.');
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
