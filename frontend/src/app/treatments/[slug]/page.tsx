import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity/client';
import { urlFor } from '@/lib/sanity/image';
import { treatmentBySlugQuery, allTreatmentSlugsQuery } from '@/lib/sanity/queries';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import RevealOnScroll from '@/components/RevealOnScroll';
import { Markdown } from '@/components/Markdown';
import './slug.css';

export const revalidate = 300;

type SlugContent = {
  title: string;
  metaTitle: string;
  metaDesc: string;
  heroSub: string;
  stats: { value: string; label: string }[];
  protocolAsideTitle: string;
  protocolBody: string;
  treatList: { label: string; offlabel?: boolean }[];
  referList: string[];
  qualifyLinkLabel: string;
  qualifyLinkHref: string;
  pricingMain: string;
  pricingNote: string;
  steps: { num: string; title: string; body: string }[];
  related: { tag: string; title: string; body: string; href: string }[];
  draft?: boolean;
};

const DEFAULT_SLUGS: Record<string, SlugContent> = {
  'iv-ketamine-infusions': {
    title: 'IV Ketamine\nInfusions',
    metaTitle: 'IV Ketamine Infusions — Phos',
    metaDesc:
      '60-minute IV ketamine infusions in our Westwood clinic, anesthesiologist-supervised. A 5 to 6 session protocol with PA support before and after every infusion.',
    heroSub:
      'Our core medical service. 60-minute infusions in our Westwood clinic, anesthesiologist-supervised.',
    stats: [
      { value: '60 min', label: 'per session' },
      { value: '5 to 6', label: 'session protocol' },
      { value: '0.4 to 0.7', label: 'mg/kg/hr starting dose' },
      { value: 'PA-supported', label: 'before and after every session' },
    ],
    protocolAsideTitle: 'Sixty minutes.\nNot forty.',
    protocolBody: [
      'Phos runs IV ketamine on a 5 to 6 session protocol, based on the Yale dosing studies that established the modern evidence base for ketamine in treatment-resistant depression. Sessions are 60 minutes, not the 40-minute industry shortcut. Starting dose is weight-based, 0.4 to 0.7 mg/kg/hour, adjusted by our PA between sessions based on how each patient responds.',
      'Every infusion includes the full session, IV placement, supportive medications like Zofran for nausea or ketorolac for headache if needed, and a 15 to 20 minute integration window with our PA at the end. There are no hidden fees inside the protocol itself. NAD+ and other spa add-ons are billed separately under our IV Spa treatment.',
      'Single sessions are available, but we recommend completing the full protocol. Most patients need multiple sessions to reach a transition point, and the evidence base is built around the full course.',
    ].join('\n\n'),
    treatList: [
      { label: 'Treatment-resistant depression', offlabel: true },
      { label: 'PTSD and trauma', offlabel: true },
      { label: 'Chronic pain conditions', offlabel: true },
      { label: 'Anxiety disorders', offlabel: true },
    ],
    referList: [
      'Active psychosis or schizophrenia',
      'Active bipolar mania',
      'Uncontrolled blood pressure',
      'Certain cardiac histories',
      'Active benzodiazepine, lamotrigine, diphenhydramine, or alcohol use',
      'Aminophylline use',
    ],
    qualifyLinkLabel: 'Take the self-assessment',
    qualifyLinkHref: '/qualify',
    pricingMain: '$700 per infusion  ·  $400 at the membership rate',
    pricingNote:
      'Membership rate available after the first 4 sessions. Includes the full session, IV placement, supportive medications, and PA integration time. NAD+ and spa add-ons are billed separately. [See full pricing for membership and at-home options →](/pricing)',
    steps: [
      {
        num: '1',
        title: 'Self-assessment + booking',
        body: 'Confirm you qualify, then book online. A $100 consultation deposit applies to your first infusion.',
      },
      {
        num: '2',
        title: 'In the clinic',
        body: 'Arrival, IV placement with our RN, intention setting with our PA, 60-minute infusion in a private room.',
      },
      {
        num: '3',
        title: 'Integration + follow-up',
        body: '15 to 20 minutes with our PA before you leave. Most patients return for their next session within 1 to 2 weeks.',
      },
    ],
    related: [
      {
        tag: 'Add-on',
        title: 'Ketamine-Assisted Psychotherapy',
        body: 'Optional adjunctive talk therapy through our partner Carly Salcido.',
        href: '/treatments/kap',
      },
      {
        tag: 'Maintenance option',
        title: 'At-Home Ketamine Therapy',
        body: 'For qualifying patients between in-clinic sessions or as a maintenance option.',
        href: '/treatments/at-home-ketamine',
      },
    ],
  },
  'at-home-ketamine': {
    draft: true,
    title: 'At-Home Ketamine\nTherapy',
    metaTitle: 'At-Home Ketamine Therapy — Phos',
    metaDesc:
      'Telehealth-monitored sublingual ketamine for qualifying patients, with the same medical oversight as our in-clinic infusions.',
    heroSub:
      'Telehealth-monitored sublingual ketamine for qualifying patients, with the same medical oversight as our in-clinic infusions.',
    stats: [
      { value: 'Telehealth', label: 'video intake and follow-up' },
      { value: 'Sublingual', label: 'lozenge format' },
      { value: 'PA review', label: 'before every refill' },
      { value: 'Qualifying', label: 'patients only' },
    ],
    protocolAsideTitle: 'Same standard.\nDifferent setting.',
    protocolBody:
      'At-Home Ketamine Therapy is offered to qualifying patients as a complement to, or maintenance option after, the in-clinic infusion protocol. The medical oversight is the same as our IV service: Dr. Riley reviews every patient, and our PA stays involved between visits.\n\nSessions are conducted via video telehealth from a quiet, private space at home, with a support person present. We schedule preparation and integration calls around each session, and adjust dosing between visits based on response.\n\nNot every patient qualifies for the at-home format. Our self-assessment will tell you quickly whether you are a candidate before you pay for a consultation.',
    treatList: [
      { label: 'Treatment-resistant depression', offlabel: true },
      { label: 'PTSD and trauma', offlabel: true },
      { label: 'Anxiety disorders', offlabel: true },
      { label: 'Maintenance after in-clinic protocol' },
    ],
    referList: [
      'No private space or support person at home',
      'Active psychosis, schizophrenia, or bipolar mania',
      'Uncontrolled blood pressure or cardiac risk',
      'Active substance use that increases interaction risk',
      'First-time patients better served in-clinic',
    ],
    qualifyLinkLabel: 'Take the self-assessment',
    qualifyLinkHref: '/qualify',
    pricingMain: 'Pricing in review — to be confirmed before publish',
    pricingNote:
      'At-home pricing is being finalized with the clinical team. The full schedule will live on the main [pricing page](/pricing) once confirmed.',
    steps: [
      {
        num: '1',
        title: 'Self-assessment + intake',
        body: 'Confirm you qualify for at-home, then complete intake and have your video consult with our PA.',
      },
      {
        num: '2',
        title: 'At home',
        body: 'Take the prescribed lozenge in a private space with a support person, on a scheduled video session.',
      },
      {
        num: '3',
        title: 'Integration + refill review',
        body: 'Brief integration call after each session. Our PA reviews progress before approving any refill.',
      },
    ],
    related: [
      {
        tag: 'Core service',
        title: 'IV Ketamine Infusions',
        body: 'Our in-clinic protocol. Recommended as the starting point for most new patients.',
        href: '/treatments/iv-ketamine-infusions',
      },
      {
        tag: 'Add-on',
        title: 'Ketamine-Assisted Psychotherapy',
        body: 'Optional adjunctive talk therapy through our partner Carly Salcido.',
        href: '/treatments/kap',
      },
    ],
  },
  'iv-spa': {
    draft: true,
    title: 'IV Spa',
    metaTitle: 'IV Spa — Phos',
    metaDesc:
      'NAD+, Meyers cocktail, glutathione, and other wellness drips offered as standalone bookings outside our ketamine protocols.',
    heroSub:
      'NAD+, Meyers cocktail, glutathione, and other wellness drips, offered as standalone bookings outside our ketamine protocols.',
    stats: [
      { value: 'NAD+', label: 'cellular energy support' },
      { value: 'Meyers', label: 'hydration + vitamins' },
      { value: 'Glutathione', label: 'antioxidant push' },
      { value: 'Standalone', label: 'no ketamine required' },
    ],
    protocolAsideTitle: 'Wellness drips,\ncleanly separated.',
    protocolBody:
      "Our IV Spa menu is for patients who want wellness infusions without the ketamine protocol. NAD+, Meyers cocktail, glutathione, and other standard drips are offered as standalone bookings in the same clinic space.\n\nSpa drips can also be added on to a ketamine session for an additional fee. Pricing for add-ons is shown at booking and is never bundled silently into the infusion cost.\n\nAll IV Spa services are run by our RN under our PA's supervision. We screen for contraindications before every visit.",
    treatList: [
      { label: 'General wellness and recovery' },
      { label: 'Hydration after travel or illness' },
      { label: 'Athletic recovery support' },
      { label: 'Anti-aging maintenance' },
    ],
    referList: [
      'Looking for cosmetic procedures unrelated to IV therapy',
      'Active acute illness needing emergency care',
      'Allergies to listed drip ingredients',
    ],
    qualifyLinkLabel: 'Take the self-assessment',
    qualifyLinkHref: '/qualify',
    pricingMain: 'Pricing in review — to be confirmed before publish',
    pricingNote:
      'Per-drip pricing is being finalized. The full menu will live on the main [pricing page](/pricing) once confirmed.',
    steps: [
      {
        num: '1',
        title: 'Pick a drip',
        body: 'Browse the menu, pick the drip you want, and book directly online.',
      },
      {
        num: '2',
        title: 'Quick screen',
        body: 'Our RN screens for contraindications on arrival. Most visits are 30 to 60 minutes.',
      },
      {
        num: '3',
        title: 'Infusion',
        body: 'Sit back in a private room. You can read, work, or rest while the drip runs.',
      },
    ],
    related: [
      {
        tag: 'Core service',
        title: 'IV Ketamine Infusions',
        body: 'Our medical IV ketamine protocol, separate from the spa menu.',
        href: '/treatments/iv-ketamine-infusions',
      },
      {
        tag: 'Maintenance option',
        title: 'At-Home Ketamine Therapy',
        body: 'For qualifying patients between in-clinic sessions.',
        href: '/treatments/at-home-ketamine',
      },
    ],
  },
  kap: {
    draft: true,
    title: 'Ketamine-Assisted\nPsychotherapy',
    metaTitle: 'Ketamine-Assisted Psychotherapy — Phos',
    metaDesc:
      'Optional adjunctive psychotherapy with Carly Salcido, an independent therapist, structured around the neuroplastic window that follows each infusion.',
    heroSub:
      'Optional adjunctive psychotherapy with our partner therapist, structured around the neuroplastic window that follows each infusion.',
    stats: [
      { value: '$300', label: 'per 50-minute session' },
      { value: 'Mon to Wed', label: '4:30 to 9:30 PM' },
      { value: 'Telehealth', label: 'or in-person' },
      { value: 'Independent', label: 'booked outside infusion cost' },
    ],
    protocolAsideTitle: 'Neurobiologically\ninformed integration.',
    protocolBody:
      'Phos partners with Carly Salcido, an independent licensed therapist, for patients who want adjunctive psychotherapy alongside their ketamine protocol. Her approach is neurobiologically informed integration therapy, focused on the neuroplastic window that follows each infusion.\n\nKAP at Phos pairs structured preparation before each session with reflective integration afterward. The aim is to help insights from the medicine experience translate into lasting change, not just feel meaningful in the moment.\n\nSessions are booked directly with Carly. They are billed separately from infusion costs. Many patients see Carly for a few sessions around their initial protocol, then continue or step down based on need.',
    treatList: [
      { label: 'Patients new to ketamine who want support around the protocol' },
      { label: 'Complex trauma histories needing structured integration' },
      { label: 'Patients without a current therapist who want a guide' },
      { label: 'Maintenance patients between booster infusions' },
    ],
    referList: [
      'Patients with their own established therapist for integration',
      'Patients seeking psychiatry / medication management (not psychotherapy)',
      'Patients seeking primary therapy unrelated to ketamine treatment',
    ],
    qualifyLinkLabel: 'Take the self-assessment',
    qualifyLinkHref: '/qualify',
    pricingMain: '$300 per 50-minute psychotherapy session',
    pricingNote:
      'Booked and billed directly with Carly Salcido, separately from infusion costs. See the Phos [pricing page](/pricing) for medical service pricing.',
    steps: [
      {
        num: '1',
        title: 'Decide on KAP',
        body: 'Most patients add KAP after their first infusion. You can also start with KAP if you already have an infusion booked.',
      },
      {
        num: '2',
        title: 'Preparation session',
        body: 'A structured preparation session with Carly before your infusion sets intentions and a regulation plan.',
      },
      {
        num: '3',
        title: 'Integration',
        body: 'Integration sessions in the neuroplastic window after infusion help insights consolidate into lasting change.',
      },
    ],
    related: [
      {
        tag: 'Core service',
        title: 'IV Ketamine Infusions',
        body: 'KAP is structured around our in-clinic protocol. Most patients start here.',
        href: '/treatments/iv-ketamine-infusions',
      },
      {
        tag: 'Maintenance option',
        title: 'At-Home Ketamine Therapy',
        body: 'KAP also pairs with at-home sessions for qualifying patients.',
        href: '/treatments/at-home-ketamine',
      },
    ],
  },
};

