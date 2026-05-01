export default function TheSpace() {
  return (
    <section className="space-section" data-screen-label="08 The Clinic">
      <div className="space-cards">
        <div className="space-card space-text">
          <h2 className="space-headline">Private, calm, Westwood</h2>
          <p className="space-body">
            Our clinic is on the third floor of 1762 Westwood Blvd, a quiet
            suite designed for medical privacy and patient comfort. No waiting
            room full of strangers. No sterile hospital feel. Just a calm,
            unhurried space where you can arrive, settle in, and focus entirely
            on your session.
          </p>
          <a className="space-link" href="https://maps.google.com/?q=1762+Westwood+Blvd+Suite+320+Los+Angeles+CA+90024" target="_blank" rel="noopener noreferrer">
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
            1762 Westwood Blvd, Ste 320
            <span aria-hidden="true">&rarr;</span>
          </a>
          <div className="space-chips">
            <span className="space-chip">Private suite</span>
            <span className="space-chip">Medical-grade monitoring</span>
            <span className="space-chip">Near UCLA</span>
          </div>
        </div>

        <div className="space-card space-photos">
          <div className="space-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1400&q=80&auto=format&fit=crop"
              alt="Calm private clinical suite"
              loading="lazy"
            />
          </div>
          <div className="space-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=80&auto=format&fit=crop"
              alt="Medical professional with patient"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
