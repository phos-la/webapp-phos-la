import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import RevealOnScroll from '@/components/RevealOnScroll';
import './services.css';

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

const CARDS = [
  {
    slug: 'iv-ketamine-infusions',
    name: 'IV Ketamine Infusions',
    desc: 'Our core service. 60-minute infusions in our Westwood clinic, run on a 5 to 6 session protocol with PA-supported intention setting and integration.',
    icon: (
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
  },
  {
    slug: 'at-home-ketamine',
    name: 'At-Home Ketamine Therapy',
    desc: 'Telehealth-monitored sublingual ketamine for qualifying patients, with the same medical oversight as our in-clinic infusions.',
    icon: (
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
  },
  {
    slug: 'iv-spa',
    name: 'IV Spa',
    desc: 'NAD+, Meyers cocktail, glutathione, and other wellness drips, offered as standalone bookings outside our ketamine protocols.',
    icon: (
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
  },
  {
    slug: 'kap',
    name: 'Ketamine-Assisted Psychotherapy',
    desc: 'Optional adjunctive psychotherapy through our partner therapist Carly Salcido, structured around the neuroplastic window that follows each infusion.',
    icon: (
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
  },
];

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

export default function ServicesPage() {
  return (
    <div className="services-page">
      <Nav data={{ items: SERVICES_NAV_ITEMS }} />
      <RevealOnScroll selectors={['.service-card', '.services-cta-card']} threshold={0.12} />

      <main>
        {/* HERO */}
        <section className="services-hero" data-screen-label="01 Hero">
          <div className="services-hero-inner">
            <span className="label-pill">Our Services</span>
            <h1 className="services-hero-title">Services</h1>
            <p className="services-hero-sub">
              Four ways Phos treats patients, from clinical IV ketamine infusions to spa wellness
              drips.
            </p>

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
            <p>
              Phos is built around medical IV ketamine therapy under direct anesthesiologist
              oversight. Around that core, we offer at-home telehealth ketamine for patients who
              qualify, IV spa drips for general wellness, and an optional partnership with an
              independent ketamine-assisted psychotherapist for patients who want adjunctive talk
              therapy alongside their protocol. Every patient is evaluated by our PA before and
              after each session, regardless of which service they&apos;re booked for.
            </p>
          </div>
        </section>

        {/* SERVICES GRID */}
        <section className="services-grid-section" data-screen-label="03 Services Grid">
          <div className="services-grid-inner">
            <div className="services-grid-head">
              <span className="label-pill">What We Offer</span>
            </div>

            <div className="services-grid">
              {CARDS.map((card, i) => (
                <article key={card.slug} className="service-card" data-delay={String(i * 80)}>
                  <div className="service-card-photo">
                    <div className="service-card-photo-inner">
                      {card.icon}
                      <span>Add photo</span>
                    </div>
                  </div>
                  <div className="service-card-body">
                    <h2 className="service-card-name">{card.name}</h2>
                    <p className="service-card-desc">{card.desc}</p>
                    <a className="service-card-link" href={`/services/${card.slug}`}>
                      Learn more
                      <ArrowRight />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="services-cta" data-screen-label="04 CTA">
          <div className="services-cta-card">
            <p className="services-cta-text">
              Not sure where to start? Book a consultation and we&apos;ll walk you through it.
            </p>
            <div className="services-cta-buttons">
              <a className="phos-btn-primary" href="/book">
                Book a consultation
              </a>
              <a className="phos-btn-secondary" href="/pricing">
                See pricing
              </a>
            </div>
            <p className="services-cta-address">
              1762 Westwood Blvd, Ste 320, Los Angeles, CA 90024.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
