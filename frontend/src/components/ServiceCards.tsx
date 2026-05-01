export default function ServiceCards() {
  return (
    <section className="section" data-screen-label="03 Services" id="practice">
      <div className="section-inner">
        <div className="section-head">
          <span className="label-pill">What We Offer</span>
          <h2 className="section-title">Three ways to heal</h2>
          <p className="section-sub">
            IV ketamine infusions, ketamine-assisted psychotherapy, and IV wellness &mdash; each
            tailored to where you are right now.
          </p>
        </div>

        <div className="three-cards">
          <article className="card-feature">
            {/* IV drip icon */}
            <svg className="card-feature-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 3 L12 8 M10 6 L14 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M9 8 L15 8 L14 18 C14 19.1 13.1 20 12 20 C10.9 20 10 19.1 10 18 Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 20 L12 22"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <h3 className="card-feature-title">IV Ketamine Infusions</h3>
            <p className="card-feature-body">
              A standard series of six subanesthetic infusions over two to three weeks, overseen by
              Dr. Christa Riley, board-certified anesthesiologist. Your PA meets with you before and
              after every session, adjusting dosing, duration, and supportive therapies based on
              your response.
            </p>
          </article>

          <article className="card-feature">
            {/* Mind/conversation icon */}
            <svg className="card-feature-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M21 15 C21 16.1 20.1 17 19 17 L7 17 L3 21 L3 5 C3 3.9 3.9 3 5 3 L19 3 C20.1 3 21 3.9 21 5 Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3 className="card-feature-title">Ketamine-Assisted Therapy</h3>
            <p className="card-feature-body">
              Bring your existing therapist to the session, or we&apos;ll connect you with one from
              our referral network. No in-house upsell, no added cost for the therapy component.
              Your mental health work and your infusion stay integrated from day one.
            </p>
          </article>

          <article className="card-feature">
            {/* Sparkle/wellness icon */}
            <svg className="card-feature-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 2 L13.5 8.5 L20 10 L13.5 11.5 L12 18 L10.5 11.5 L4 10 L10.5 8.5 Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 18 L19.8 20.2 L22 21 L19.8 21.8 L19 24 L18.2 21.8 L16 21 L18.2 20.2 Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3 className="card-feature-title">IV Wellness &amp; NAD+</h3>
            <p className="card-feature-body">
              NAD+, Myers&apos; Cocktail, glutathione, and other IV wellness infusions administered
              by our clinical team. Available as a standalone service or alongside your ketamine
              protocol to support energy, recovery, and overall cellular health.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