type SanityService = {
  _id?: string;
  title?: string;
  slug?: string;
  draft?: boolean;
  metaDescription?: string;
  heroSub?: string;
  heroImage?: unknown;
  stats?: { value?: string; label?: string }[];
  protocolAsideTitle?: string;
  protocolBody?: string;
  treatList?: { label?: string; offlabel?: boolean }[];
  referList?: string[];
  qualifyLinkLabel?: string;
  qualifyLinkHref?: string;
  pricingMain?: string;
  pricingNote?: string;
  steps?: { num?: string; title?: string; body?: string }[];
  related?: {
    tag?: string;
    bodyOverride?: string;
    service?: { _id?: string; title?: string; slug?: string; cardDescription?: string };
  }[];
};

function imageUrl(image: unknown, width: number): string | null {
  if (!image) return null;
  try {
    return urlFor(image as never)
      .width(width)
      .auto('format')
      .url();
  } catch {
    return null;
  }
}

async function getResolved(slug: string): Promise<SlugContent | null> {
  const sanity = await client.fetch<SanityService | null>(
    treatmentBySlugQuery,
    { slug },
    { next: { tags: ['sanity'], revalidate: 300 } },
  );
  const fallback = DEFAULT_SLUGS[slug];
  if (!sanity && !fallback) return null;

  const related =
    sanity?.related?.map((r) => ({
      tag: r.tag ?? '',
      title: r.service?.title ?? '',
      body: r.bodyOverride ?? r.service?.cardDescription ?? '',
      href: r.service?.slug ? `/treatments/${r.service.slug}` : '#',
    })) ??
    fallback?.related ??
    [];

  return {
    title: sanity?.title ?? fallback?.title ?? '',
    metaTitle: fallback?.metaTitle ?? `${sanity?.title ?? 'Service'} — Phos`,
    metaDesc: sanity?.metaDescription ?? fallback?.metaDesc ?? '',
    heroSub: sanity?.heroSub ?? fallback?.heroSub ?? '',
    stats:
      sanity?.stats?.map((s) => ({ value: s.value ?? '', label: s.label ?? '' })) ??
      fallback?.stats ??
      [],
    protocolAsideTitle: sanity?.protocolAsideTitle ?? fallback?.protocolAsideTitle ?? '',
    protocolBody: sanity?.protocolBody ?? fallback?.protocolBody ?? '',
    treatList:
      sanity?.treatList?.map((t) => ({ label: t.label ?? '', offlabel: t.offlabel })) ??
      fallback?.treatList ??
      [],
    referList: sanity?.referList ?? fallback?.referList ?? [],
    qualifyLinkLabel:
      sanity?.qualifyLinkLabel ?? fallback?.qualifyLinkLabel ?? 'Take the self-assessment',
    qualifyLinkHref: sanity?.qualifyLinkHref ?? fallback?.qualifyLinkHref ?? '/qualify',
    pricingMain: sanity?.pricingMain ?? fallback?.pricingMain ?? '',
    pricingNote: sanity?.pricingNote ?? fallback?.pricingNote ?? '',
    steps:
      sanity?.steps?.map((s) => ({
        num: s.num ?? '',
        title: s.title ?? '',
        body: s.body ?? '',
      })) ??
      fallback?.steps ??
      [],
    related,
    draft: sanity?.draft ?? fallback?.draft,
  };
}

