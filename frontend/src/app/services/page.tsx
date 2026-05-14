import { client } from '@/lib/sanity/client';
import { urlFor } from '@/lib/sanity/image';
import { servicesPageQuery } from '@/lib/sanity/queries';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import RevealOnScroll from '@/components/RevealOnScroll';
import { Markdown } from '@/components/Markdown';
import './services.css';

export const revalidate = 300;

export const metadata = {
  title: 'Services — Phos',
  description:
    'Four ways Phos treats patients, from clinical IV ketamine infusions to spa wellness drips.',
};

const SERVICES_NAV_ITEMS = [
  { label: 'Practice', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/#contact' },
];

type IconKey = 'iv' | 'home' | 'drop' | 'conversation';
type GradientKey = 'green' | 'sand' | 'mist' | 'amber';

const DEFAULTS = {
  eyebrowLabel: 'Our Services',
  heroTitle: 'Services',
  heroSub:
    'Four ways Phos treats patients, from clinical IV ketamine infusions to spa wellness drips.',
  introBody:
    "Phos is built around medical IV ketamine therapy under direct anesthesiologist oversight. Around that core, we offer at-home telehealth ketamine for patients who qualify, IV spa drips for general wellness, and an optional partnership with an independent ketamine-assisted psychotherapist for patients who want adjunctive talk therapy alongside their protocol. Every patient is evaluated by our PA before and after each session, regardless of which service they're booked for.",
  gridLabel: 'What We Offer',
  services: [
    {
      _id: 'default-iv',
      title: 'IV Ketamine Infusions',
      slug: 'iv-ketamine-infusions',
      cardDescription:
        'Our core service. 60-minute infusions in our Westwood clinic, run on a 5 to 6 session protocol with PA-supported intention setting and integration.',
      cardIcon: 'iv' as IconKey,
      cardGradient: 'mist' as GradientKey,
    },
    {
      _id: 'default-home',
      title: 'At-Home Ketamine Therapy',
      slug: 'at-home-ketamine',
      cardDescription:
        'Telehealth-monitored sublingual ketamine for qualifying patients, with the same medical oversight as our in-clinic infusions.',
      cardIcon: 'home' as IconKey,
      cardGradient: 'sand' as GradientKey,
    },
    {
      _id: 'default-spa',
      title: 'IV Spa',
      slug: 'iv-spa',
      cardDescription:
        'NAD+, Meyers cocktail, glutathione, and other wellness drips, offered as standalone bookings outside our ketamine protocols.',
      cardIcon: 'drop' as IconKey,
      cardGradient: 'green' as GradientKey,
    },
    {
      _id: 'default-kap',
      title: 'Ketamine-Assisted Psychotherapy',
      slug: 'kap',
      cardDescription:
        'Optional adjunctive psychotherapy through our partner therapist Carly Salcido, structured around the neuroplastic window that follows each infusion.',
      cardIcon: 'conversation' as IconKey,
      cardGradient: 'amber' as GradientKey,
    },
  ],
  ctaText: "Not sure where to start? Book a consultation and we'll walk you through it.",
  ctaPrimaryLabel: 'Book a consultation',
  ctaPrimaryHref: '/book',
  ctaSecondaryLabel: 'See pricing',
  ctaSecondaryHref: '/pricing',
  ctaAddress: '1762 Westwood Blvd, Ste 320, Los Angeles, CA 90024.',
};

type ServiceCard = {
  _id: string;
  title?: string;
  slug?: string;
  cardDescription?: string;
  cardIcon?: IconKey;
  cardGradient?: GradientKey;
  cardPhoto?: unknown;
  draft?: boolean;
};

type ServicesPageData = Partial<Omit<typeof DEFAULTS, 'services'>> & {
  heroImage?: unknown;
  services?: ServiceCard[];
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

const ICONS: Record<IconKey, React.ReactElement> = {
  iv: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3v5M10 6h4" />
      <path d="M9 8h6l-1 10a2 2 0 01-4 0L9 8z" />
      <path d="M12 20v2" />
    </svg>
  ),
  home: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  drop: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0L12 2.69z" />
    </svg>
  ),
  conversation: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  ),
};

