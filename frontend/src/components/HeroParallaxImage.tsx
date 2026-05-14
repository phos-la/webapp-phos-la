'use client';

import { useEffect, useRef } from 'react';

/**
 * Wraps a hero image element in the same scroll-driven parallax stage the
 * homepage Hero uses. As the user scrolls through the 200vh stage, the
 * `--p` CSS variable runs 0→1 on the inner `.hero-image` element, which
 * CSS uses to interpolate the image from a contained card to full-bleed.
 *
 * The inner element MUST carry the `.hero-image` class so the existing
 * globals.css rules apply. Page-specific tweaks (gradient bg, caption,
 * placeholder copy) layer on top via additional classes / inline style.
 */
export default function HeroParallaxImage({ children }: { children: React.ReactNode }) {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const image = stage.querySelector<HTMLElement>('.hero-image');
    if (!image) return;

    const update = () => {
      const r = stage.getBoundingClientRect();
      const total = stage.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.max(0, Math.min(1, -r.top / total)) : 0;
      image.style.setProperty('--p', String(p));
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div className="hero-parallax" ref={stageRef}>
      <div className="hero-parallax-pin">{children}</div>
    </div>
  );
}
