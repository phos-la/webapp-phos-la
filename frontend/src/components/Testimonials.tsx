'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

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

  const [active, setActive] = useState<TestimonialItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const track = trackRef.current;
    const prev = prevRef.current;
    const next = nextRef.current;
    if (!track || !prev || !next) return;

    const originals = Array.from(track.children) as HTMLElement[];
    if (!originals.length) return;

    // Hide the "Read more" button on cards whose quote isn't actually clamped.
    // Runs before cloning so the clones inherit the resolved state.
    for (const card of originals) {
      const quote = card.querySelector('.testimonial-quote') as HTMLElement | null;
      const readmore = card.querySelector('.testimonial-readmore') as HTMLElement | null;
      if (quote && readmore && quote.scrollHeight - quote.clientHeight <= 2) {
        readmore.classList.add('is-hidden');
      }
    }

    // Open the modal from any card, clones included, via event delegation.
    const onTrackClick = (e: Event) => {
      const btn = (e.target as HTMLElement).closest('.testimonial-readmore') as HTMLElement | null;
      if (!btn) return;
      const idx = Number(btn.dataset.index);
      const item = testimonials[idx];
      if (item) setActive(item);
    };
    track.addEventListener('click', onTrackClick);

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
      track.removeEventListener('click', onTrackClick);
      window.removeEventListener('resize', onResize);
    };
  }, [testimonials]);

  // Close the modal on Escape, lock body scroll while open.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active]);

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
            {testimonials.map((t, i) => (
              <article className="testimonial-card" key={t._id ?? t.name}>
                <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
                <button
                  className="testimonial-readmore"
                  data-index={i}
                  type="button"
                  aria-label={`Read the full testimonial from ${t.name}`}
                >
                  Read more
                </button>
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

      {mounted &&
        active &&
        createPortal(
          <div className="testimonial-modal-overlay">
            <button
              className="testimonial-modal-backdrop"
              type="button"
              aria-label="Close testimonial"
              onClick={() => setActive(null)}
            />
            <div
              className="testimonial-modal"
              role="dialog"
              aria-modal="true"
              aria-label={`Testimonial from ${active.name}`}
            >
              <button
                className="testimonial-modal-close"
                type="button"
                aria-label="Close testimonial"
                onClick={() => setActive(null)}
              >
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M6 6 L18 18 M18 6 L6 18"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
              <p className="testimonial-modal-quote">&ldquo;{active.quote}&rdquo;</p>
              <p className="testimonial-modal-name">{active.name}</p>
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}
