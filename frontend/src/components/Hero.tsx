import { urlFor } from '@/lib/sanity/image';
import type { SanityImageSource } from '@sanity/image-url';
import HeroParallaxImage from './HeroParallaxImage';

export interface HeroData {
  headline?: string;
  subheading?: string;
  heroImage?: SanityImageSource;
  overlayHeadline?: string;
  overlayBody?: string;
}

const DEFAULTS: Required<HeroData> = {
  headline: 'Your protocol evolves with you.',
  subheading:
    'IV ketamine therapy in a private Los Angeles practice, a licensed provider evaluates your response before and after every infusion, adjusting your treatment in real time.',
  heroImage: null as unknown as SanityImageSource,
  overlayHeadline: 'The only LA clinic in the room after every infusion.',
  overlayBody:
    "Most clinics hand you off to a nurse and check in periodically. At Phos, your PA is there before and after every session, adjusting your dosing, duration, and supportive therapies based on how you're actually responding. Led by Dr. Christa Riley, board-certified anesthesiologist and military veteran.",
};

export default function Hero({ data }: { data?: HeroData }) {
  const d = { ...DEFAULTS, ...data };

  const heroImageSrc = d.heroImage
    ? urlFor(d.heroImage).width(1600).quality(80).auto('format').url()
    : 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=1600&q=80&auto=format&fit=crop';

  return (
    <section className="hero" data-screen-label="01 Hero">
      <div className="hero-inner">
        <h1 className="hero-headline">{d.headline}</h1>

        <p className="hero-sub">{d.subheading}</p>
      </div>

      <HeroParallaxImage>
        <figure className="hero-image" id="heroImage" aria-label="Treatment room interior">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={heroImageSrc} alt="" loading="lazy" />
          <div className="hero-image-overlay">
            <svg className="hero-image-mark" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 21 C 7 18, 6 12, 11 4 C 16 8, 17 15, 12 21 Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2 className="hero-image-headline">{d.overlayHeadline}</h2>
            <p className="hero-image-body">{d.overlayBody}</p>
          </div>
        </figure>
      </HeroParallaxImage>
    </section>
  );
}
