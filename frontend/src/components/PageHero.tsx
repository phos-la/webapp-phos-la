import type { ReactNode } from 'react';

/**
 * The single page hero used at the top of every inner page (Treatments, About,
 * Pricing, Field Notes hub + post). One component, one set of styles, so the
 * title size, weight, top offset, and centering are identical across the board.
 * Page-specific extras (a post's lede + byline) come in as children.
 */
export default function PageHero({
  title,
  subheading,
  children,
}: {
  title: string;
  subheading?: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero" data-screen-label="01 Hero">
      <div className="page-hero-copy">
        <h1 className="page-hero-title">{title}</h1>
        {subheading && <p className="page-hero-sub">{subheading}</p>}
        {children}
      </div>
    </section>
  );
}
