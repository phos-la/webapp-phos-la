import { urlFor } from '@/lib/sanity/image';
import type { SanityImageSource } from '@sanity/image-url';

export interface ProviderSectionData {
  label?: string;
  heading?: string;
  body?: string;
  quote?: string;
  portrait?: SanityImageSource;
}

const DEFAULTS: Required<ProviderSectionData> = {
  label: 'Medical Director',
  heading: 'Meet Dr. Riley',
  body: 'Dr. Christa Riley is a board-certified anesthesiologist and military veteran who served in Afghanistan. Her experience performing nerve blocks and anesthesia on wounded service members shaped a firsthand understanding of trauma, resilience, and the lasting effects of high-stress on the body and mind. She brings that perspective to every patient at Phos.',
  quote:
    "Healing isn't one-size-fits-all. Your protocol should reflect how you're actually responding, not what worked for someone else.",
  portrait: null as unknown as SanityImageSource,
};

export default function ProviderCard({ data }: { data?: ProviderSectionData }) {
  const d = { ...DEFAULTS, ...data };

  const portraitSrc = d.portrait
    ? urlFor(d.portrait).width(1400).quality(80).auto('format').url()
    : 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&q=80&auto=format&fit=crop';

  return (
    <section className="bio-wrap" data-screen-label="05 Meet Dr. Riley" id="about">
      <div className="bio-card">
        <div className="bio-text">
          <div>
            <span className="bio-label">{d.label}</span>
            <h2 className="bio-headline">{d.heading}</h2>
            <p className="bio-body">{d.body}</p>
          </div>
          <p className="bio-quote">{d.quote}</p>
        </div>
        <div
          className="bio-portrait"
          role="img"
          aria-label={`${d.heading}, ${d.label}`}
          style={{ background: `url(${portraitSrc}) center 20% / cover no-repeat` }}
        />
      </div>
    </section>
  );
}
