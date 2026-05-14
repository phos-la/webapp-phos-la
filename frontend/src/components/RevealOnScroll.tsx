'use client';

import { useEffect } from 'react';

/**
 * Wires up IntersectionObserver-based scroll reveals for the marketing
 * page routes ported from the Claude Design HTML prototypes. Each page
 * passes the selectors it cares about; we add `is-visible` (or `vis` for
 * About's `[data-reveal]` selector) when the element enters the viewport.
 */
export default function RevealOnScroll({
  selectors,
  visibleClass = 'is-visible',
  rootMargin = '0px 0px -32px 0px',
  threshold = 0.1,
}: {
  selectors: string[];
  visibleClass?: string;
  rootMargin?: string;
  threshold?: number;
}) {
  useEffect(() => {
    const els = selectors.flatMap((sel) => Array.from(document.querySelectorAll<HTMLElement>(sel)));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const delay = Number(el.dataset.delay ?? 0);
            if (delay > 0) {
              window.setTimeout(() => el.classList.add(visibleClass), delay);
            } else {
              el.classList.add(visibleClass);
            }
            io.unobserve(el);
          }
        }
      },
      { rootMargin, threshold },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [selectors, visibleClass, rootMargin, threshold]);

  return null;
}
