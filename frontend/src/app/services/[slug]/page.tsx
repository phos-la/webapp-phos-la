import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import RevealOnScroll from '@/components/RevealOnScroll';
import './slug.css';

type SlugContent = {
  title: React.ReactNode;
  metaTitle: string;
  metaDesc: string;
  heroSub: string;
  stats: { value: string; label: string }[];
  protocolAsideTitle: React.ReactNode;
  protocolParas: string[];
  treatList: { label: string; offlabel?: boolean }[];
  referList: string[];
  pricingMain: string;
  pricingNote: React.ReactNode;
  steps: { num: string; title: string; body: string }[];
  related: { tag: string; title: string; body: string; href: string }[];
  /** Draft content shows a visible "review before publish" banner. */
  draft?: boolean;
};

const SLUGS: Record<string, SlugContent> = {
  'iv-ketamine-infusions': {
    title: (
      <>
        IV Ketamine
        <br />
        Infusions
      </>
    ),
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
    protocolAsideTitle: (
      <>
        Sixty minutes.
        <br />
        Not forty.
      </>
    ),
    protocolParas: [
      'Phos runs IV ketamine on a 5 to 6 session protocol, based on the Yale dosing studies that established the modern evidence base for ketamine in treatment-resistant depression. Sessions are 60 minutes, not the 40-minute industry shortcut. Starting dose is weight-based, 0.4 to 0.7 mg/kg/hour, adjusted by our PA between sessions based on how each patient responds.',
      'Every infusion includes the full session, IV placement, supportive medications like Zofran for nausea or ketorolac for headache if needed, and a 15 to 20 minute integration window with our PA at the end. There are no hidden fees inside the protocol itself. NAD+ and other spa add-ons are billed separately under our IV Spa service.',
      'Single sessions are available, but we recommend completing the full protocol. Most patients need multiple sessions to reach a transition point, and the evidence base is built around the full course.',
    ],
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
    pricingMain: '$700 per infusion  ·  $400 at the membership rate',
    pricingNote: (
      <>
        Membership rate available after the first 4 sessions. Includes the full session, IV
        placement, supportive medications, and PA integration time. NAD+ and spa add-ons are billed
        separately. <a href="/pricing">See full pricing for membership and at-home options →</a>
      </>
    ),
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
        href: '/services/kap',
      },
      {
        tag: 'Maintenance option',
        title: 'At-Home Ketamine Therapy',
        body: 'For qualifying patients between in-clinic sessions or as a maintenance option.',
        href: '/services/at-home-ketamine',
      },
    ],
  },

  'at-home-ketamine': {
    draft: true,
    title: (
      <>
        At-Home Ketamine
        <br />
        Therapy
      </>
    ),
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
    protocolAsideTitle: (
      <>
        Same standard.
        <br />
        Different setting.
      </>
    ),
    protocolParas: [
      'At-Home Ketamine Therapy is offered to qualifying patients as a complement to, or maintenance option after, the in-clinic infusion protocol. The medical oversight is the same as our IV service: Dr. Riley reviews every patient, and our PA stays involved between visits.',
      'Sessions are conducted via video telehealth from a quiet, private space at home, with a support person present. We schedule preparation and integration calls around each session, and adjust dosing between visits based on response.',
      'Not every patient qualifies for the at-home format. Our self-assessment will tell you quickly whether you are a candidate before you pay for a consultation.',
    ],
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
    pricingMain: 'Pricing in review — to be confirmed before publish',
    pricingNote: (
      <>
        At-home pricing is being finalized with the clinical team. The full schedule will live on
        the main <a href="/pricing">pricing page</a> once confirmed.
      </>
    ),
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
        href: '/services/iv-ketamine-infusions',
      },
      {
        tag: 'Add-on',
        title: 'Ketamine-Assisted Psychotherapy',
        body: 'Optional adjunctive talk therapy through our partner Carly Salcido.',
        href: '/services/kap',
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
    protocolAsideTitle: (
      <>
        Wellness drips,
        <br />
        cleanly separated.
      </>
    ),
    protocolParas: [
      'Our IV Spa menu is for patients who want wellness infusions without the ketamine protocol. NAD+, Meyers cocktail, glutathione, and other standard drips are offered as standalone bookings in the same clinic space.',
      'Spa drips can also be added on to a ketamine session for an additional fee. Pricing for add-ons is shown at booking and is never bundled silently into the infusion cost.',
      "All IV Spa services are run by our RN under our PA's supervision. We screen for contraindications before every visit.",
    ],
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
    pricingMain: 'Pricing in review — to be confirmed before publish',
    pricingNote: (
      <>
        Per-drip pricing is being finalized. The full menu will live on the main{' '}
        <a href="/pricing">pricing page</a> once confirmed.
      </>
    ),
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
        href: '/services/iv-ketamine-infusions',
      },
      {
        tag: 'Maintenance option',
        title: 'At-Home Ketamine Therapy',
        body: 'For qualifying patients between in-clinic sessions.',
        href: '/services/at-home-ketamine',
      },
    ],
  },

  kap: {
    draft: true,
    title: (
      <>
        Ketamine-Assisted
        <br />
        Psychotherapy
      </>
    ),
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
    protocolAsideTitle: (
      <>
        Neurobiologically
        <br />
        informed integration.
      </>
    ),
    protocolParas: [
      'Phos partners with Carly Salcido, an independent licensed therapist, for patients who want adjunctive psychotherapy alongside their ketamine protocol. Her approach is neurobiologically informed integration therapy, focused on the neuroplastic window that follows each infusion.',
      'KAP at Phos pairs structured preparation before each session with reflective integration afterward. The aim is to help insights from the medicine experience translate into lasting change, not just feel meaningful in the moment.',
      'Sessions are booked directly with Carly. They are billed separately from infusion costs. Many patients see Carly for a few sessions around their initial protocol, then continue or step down based on need.',
    ],
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
    pricingMain: '$300 per 50-minute psychotherapy session',
    pricingNote: (
      <>
        Booked and billed directly with Carly Salcido, separately from infusion costs. See the Phos{' '}
        <a href="/pricing">pricing page</a> for medical service pricing.
      </>
    ),
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
        href: '/services/iv-ketamine-infusions',
      },
      {
        tag: 'Maintenance option',
        title: 'At-Home Ketamine Therapy',
        body: 'KAP also pairs with at-home sessions for qualifying patients.',
        href: '/services/at-home-ketamine',
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(SLUGS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = SLUGS[slug];
  if (!data) return { title: 'Service — Phos' };
  return { title: data.metaTitle, description: data.metaDesc };
}

const NAV_ITEMS = [
  { label: 'Practice', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/#contact' },
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

export default async function ServiceSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = SLUGS[slug];
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
            <span className="label-pill">Services</span>
            <h1 className="slug-hero-headline">{data.title}</h1>
            <p className="slug-hero-sub">{data.heroSub}</p>
          </div>
          <div className="slug-hero-image-belt">
            <figure
              className="slug-hero-image"
              aria-label="Infusion room interior — photo to be placed"
            >
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
                <span>Infusion room · photo</span>
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
              <span className="label-pill">The Protocol</span>
              <h2 className="slug-protocol-aside-title">{data.protocolAsideTitle}</h2>
            </aside>
            <div className="slug-protocol-body reveal reveal-d1">
              {data.protocolParas.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ELIGIBILITY */}
        <section className="slug-eligibility" data-screen-label="04 Eligibility">
          <div className="section-inner">
            <div className="section-head reveal">
              <span className="label-pill">Eligibility</span>
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
              <a href="/qualify">Take the self-assessment →</a>
            </p>
          </div>
        </section>

        {/* PRICING */}
        <section className="slug-pricing-section" data-screen-label="05 Pricing">
          <div className="section-inner">
            <div className="section-head reveal" style={{ marginBottom: 36 }}>
              <span className="label-pill">Pricing</span>
            </div>
            <div className="slug-pricing-block reveal">
              <p className="slug-pricing-main">{data.pricingMain}</p>
              <p className="slug-pricing-note">{data.pricingNote}</p>
            </div>
          </div>
        </section>

        {/* STEPS */}
        <section className="slug-steps-section" data-screen-label="06 What to Expect">
          <div className="section-inner">
            <div className="section-head reveal">
              <span className="label-pill">What to Expect</span>
              <h2 className="section-title">
                From self-assessment
                <br />
                to integration
              </h2>
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
        <section className="slug-related-section" data-screen-label="07 Related Care">
          <div className="section-inner">
            <div className="section-head reveal" style={{ marginBottom: 40 }}>
              <span className="label-pill">Related Care</span>
              <h2 className="section-title">Other services</h2>
            </div>
            <div className="slug-related-grid">
              {data.related.map((r, i) => (
                <div key={r.href} className={`slug-related-card reveal${i ? ` reveal-d${i}` : ''}`}>
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

        {/* CTA ZONE */}
        <section className="slug-cta-zone" data-screen-label="08 CTA">
          <span className="label-pill slug-label-pill--inv reveal">Westwood, Los Angeles</span>
          <h2 className="slug-cta-title reveal">Ready to begin?</h2>
          <p className="slug-cta-sub reveal">
            Our PA reviews every intake personally. Most patients hear back within one business day.
          </p>
          <div className="slug-cta-buttons reveal">
            <a className="slug-cta-btn-primary" href="/book">
              Book a consultation
            </a>
            <a className="slug-cta-btn-secondary" href="/qualify">
              Take the self-assessment first
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
