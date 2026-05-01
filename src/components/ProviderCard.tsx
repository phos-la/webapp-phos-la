export default function ProviderCard() {
  return (
    <section className="bio-wrap" data-screen-label="05 Meet Sophia" id="about">
      <div className="bio-card">
        <div className="bio-text">
          <div>
            <span className="bio-label">Your guide</span>
            <h2 className="bio-headline">Meet Sophia</h2>
            <p className="bio-body">
              Hi, I&apos;m Sophia - a somatic practitioner and bodyworker
              dedicated to creating gentle spaces for transformation. My work
              blends deep listening, intuitive touch, and the healing presence
              of the forest.
            </p>
          </div>
          <p className="bio-quote">
            Each session is an invitation to slow down, return to the body, and
            remember what&apos;s already whole.
          </p>
        </div>
        <div className="bio-portrait">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&q=80&auto=format&fit=crop"
            alt="Sophia, somatic practitioner"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
