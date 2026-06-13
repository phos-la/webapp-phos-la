import { client } from '@/lib/sanity/client';
import { urlFor } from '@/lib/sanity/image';
import { aboutPageQuery } from '@/lib/sanity/queries';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import RevealOnScroll from '@/components/RevealOnScroll';
import HeroParallaxImage from '@/components/HeroParallaxImage';
import './about.css';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'About — Phos',
  description:
    'Phos is a Westwood ketamine clinic built around a board-certified anesthesiologist and a small, hands-on care team.',
};

const DEFAULTS = {
  heroHeadline: 'About Phos',
  heroSubheading:
    'A Westwood ketamine clinic built around a board-certified anesthesiologist and a small, hands-on care team.',
  heroImageCaption: 'Photo: Christa and Katie, Huntington Garden shoot, April 2026',
  christaName: 'Dr. Christa Riley, MD',
  christaBio:
    'Christa is a board-certified anesthesiologist and the medical director of Phos. Her work in operating rooms and on active military service in Afghanistan shaped how she runs this clinic: patient-by-patient judgment, careful dosing, full evaluation before and after every infusion. She bought the practice because she wanted a ketamine clinic that took itself seriously as a medical operation, not a wellness brand. She sees every Phos patient herself, and she sets the standard the rest of the team works to.',
  christaCredentials: ['Board-certified anesthesiologist', 'Military veteran', 'Owner of Phos'],
  teamHeading: "The team you'll see each visit",
  teamMembers: [
    {
      role: 'Physician Assistant, PA-C',
      name: 'Katie Besanko',
      bio: "Katie is Phos's Physician Assistant and the person most patients build their longest relationship with at the clinic. She sits with every patient before the infusion to set intentions, and again after for 15 to 20 minutes of integration support. She runs the day-to-day operation alongside Christa.",
      gradient: 'katie' as const,
    },
    {
      role: 'Registered Nurse, RN',
      name: 'Vera',
      bio: 'Bio in progress.',
      placeholderNote: 'Placeholder bio. Katie to provide 2 to 3 sentences before publish.',
      gradient: 'vera' as const,
    },
  ],
  kapHeading: 'Ketamine-Assisted Psychotherapy',
  kapPartnerName: 'With Carly Salcido',
  kapBody:
    'Phos partners with Carly Salcido, an independent licensed therapist, for patients who want adjunctive psychotherapy alongside their infusion protocol. Her approach is neurobiologically-informed integration therapy, focused on the neuroplastic window that follows ketamine treatment. Sessions are booked directly with Carly, separately from infusion costs.',
  kapLinkLabel: 'Learn about KAP',
  kapLinkHref: '/treatments/kap',
  locationHeadline: 'Westwood, Los Angeles',
  locationBody:
    '1762 Westwood Blvd, Ste 320\nLos Angeles, CA 90024\n\nThird floor. Private suite, designed for medical privacy and patient comfort. Near UCLA.',
  locationPrimaryCtaLabel: 'Book a consultation',
  locationPrimaryCtaHref: '/book',
  locationSecondaryCtaLabel: 'See pricing',
  locationSecondaryCtaHref: '/pricing',
};

