'use client';

import { useEffect, useRef } from 'react';

export interface TestimonialItem {
  _id?: string;
  quote: string;
  name: string;
}

export interface TestimonialsSectionData {
  label?: string;
  heading?: string;
  subheading?: string;
  items?: TestimonialItem[];
}

const DEFAULT_ITEMS: TestimonialItem[] = [
  {
    quote:
      'It felt like time slowed down. I left feeling lighter, clearer, and more in touch with what matters.',
    name: 'Mona S.',
  },
  {
    quote:
      'Every part of the retreat felt intentional — from the silence to the tea. It gave me space to breathe and reset.',
    name: 'Sophia Lee',
  },
  {
    quote:
      "It wasn't just a retreat. It was a return — to nature, to stillness, to myself. I'm carrying that feeling with me.",
    name: 'Olivia S.',
  },
  {
    quote:
      "I didn't expect something so powerful. The forest session helped me pause and truly reconnect.",
    name: 'David R.',
  },
];

const DEFAULTS = {
  label: 'Testimonials',
  heading: 'What Clients Are Saying',
  subheading: 'Real words from people who experienced deep rest, clarity, and reconnection.',
};

export default function Testimonials({ data }: { data?: TestimonialsSectionData }) {
  const label = data?.label ?? DEFAULTS.label;
  const heading = data?.heading ?? DEFAULTS.heading;
  const subheading = data?.subheading ?? DEFAULTS.subheading;
  const testimonials = data?.items?.length ? data.items : DEFAULT_ITEMS;

  const trackRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const indexRef = useRef(1);
  const busyRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    const prev = prevRef.current;
    const next = nextRef.current;
    if (!track || !prev || !next) return;

    const originals = Array.from(track.children) as HTMLElement[];
    if (!originals.length) return;

    const firstClone = originals[0].cloneNode(true) as HTMLElement;
    const lastClone = originals[originals.length - 1].cloneNode(true) as HTMLElement;
    firstClone.setAttribute('aria-hidden', 'true');
    lastClone.setAttribute('aria-hidden', 'true');
    track.appendChild(firstClone);
    track.insertBefore(lastClone, originals[0]);

    const N = originals.length;

    const stepWidth = () => {
      const card = originals[0];
      const styles = getComputedStyle(track);
      const gap = parseFloat(styles.gap) || 24;
      return card.offsetWidth + gap;
    };

    const apply = (animate: boolean) => {
      track.classList.toggle('is-snapping', !animate);
      track.style.transform = `translateX(${-indexRef.current * stepWidth()}px)`;
      if (!animate) {
        void track.offsetWidth;
        track.classList.remove('is-snapping');
      }
    };

    const advance = (dir: number) => {
      if (busyRef.current) return;
      busyRef.current = true;
      indexRef.current += dir;
      apply(true);
    };

    const onTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName !== 'transform') return;
      if (indexRef.current === N + 1) {
        indexRef.current = 1;
        apply(false);
      } else if (indexRef.current === 0) {
        indexRef.current = N;
        apply(false);
      }
      busyRef.current = false;
    };

    const onResize = () => apply(false);

    track.addEventListener('transitionend', onTransitionEnd);
    prev.addEventListener('click', () => advance(-1));
    next.addEventListener('click', () => advance(1));
    window.addEventListener('resize', onResize);
    apply(false);

    return () => {
      track.removeEventListener('transitionend', onTransitionEnd);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section className="section" data-screen-label="10 Testimonials">
      <div className="section-inner">
        <div className="section-head">
          <span className="label-pill">{label}</span>
          <h2 className="section-title">{heading}</h2>
          <p className="section-sub">{subheading}</p>
        </div>
      </div>

      <div className="testimonial-frame">
        <div className="testimonial-rail">
          <div className="testimonial-track" id="testimonialTrack" ref={trackRef}>
            {testimonials.map((t) => (
              <article className="testimonial-card" key={t._id ?? t.name}>
                <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
                <p className="testimonial-name">{t.name}</p>
              </article>
            ))}
          </div>
        </div>

        <button
          className="testimonial-arrow is-prev"
          id="testiPrev"
          ref={prevRef}
          aria-label="Previous testimonial"
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M15 6 L9 12 L15 18"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          className="testimonial-arrow is-next"
          id="testiNext"
          ref={nextRef}
          aria-label="Next testimonial"
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M9 6 L15 12 L9 18"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
