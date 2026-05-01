export default function ProviderCard() {
  return (
    <section className="bio-wrap" data-screen-label="05 Meet Dr. Riley" id="about">
      <div className="bio-card">
        <div className="bio-text">
          <div>
            <span className="bio-label">Medical Director</span>
            <h2 className="bio-headline">Meet Dr. Riley</h2>
            <p className="bio-body">
              Dr. Christa Riley is a board-certified anesthesiologist and
              military veteran who served in Afghanistan. Her experience
              performing nerve blocks and anesthesia on wounded service members
              shaped a firsthand understanding of trauma, resilience, and the
              lasting effects of high-stress on the body and mind. She brings
              that perspective to every patient at Phos.
            </p>
          </div>
          <p className="bio-quote">
            Healing isn&apos;t one-size-fits-all. Your protocol should reflect
            how you&apos;re actually responding, not what worked for someone
            else.
          </p>
        </div>
        <div className="bio-portrait">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&q=80&auto=format&fit=crop"
            alt="Dr. Christa Riley, Medical Director"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
