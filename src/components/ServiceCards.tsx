export default function ServiceCards() {
  return (
    <section className="section" data-screen-label="03 Your First Session" id="practice">
      <div className="section-inner">
        <div className="section-head">
          <span className="label-pill">About the Practice</span>
          <h2 className="section-title">Your First Session</h2>
          <p className="section-sub">
            There&apos;s nothing you need to prepare. In your first session,
            we&apos;ll start gently &mdash; softening the body, calming the
            breath, and arriving in presence together.
          </p>
        </div>

        <div className="three-cards">
          <article className="card-feature">
            <svg
              className="card-feature-icon"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 21 C 7 18, 6 12, 11 4 C 16 8, 17 15, 12 21 Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3 className="card-feature-title">Grounding touch</h3>
            <p className="card-feature-body">
              Gentle, intentional contact to calm the nervous system, reduce
              stress, and bring awareness back into the body.
            </p>
          </article>

          <article className="card-feature">
            <svg
              className="card-feature-icon"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 8 Q 8 5, 13 8 T 21 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M3 13 Q 8 10, 13 13 T 21 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M3 18 Q 7 16, 11 18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <h3 className="card-feature-title">Breath regulation</h3>
            <p className="card-feature-body">
              Guided breathwork to release tension, regulate your system, and
              invite more spaciousness from within.
            </p>
          </article>

          <article className="card-feature">
            <svg
              className="card-feature-icon"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 9 Q 7 6, 12 9 T 21 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M3 14 Q 7 11, 12 14 T 21 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <h3 className="card-feature-title">Intuitive Movement</h3>
            <p className="card-feature-body">
              Natural, unforced movement that unwinds holding patterns and helps
              reconnect with your inner rhythm.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