type AboutData = Partial<typeof DEFAULTS> & {
  heroImage?: unknown;
  christaPortrait?: unknown;
  kapPortrait?: unknown;
  locationPhoto?: unknown;
  teamMembers?: {
    role?: string;
    name?: string;
    bio?: string;
    portrait?: unknown;
    gradient?: 'katie' | 'vera';
    placeholderNote?: string;
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

export default async function AboutPage() {
  const raw =
    (await client.fetch<AboutData | null>(
      aboutPageQuery,
      {},
      { cache: 'no-store' },
    )) ?? {};
  const d = { ...DEFAULTS, ...raw };
  type TeamMember = NonNullable<AboutData['teamMembers']>[number];
  const team: TeamMember[] = raw.teamMembers?.length ? raw.teamMembers : DEFAULTS.teamMembers;
  const heroImg = imageUrl(raw.heroImage, 1800);
  const christaImg = imageUrl(raw.christaPortrait, 1200);
  const kapImg = imageUrl(raw.kapPortrait, 600);
  const locationImg = imageUrl(raw.locationPhoto, 1600);

  return (
    <div className="about-page">
      <Nav />
      <RevealOnScroll
        selectors={['[data-reveal]']}
        visibleClass="vis"
        rootMargin="0px 0px -24px 0px"
        threshold={0.08}
      />

      <main>
        {/* HERO */}
        <section className="about-hero" data-screen-label="01 Hero">
          <div className="about-hero-copy">
            <h1 className="hero-h1" data-reveal>
              {d.heroHeadline}
            </h1>
            <p className="hero-sub" data-reveal data-d="1">
              {d.heroSubheading}
            </p>
          </div>
        </section>

        <HeroParallaxImage>
          <figure
            className="hero-image hero-image--simple"
            aria-label="About hero photo"
            style={
              heroImg ? { background: `url(${heroImg}) center 25% / cover no-repeat` } : undefined
            }
          >
            {!heroImg && (
              <div className="hero-image--placeholder">
                <svg width="56" height="56" viewBox="0 0 200 200" fill="none" aria-hidden="true">
                  <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="2.5" />
                  <g
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M100 165 C 88 142, 88 116, 100 90 C 112 116, 112 142, 100 165 Z" />
                    <path d="M100 165 C 74 148, 64 122, 72 96 C 90 114, 100 142, 100 165 Z" />
                    <path d="M100 165 C 126 148, 136 122, 128 96 C 110 114, 100 142, 100 165 Z" />
                  </g>
                </svg>
                <span>About hero photo</span>
              </div>
            )}
            {d.heroImageCaption && (
              <figcaption className="hero-image-caption">{d.heroImageCaption}</figcaption>
            )}
          </figure>
        </HeroParallaxImage>

        {/* DR. CHRISTA RILEY */}
        <section className="about-bio-wrap" id="christa">
          <div className="about-bio-card" data-reveal>
            <div className="about-bio-text">
              <div>
                <h2 className="about-bio-name">{d.christaName}</h2>
                <p className="about-bio-body">{d.christaBio}</p>
              </div>
              <div className="about-bio-creds">
                {(d.christaCredentials ?? []).map((c) => (
                  <span key={c} className="about-bio-cred">
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div
              className="about-bio-portrait"
              style={
                christaImg
                  ? { background: `url(${christaImg}) center top / cover no-repeat` }
                  : undefined
              }
            >
              {!christaImg && (
                <div className="about-bio-ph">
                  <span className="about-bio-ph-lbl">
                    Portrait photo
                    <br />
                    {d.christaName}
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="about-team" id="team">
          <div className="about-team-inner">
            <div className="about-team-hd" data-reveal>
              <h2>{d.teamHeading}</h2>
            </div>
            <div className="about-team-grid">
              {team.map((m, i) => {
                const portrait = imageUrl(m.portrait, 900);
                const gradientClass =
                  m.gradient === 'vera' ? 'about-team-vera-bg' : 'about-team-katie-bg';
                return (
                  <div
                    key={`${m.name}-${i}`}
                    className="about-team-card"
                    data-reveal
                    data-d={i > 0 ? String(i) : undefined}
                  >
                    <div
                      className={`about-team-portrait ${portrait ? '' : gradientClass}`}
                      style={
                        portrait
                          ? { background: `url(${portrait}) center 15% / cover no-repeat` }
                          : undefined
                      }
                    >
                      {!portrait && (
                        <span className="about-portrait-lbl">
                          Portrait photo
                          <br />
                          {m.name}
                        </span>
                      )}
                    </div>
                    <div className="about-team-card-body">
                      <p className="about-team-role">{m.role}</p>
                      <h3 className="about-team-name">{m.name}</h3>
                      <p className="about-team-bio">{m.bio}</p>
                      {m.placeholderNote && (
                        <span className="about-ph-note">{m.placeholderNote}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* KAP */}
        <section className="about-kap" id="kap">
          <div className="about-kap-inner">
            <div className="about-kap-card" data-reveal>
              <div>
                <h2 className="about-kap-heading">{d.kapHeading}</h2>
                <p className="about-kap-who">{d.kapPartnerName}</p>
                <p className="about-kap-body">{d.kapBody}</p>
                <a className="about-kap-link" href={d.kapLinkHref}>
                  {d.kapLinkLabel} <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
              <div className="about-kap-aside">
                <div
                  className="about-kap-avatar"
                  style={
                    kapImg
                      ? { background: `url(${kapImg}) center 20% / cover no-repeat` }
                      : undefined
                  }
                >
                  {!kapImg && (
                    <span className="about-kap-av-lbl">
                      Photo
                      <br />
                      {d.kapPartnerName?.replace(/^With\s+/, '') ?? 'Partner'}
                    </span>
                  )}
                </div>
                <p className="about-kap-aside-name">
                  {d.kapPartnerName?.replace(/^With\s+/, '') ?? 'Partner'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LOCATION + CTA */}
        <section className="about-location" id="location">
          <div className="about-location-grid">
            <div className="about-loc-text" data-reveal>
              <h2 className="about-loc-headline">{d.locationHeadline}</h2>
              <p className="about-loc-address" style={{ whiteSpace: 'pre-line' }}>
                {d.locationBody}
              </p>
              <div className="about-loc-btns">
                <a className="about-loc-btn-primary" href={d.locationPrimaryCtaHref}>
                  {d.locationPrimaryCtaLabel}
                </a>
                <a className="about-loc-btn-secondary" href={d.locationSecondaryCtaHref}>
                  {d.locationSecondaryCtaLabel}
                </a>
              </div>
            </div>
            <div
              className="about-loc-photo"
              data-reveal
              data-d="1"
              style={
                locationImg
                  ? ({ '--loc-bg': `url(${locationImg})` } as Record<string, string>)
                  : undefined
              }
            >
              {!locationImg && (
                <div className="about-loc-photo-ph">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    style={{ opacity: 0.22 }}
                  >
                    <path
                      d="M12 21C6 14 5 9 8.5 6C12 3 14.5 6 14.5 6C14.5 6 17 9 14 13C12 16 12 21 12 21Z"
                      stroke="rgba(237,232,220,1)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="11.8"
                      cy="9.2"
                      r="1.8"
                      stroke="rgba(237,232,220,1)"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <span className="about-loc-photo-lbl">
                    Neighborhood photo or map embed
                    <br />
                    1762 Westwood Blvd, Westwood
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
