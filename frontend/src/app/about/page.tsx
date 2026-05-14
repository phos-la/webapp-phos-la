import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import RevealOnScroll from '@/components/RevealOnScroll';
import './about.css';

export const metadata = {
  title: 'About — Phos',
  description:
    'Phos is a Westwood ketamine clinic built around a board-certified anesthesiologist and a small, hands-on care team.',
};

const ABOUT_NAV_ITEMS = [
  { label: 'Practice', href: '/' },
  { label: 'Treatments', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/#contact' },
];

export default function AboutPage() {
  return (
    <div className="about-page">
      <Nav data={{ items: ABOUT_NAV_ITEMS }} />
      <RevealOnScroll
        selectors={['[data-reveal]']}
        visibleClass="vis"
        rootMargin="0px 0px -24px 0px"
        threshold={0.08}
      />

      <main>
        {/* 1. HERO */}
        <section className="about-hero" data-screen-label="01 Hero">
          <div className="about-hero-copy">
            <span className="label-pill">About</span>
            <h1 className="hero-h1" data-reveal>
              About Phos
            </h1>
            <p className="hero-sub" data-reveal data-d="1">
              A Westwood ketamine clinic built around a board-certified anesthesiologist and a
              small, hands-on care team.
            </p>
          </div>
          <div className="hero-img" data-reveal data-d="2">
            <div
              className="hero-img-inner"
              style={{ background: 'linear-gradient(155deg,#3a6358 0%,#1e3028 100%)' }}
            >
              <svg
                width="56"
                height="56"
                viewBox="0 0 200 200"
                fill="none"
                aria-hidden="true"
                style={{ opacity: 0.16 }}
              >
                <circle cx="100" cy="100" r="90" stroke="rgba(237,232,220,1)" strokeWidth="2.5" />
                <g
                  stroke="rgba(237,232,220,1)"
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
            </div>
            <p className="hero-img-caption">
              Photo: Christa and Katie, Huntington Garden shoot, April 2026
            </p>
          </div>
        </section>

        {/* 2. DR. CHRISTA RILEY */}
        <section className="about-bio-wrap" id="christa">
          <div className="about-bio-card" data-reveal>
            <div className="about-bio-text">
              <div>
                <span className="about-bio-eyebrow">Medical Director</span>
                <h2 className="about-bio-name">Dr. Christa Riley, MD</h2>
                <p className="about-bio-body">
                  Christa is a board-certified anesthesiologist and the medical director of Phos.
                  Her work in operating rooms and on active military service in Afghanistan shaped
                  how she runs this clinic: patient-by-patient judgment, careful dosing, full
                  evaluation before and after every infusion. She bought the practice because she
                  wanted a ketamine clinic that took itself seriously as a medical operation, not a
                  wellness brand. She sees every Phos patient herself, and she sets the standard the
                  rest of the team works to.
                </p>
              </div>
              <div className="about-bio-creds">
                <span className="about-bio-cred">Board-certified anesthesiologist</span>
                <span className="about-bio-cred">Military veteran</span>
                <span className="about-bio-cred">Owner of Phos</span>
              </div>
            </div>
            <div className="about-bio-portrait">
              <div className="about-bio-ph">
                <span className="about-bio-ph-lbl">
                  Portrait photo
                  <br />
                  Dr. Christa Riley
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. THE TEAM */}
        <section className="about-team" id="team">
          <div className="about-team-inner">
            <div className="about-team-hd" data-reveal>
              <span className="label-pill">The clinic</span>
              <h2>The team you&apos;ll see each visit</h2>
            </div>
            <div className="about-team-grid">
              {/* Katie Besanko */}
              <div className="about-team-card" data-reveal>
                <div className="about-team-portrait about-team-katie-bg">
                  <span className="about-portrait-lbl">
                    Portrait photo
                    <br />
                    Katie Besanko
                  </span>
                </div>
                <div className="about-team-card-body">
                  <p className="about-team-role">Physician Assistant, PA-C</p>
                  <h3 className="about-team-name">Katie Besanko</h3>
                  <p className="about-team-bio">
                    Katie is Phos&apos;s Physician Assistant and the person most patients build
                    their longest relationship with at the clinic. She sits with every patient
                    before the infusion to set intentions, and again after for 15 to 20 minutes of
                    integration support. She runs the day-to-day operation alongside Christa.
                  </p>
                </div>
              </div>

              {/* Vera, RN */}
              <div className="about-team-card" data-reveal data-d="1">
                <div className="about-team-portrait about-team-vera-bg">
                  <span className="about-portrait-lbl">
                    Portrait photo
                    <br />
                    Vera
                  </span>
                </div>
                <div className="about-team-card-body">
                  <p className="about-team-role">Registered Nurse, RN</p>
                  <h3 className="about-team-name">Vera</h3>
                  <p className="about-team-bio">Bio in progress.</p>
                  <span className="about-ph-note">
                    Placeholder bio. Katie to provide 2 to 3 sentences before publish.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. KAP — CARLY SALCIDO */}
        <section className="about-kap" id="kap">
          <div className="about-kap-inner">
            <div className="about-kap-card" data-reveal>
              <div>
                <span className="about-kap-tag">Extended care</span>
                <h2 className="about-kap-heading">Ketamine-Assisted Psychotherapy</h2>
                <p className="about-kap-who">With Carly Salcido</p>
                <p className="about-kap-body">
                  Phos partners with Carly Salcido, an independent licensed therapist, for patients
                  who want adjunctive psychotherapy alongside their infusion protocol. Her approach
                  is neurobiologically-informed integration therapy, focused on the neuroplastic
                  window that follows ketamine treatment. Sessions are booked directly with Carly,
                  separately from infusion costs.
                </p>
                <a className="about-kap-link" href="/services/kap">
                  Learn about KAP <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
              <div className="about-kap-aside">
                <div className="about-kap-avatar">
                  <span className="about-kap-av-lbl">
                    Photo
                    <br />
                    Carly
                  </span>
                </div>
                <p className="about-kap-aside-name">Carly Salcido</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. LOCATION + CTA */}
        <section className="about-location" id="location">
          <div className="about-location-grid">
            <div className="about-loc-text" data-reveal>
              <p className="about-loc-eyebrow">Find us</p>
              <h2 className="about-loc-headline">
                Westwood,
                <br />
                Los Angeles
              </h2>
              <p className="about-loc-address">
                1762 Westwood Blvd, Ste 320
                <br />
                Los Angeles, CA 90024
                <br />
                <br />
                Third floor. Private suite, designed for medical privacy and patient comfort. Near
                UCLA.
              </p>
              <div className="about-loc-btns">
                <a className="about-loc-btn-primary" href="/book">
                  Book a consultation
                </a>
                <a className="about-loc-btn-secondary" href="/pricing">
                  See pricing
                </a>
              </div>
            </div>
            <div className="about-loc-photo" data-reveal data-d="1">
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
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