const GRADIENTS: Record<GradientKey, string> = {
  green: 'linear-gradient(148deg, #c5d2ce 0%, #7ba8a0 100%)',
  sand: 'linear-gradient(148deg, #d2ccbb 0%, #a8916a 100%)',
  mist: 'linear-gradient(148deg, #cdd6d3 0%, #84b0a8 100%)',
  amber: 'linear-gradient(148deg, #d5cfc0 0%, #b09474 100%)',
};

const ArrowRight = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

export default async function ServicesPage() {
  const raw =
    (await client.fetch<ServicesPageData | null>(
      servicesPageQuery,
      {},
      { next: { tags: ['sanity'], revalidate: 300 } },
    )) ?? {};
  const d = { ...DEFAULTS, ...raw };
  const services: ServiceCard[] = raw.services?.length ? raw.services : DEFAULTS.services;

  return (
    <div className="services-page">
      <Nav data={{ items: SERVICES_NAV_ITEMS }} />
      <RevealOnScroll selectors={['.service-card', '.services-cta-card']} threshold={0.12} />

      <main>
        {/* HERO */}
        <section className="services-hero" data-screen-label="01 Hero">
          <div className="services-hero-inner">
            <span className="label-pill">{d.eyebrowLabel}</span>
            <h1 className="services-hero-title">{d.heroTitle}</h1>
            <p className="services-hero-sub">{d.heroSub}</p>

            <div className="services-hero-image-wrap">
              <div className="services-hero-image" aria-label="Infusion room photo placeholder">
                <div className="services-hero-image-inner">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  <span>Infusion room photo</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="services-intro" data-screen-label="02 Intro">
          <div className="services-intro-inner">
            <span className="services-intro-rule" aria-hidden="true" />
            <Markdown content={d.introBody} />
          </div>
        </section>

        {/* GRID */}
        <section className="services-grid-section" data-screen-label="03 Services Grid">
          <div className="services-grid-inner">
            <div className="services-grid-head">
              <span className="label-pill">{d.gridLabel}</span>
            </div>

            <div className="services-grid">
              {services.map((s, i) => {
                const iconKey: IconKey = (s.cardIcon as IconKey) ?? 'iv';
                const gradKey: GradientKey = (s.cardGradient as GradientKey) ?? 'mist';
                const photo = imageUrl(s.cardPhoto, 800);
                return (
                  <article
                    key={s._id ?? s.slug ?? i}
                    className="service-card"
                    data-delay={String(i * 80)}
                  >
                    <div
                      className="service-card-photo"
                      style={
                        photo
                          ? { background: `url(${photo}) center/cover no-repeat` }
                          : { background: GRADIENTS[gradKey] }
                      }
                    >
                      {!photo && (
                        <div className="service-card-photo-inner">
                          {ICONS[iconKey]}
                          <span>Add photo</span>
                        </div>
                      )}
                    </div>
                    <div className="service-card-body">
                      <h2 className="service-card-name">{s.title}</h2>
                      <p className="service-card-desc">{s.cardDescription}</p>
                      <a className="service-card-link" href={`/services/${s.slug}`}>
                        Learn more
                        <ArrowRight />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="services-cta" data-screen-label="04 CTA">
          <div className="services-cta-card">
            <p className="services-cta-text">{d.ctaText}</p>
            <div className="services-cta-buttons">
              <a className="phos-btn-primary" href={d.ctaPrimaryHref}>
                {d.ctaPrimaryLabel}
              </a>
              <a className="phos-btn-secondary" href={d.ctaSecondaryHref}>
                {d.ctaSecondaryLabel}
              </a>
            </div>
            <p className="services-cta-address">{d.ctaAddress}</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