export async function generateStaticParams() {
  const sanitySlugs = (await client.fetch<string[]>(allTreatmentSlugsQuery)) ?? [];
  const all = new Set([...sanitySlugs, ...Object.keys(DEFAULT_SLUGS)]);
  return Array.from(all).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getResolved(slug);
  if (!data) return { title: 'Service — Phos' };
  return { title: data.metaTitle, description: data.metaDesc };
}

const NAV_ITEMS = [
  { label: 'Practice', href: '/' },
  { label: 'Treatments', href: '/treatments' },
  { label: 'About', href: '/about' },
  { label: 'Field Notes', href: '/blog' },
];

const ArrowRight = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Render a string with `\n` line-breaks as JSX with <br /> tags. */
function withBreaks(text: string) {
  const parts = text.split('\n');
  return parts.flatMap((part, i) => (i === 0 ? [part] : [<br key={i} />, part]));
}

export default async function TreatmentSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getResolved(slug);
  if (!data) notFound();

  return (
    <div className="slug-page">
      <Nav data={{ items: NAV_ITEMS }} />
      <RevealOnScroll selectors={['.reveal']} threshold={0.1} />

      <main>
        {data.draft && (
          <div className="slug-draft-banner" role="note">
            <strong>Draft</strong> — placeholder copy. Clinical content for this service is pending
            review by Katie and Christa before publish.
          </div>
        )}

        {/* HERO */}
        <section className="slug-hero" data-screen-label="01 Hero">
          <div className="slug-hero-copy">
            <h1 className="slug-hero-headline">{withBreaks(data.title)}</h1>
            <p className="slug-hero-sub">{data.heroSub}</p>
          </div>
          <div className="slug-hero-image-belt">
            <figure className="slug-hero-image" aria-label="Service hero photo placeholder">
              <div className="slug-hero-image-ph">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M12 3v5M10 5h4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9 8h6l-1 11a1 1 0 01-1 1h-2a1 1 0 01-1-1L9 8z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 12h10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span>Service photo</span>
              </div>
            </figure>
          </div>
        </section>

        {/* STAT STRIP */}
        <section
          className="slug-stat-section"
          data-screen-label="02 At a Glance"
          aria-label="At a glance"
        >
          <div className="slug-stat-strip">
            {data.stats.map((s, i) => (
              <div key={s.label} className={`slug-stat-tile reveal${i ? ` reveal-d${i}` : ''}`}>
                <div className="slug-stat-value">{s.value}</div>
                <div className="slug-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* PROTOCOL */}
        <section className="slug-protocol-section" data-screen-label="03 The Protocol">
          <div className="slug-protocol-layout">
            <aside className="slug-protocol-aside reveal">
              <h2 className="slug-protocol-aside-title">{withBreaks(data.protocolAsideTitle)}</h2>
            </aside>
            <div className="slug-protocol-body reveal reveal-d1">
              <Markdown content={data.protocolBody} />
            </div>
          </div>
        </section>

        {/* ELIGIBILITY */}
        <section className="slug-eligibility" data-screen-label="04 Eligibility">
          <div className="section-inner">
            <div className="section-head reveal">
              <h2 className="section-title">Is this right for you?</h2>
            </div>

            <div className="slug-elig-cards">
              <div className="slug-elig-card reveal">
                <h3 className="slug-elig-card-title">Patients we typically treat</h3>
                <ul className="slug-elig-list">
                  {data.treatList.map((it) => (
                    <li key={it.label}>
                      {it.label}
                      {it.offlabel && <span className="slug-elig-offlabel">off-label</span>}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="slug-elig-card reveal reveal-d1">
                <h3 className="slug-elig-card-title">Patients we&apos;d refer elsewhere</h3>
                <ul className="slug-elig-list">
                  {data.referList.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="slug-elig-footer reveal">
              If you&apos;re unsure, our pre-booking self-assessment will tell you quickly whether
              you qualify before you pay for a consultation.&ensp;
              <a href={data.qualifyLinkHref}>{data.qualifyLinkLabel} →</a>
            </p>
          </div>
        </section>

        {/* PRICING */}
        <section className="slug-pricing-section" data-screen-label="05 Pricing">
          <div className="section-inner">
            <div className="section-head reveal" style={{ marginBottom: 36 }}></div>
            <div className="slug-pricing-block reveal">
              <p className="slug-pricing-main">{data.pricingMain}</p>
              <Markdown content={data.pricingNote} className="slug-pricing-note" />
            </div>
          </div>
        </section>

        {/* STEPS */}
        <section className="slug-steps-section" data-screen-label="06 What to Expect">
          <div className="section-inner">
            <div className="section-head reveal">
              <h2 className="section-title">From self-assessment to integration</h2>
            </div>
            <div className="slug-steps-grid">
              {data.steps.map((step, i) => (
                <article
                  key={step.num}
                  className={`slug-step-card reveal${i ? ` reveal-d${i}` : ''}`}
                >
                  <span className="slug-step-num">{step.num}</span>
                  <h3 className="slug-step-title">{step.title}</h3>
                  <p className="slug-step-body">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* RELATED */}
        {data.related.length > 0 && (
          <section className="slug-related-section" data-screen-label="07 Related Care">
            <div className="section-inner">
              <div className="section-head reveal" style={{ marginBottom: 40 }}>
                <h2 className="section-title">Other services</h2>
              </div>
              <div className="slug-related-grid">
                {data.related.map((r, i) => (
                  <div
                    key={r.href}
                    className={`slug-related-card reveal${i ? ` reveal-d${i}` : ''}`}
                  >
                    <span className="slug-related-tag">{r.tag}</span>
                    <h3 className="slug-related-title">{r.title}</h3>
                    <p className="slug-related-body">{r.body}</p>
                    <a className="slug-related-link" href={r.href}>
                      View service <ArrowRight />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA ZONE */}
        <section className="slug-cta-zone" data-screen-label="08 CTA">
          <h2 className="slug-cta-title reveal">Ready to begin?</h2>
          <p className="slug-cta-sub reveal">
            Our PA reviews every intake personally. Most patients hear back within one business day.
          </p>
          <div className="slug-cta-buttons reveal">
            <a className="slug-cta-btn-primary" href="/book">
              Book a consultation
            </a>
            <a className="slug-cta-btn-secondary" href={data.qualifyLinkHref}>
              {data.qualifyLinkLabel} first
            </a>
          </div>
          <p className="slug-cta-address reveal">
            1762 Westwood Blvd, Ste 320 · Los Angeles, CA 90024
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
