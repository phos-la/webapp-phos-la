'use client';

import { useEffect, useRef } from 'react';
import { urlFor } from '@/lib/sanity/image';
import type { SanityImageSource } from '@sanity/image-url';

export interface GlimpsesSectionData {
  label?: string;
  heading?: string;
  subheading?: string;
  instagramHandle?: string;
  instagramUrl?: string;
  row1Images?: SanityImageSource[];
  row2Images?: SanityImageSource[];
}

const FALLBACK_ROW1 = [
  'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1511497584788-876760111969?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1486520299386-6d106b22014b?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1473773508845-188df298d2d1?w=600&q=80&auto=format&fit=crop',
];

const FALLBACK_ROW2 = [
  'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=600&q=80&auto=format&fit=crop&sat=-25',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1504198266287-1659872e6590?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80&auto=format&fit=crop&sat=-15',
  'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&q=80&auto=format&fit=crop&sat=-10',
  'https://images.unsplash.com/photo-1486520299386-6d106b22014b?w=600&q=80&auto=format&fit=crop&sat=-10',
  'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80&auto=format&fit=crop&sat=-10',
];

export default function Glimpses({ data }: { data?: GlimpsesSectionData }) {
  const label = data?.label ?? 'Instagram';
  const heading = data?.heading ?? 'Glimpses of the Journey';
  const subheading =
    data?.subheading ?? 'Follow for a look into daily life in the forest and the practice.';
  const instagramHandle = data?.instagramHandle ?? '@Forest.Therapy';
  const instagramUrl = data?.instagramUrl ?? '#instagram';

  const row1Srcs = data?.row1Images?.length
    ? data.row1Images.map((img) => urlFor(img).width(600).quality(80).auto('format').url())
    : FALLBACK_ROW1;
  const row2Srcs = data?.row2Images?.length
    ? data.row2Images.map((img) => urlFor(img).width(600).quality(80).auto('format').url())
    : FALLBACK_ROW2;

  const wrapRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const rows = [row1Ref.current, row2Ref.current];
    if (!wrap || rows.some((r) => !r)) return;

    const RANGE = 140;

    rows.forEach((row) => {
      if (!row) return;
      const original = Array.from(row.children);
      for (let i = 0; i < 2; i++) {
        original.forEach((child) => row.appendChild(child.cloneNode(true)));
      }
    });

    const segmentWidths = [0, 0];
    const measure = () => {
      rows.forEach((row, i) => {
        if (!row) return;
        segmentWidths[i] = row.scrollWidth / 3;
      });
    };

    let raf = 0;

    const update = () => {
      raf = 0;
      const r = wrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const footer = document.querySelector('.site-footer');
      const tail = footer ? (footer as HTMLElement).offsetHeight : 0;
      const span = vh + wrap.offsetHeight + tail;
      const p = Math.max(0, Math.min(1, (vh - r.top) / span));
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;

      rows.forEach((row, i) => {
        if (!row) return;
        const dir = row.dataset.dir === 'right' ? 1 : -1;
        const ambient = scrollY * 0.18 * dir;
        const t = (p - 0.5) * 2;
        const burst = t * dir * RANGE;
        let x = ambient + burst;
        const sw = segmentWidths[i];
        if (sw > 0) {
          x = ((x % sw) + sw) % sw;
          x = x - sw;
        }
        row.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`;
      });
    };

    window.addEventListener('load', () => {
      measure();
      update();
    });

    measure();

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section className="glimpses" data-screen-label="13 Glimpses">
      <span className="label-pill">{label}</span>
      <h2 className="glimpses-title">{heading}</h2>
      <p className="glimpses-sub">{subheading}</p>
      <a className="glimpses-handle" href={instagramUrl}>
        {instagramHandle}
      </a>
      <div className="glimpses-rows" id="glimpsesRows" ref={wrapRef}>
        <div className="glimpses-row" data-dir="left" ref={row1Ref}>
          {row1Srcs.map((src, i) => (
            <div className="glimpses-cell" key={i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading="lazy" />
            </div>
          ))}
        </div>
        <div className="glimpses-row" data-dir="right" ref={row2Ref}>
          {row2Srcs.map((src, i) => (
            <div className="glimpses-cell" key={i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
