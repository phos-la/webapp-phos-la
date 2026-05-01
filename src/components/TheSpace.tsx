export default function TheSpace() {
  return (
    <section className="space-section" data-screen-label="08 The Space">
      <div className="space-cards">
        <div className="space-card space-text">
          <h2 className="space-headline">Deep in the nature</h2>
          <p className="space-body">
            Nestled in the woods near Asheville, this forest cabin is surrounded
            by trees, silence, and simplicity. The space is warm and grounding -
            designed to support nervous system rest and deep reconnection through
            nature. Whether you&apos;re here for a private session or staying
            overnight, the forest gently invites you back to yourself.
          </p>
          <a className="space-link" href="#location">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 21 C 6 14, 5 9, 8.5 6 C 12 3, 14 6, 14 6 C 14 6, 17 9, 14 13 C 12 16, 12 21, 12 21 Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <circle
                cx="11.5"
                cy="9"
                r="2"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
            See the location
            <span aria-hidden="true">&rarr;</span>
          </a>
          <div className="space-chips">
            <span className="space-chip">No disruptions</span>
            <span className="space-chip">Surrounded by deep woods</span>
            <span className="space-chip">Total privacy</span>
          </div>
        </div>

        <div className="space-card space-photos">
          <div className="space-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&q=80&auto=format&fit=crop"
              alt="Warm cabin interior with large window"
              loading="lazy"
            />
          </div>
          <div className="space-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&q=80&auto=format&fit=crop"
              alt="Misty forest at dawn"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
