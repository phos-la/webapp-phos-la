const LeafIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
    style={{ flexShrink: 0, width: 14, height: 14, marginTop: 3, color: "var(--cream-400)" }}
  >
    <path
      d="M12 21 C 7 18, 6 12, 11 4 C 16 8, 17 15, 12 21 Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Pricing() {
  return (
    <section className="section" data-screen-label="09 Pricing" id="treatments">
      <div className="section-inner">
        <div className="section-head">
          <span className="label-pill">Pricing</span>
          <h2 className="section-title">Packages &amp; Pricing</h2>
        </div>

        <div className="pricing-grid">
          {/* Core Session */}
          <article className="price-card">
            <h3 className="price-name">Core Session</h3>
            <p className="price-desc">A gentle one-day experience in the forest</p>
            <div className="price-included">
              <p className="price-included-label">What&apos;s included:</p>
              <ul>
                <li><LeafIcon />Intention-setting by email</li>
                <li><LeafIcon />120 min session</li>
                <li><LeafIcon />Silent tea &amp; reflection</li>
                <li><LeafIcon />Integration follow-up</li>
              </ul>
            </div>
            <p className="price-amount">$220</p>
            <a className="price-cta" href="#book-core">Book Core Session</a>
          </article>

          {/* Forest Night — featured */}
          <article className="price-card is-featured">
            <svg
              className="price-card-leaves"
              viewBox="0 0 110 50"
              fill="none"
              aria-hidden="true"
            >
              <path d="M55 42 C 55 28, 60 18, 70 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M70 14 C 76 8, 88 6, 96 8 C 92 18, 80 22, 70 18" fill="#9ab27a" stroke="currentColor" strokeWidth="1" />
              <path d="M55 42 C 55 30, 50 22, 38 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M38 18 C 30 14, 18 14, 12 18 C 18 26, 32 28, 40 22" fill="#9ab27a" stroke="currentColor" strokeWidth="1" />
              <path d="M55 42 C 56 32, 60 26, 66 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M66 24 C 72 22, 80 24, 84 28 C 78 32, 70 32, 64 28" fill="#a8c089" stroke="currentColor" strokeWidth="1" />
              <path d="M55 42 C 54 32, 50 28, 44 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M44 26 C 38 24, 30 26, 26 30 C 32 34, 40 34, 46 30" fill="#a8c089" stroke="currentColor" strokeWidth="1" />
            </svg>
            <span className="price-badge">Popular</span>
            <h3 className="price-name">Forest Night</h3>
            <p className="price-desc">
              Arrive in the morning, receive a full session, and stay the night
              to let it land fully.
            </p>
            <div className="price-included">
              <p className="price-included-label">What&apos;s included:</p>
              <ul>
                <li><LeafIcon />Everything from core</li>
                <li><LeafIcon />Private overnight stay</li>
                <li><LeafIcon />Dinner &amp; breakfast</li>
                <li><LeafIcon />Morning practice</li>
              </ul>
            </div>
            <p className="price-amount">$480</p>
            <a className="price-cta" href="#book-night">Book Forest Night</a>
          </article>

          {/* Deep Retreat */}
          <article className="price-card">
            <h3 className="price-name">Deep Retreat</h3>
            <p className="price-desc">
              A 2&ndash;5 day solo or small-group retreat to soften, reset, and
              reconnect fully.
            </p>
            <div className="price-included">
              <p className="price-included-label">What&apos;s included:</p>
              <ul>
                <li><LeafIcon />Daily sessions</li>
                <li><LeafIcon />Forest rituals &amp; rest</li>
                <li><LeafIcon />Meals &amp; private stay</li>
                <li><LeafIcon />Pre + post support</li>
              </ul>
            </div>
            <p className="price-amount">Contact me</p>
            <a className="price-cta" href="#schedule-call">Schedule Call</a>
          </article>
        </div>

        <div className="price-callout">
          <div className="price-callout-text">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M5 5 C 5 4, 6 3, 7 3 L 9 3 C 10 3, 11 4, 11 5 L 11 8 C 11 9, 10 10, 9 10 L 8 10 C 9 14, 12 17, 16 18 L 16 17 C 16 16, 17 15, 18 15 L 21 15 C 22 15, 23 16, 23 17 L 23 19 C 23 20, 22 21, 21 21 C 12 21, 5 14, 5 5 Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>
              If you are unsure which suits you best, book a free 15-minute
              consultation call with me. I&apos;ll walk you through all your
              questions.
            </span>
          </div>
          <a className="price-callout-cta" href="#consult-15">
            Book a 15-minute call
          </a>
        </div>
      </div>
    </section>
  );
}
