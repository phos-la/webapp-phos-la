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
          <h2 className="section-title">Transparent pricing</h2>
          <p className="section-sub">
            Every session includes PA consultation before and after, plus any
            supportive therapies adjusted to your protocol. No surprise line items.
          </p>
        </div>

        <div className="pricing-grid">
          {/* Single Session */}
          <article className="price-card">
            <h3 className="price-name">Single Infusion</h3>
            <p className="price-desc">One standalone IV ketamine session with full clinical support</p>
            <div className="price-included">
              <p className="price-included-label">What&apos;s included:</p>
              <ul>
                <li><LeafIcon />Pre-infusion PA consultation</li>
                <li><LeafIcon />IV ketamine administration</li>
                <li><LeafIcon />Supportive therapies as needed</li>
                <li><LeafIcon />Post-infusion PA check-in</li>
              </ul>
            </div>
            <p className="price-amount">$650</p>
            <a className="price-cta" href="#consult">Book a consultation</a>
          </article>

          {/* Membership Series — featured */}
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
            <span className="price-badge">Best value</span>
            <h3 className="price-name">Membership Rate</h3>
            <p className="price-desc">
              Lowest published IV ketamine rate in Los Angeles, based on our patient outcomes.
            </p>
            <div className="price-included">
              <p className="price-included-label">What&apos;s included:</p>
              <ul>
                <li><LeafIcon />Everything in single infusion</li>
                <li><LeafIcon />Protocol adjustments every visit</li>
                <li><LeafIcon />NAD+, magnesium, Zofran as needed</li>
                <li><LeafIcon />Integration follow-up</li>
              </ul>
            </div>
            <p className="price-amount">$400<span style={{ fontSize: 16, fontWeight: 400, color: "var(--fg-muted)" }}>/session</span></p>
            <a className="price-cta" href="#consult">Ask about membership</a>
          </article>

          {/* At-Home */}
          <article className="price-card">
            <h3 className="price-name">At-Home Program</h3>
            <p className="price-desc">
              Telehealth-based ketamine therapy for eligible existing patients, managed by your PA.
            </p>
            <div className="price-included">
              <p className="price-included-label">What&apos;s included:</p>
              <ul>
                <li><LeafIcon />Initial video evaluation</li>
                <li><LeafIcon />Prescription up to 3 months</li>
                <li><LeafIcon />3-refill self-evaluation check-in</li>
                <li><LeafIcon />6-month re-evaluation visit</li>
              </ul>
            </div>
            <p className="price-amount">Starting at $65<span style={{ fontSize: 16, fontWeight: 400, color: "var(--fg-muted)" }}>/mo</span></p>
            <a className="price-cta" href="#consult">Ask about eligibility</a>
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
              Not sure where to start? A free 15-minute call with our team will
              walk you through candidacy, options, and what to expect before you
              commit to anything.
            </span>
          </div>
          <a className="price-callout-cta" href="tel:4242784241">
            (424) 278-4241
          </a>
        </div>
      </div>
    </section>
  );
}
