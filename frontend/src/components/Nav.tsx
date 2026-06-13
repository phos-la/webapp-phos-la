import Image from 'next/image';
import { client } from '@/lib/sanity/client';
import { urlFor } from '@/lib/sanity/image';
import { navSectionQuery } from '@/lib/sanity/queries';
import NavScrollEffect from './NavScrollEffect';
import NavLinks from './NavLinks';
import NavBurger from './NavBurger';

type NavItem = { label?: string; href?: string };
type NavData = {
  brandTitle?: string;
  brandSubtitle?: string;
  logo?: unknown;
  logoAlt?: string;
  items?: NavItem[];
  ctaLabel?: string;
  ctaHref?: string;
} | null;

// Target nav IA for the close-out. NOTE: Sanity's navSection already has its
// own items array, and that wins over this fallback (see `items` below). The
// live navSection.items list must match this order; this fallback only applies
// when Sanity returns no items. FAQ is intentionally not linked in the nav.
const DEFAULT_ITEMS: NavItem[] = [
  { label: 'Treatments', href: '/treatments' },
  { label: 'About', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Field Notes', href: '/blog' },
];

const LogoMark = () => (
  <svg className="nav-logo-mark" viewBox="0 0 200 200" fill="none" aria-hidden="true">
    <circle cx="100" cy="100" r="90" stroke="#80BCAC" strokeWidth="3" />
    <g stroke="#A8C8BC" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 92 L36 80 L48 86 L60 74 L72 86 L82 82 L92 92" />
      <path d="M108 92 L120 78 L132 86 L146 76 L160 86 L172 80 L182 90" />
      <path d="M44 110 L62 92 L74 100 L88 80 L100 60 L114 78 L126 92 L140 84 L156 100" />
    </g>
    <g stroke="#B88C50" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M100 142 C 92 124, 92 108, 100 92 C 108 108, 108 124, 100 142 Z" />
      <path d="M100 142 C 86 128, 80 112, 84 96 C 96 108, 102 124, 100 142 Z" />
      <path d="M100 142 C 114 128, 120 112, 116 96 C 104 108, 98 124, 100 142 Z" />
      <path d="M100 142 C 78 134, 66 120, 64 102 C 82 110, 96 124, 100 142 Z" />
      <path d="M100 142 C 122 134, 134 120, 136 102 C 118 110, 104 124, 100 142 Z" />
      <path d="M100 142 C 72 142, 54 134, 46 118 C 70 118, 90 128, 100 142 Z" />
      <path d="M100 142 C 128 142, 146 134, 154 118 C 130 118, 110 128, 100 142 Z" />
      <path d="M100 142 C 70 148, 46 144, 32 132 C 58 130, 84 134, 100 142 Z" />
      <path d="M100 142 C 130 148, 154 144, 168 132 C 142 130, 116 134, 100 142 Z" />
    </g>
    <g stroke="#358C7A" strokeWidth="3" fill="none" strokeLinecap="round">
      <path d="M40 154 Q 60 148, 80 154 T 120 154 T 160 154" />
      <path d="M44 164 Q 64 158, 84 164 T 124 164 T 162 164" />
      <path d="M48 174 Q 68 168, 88 174 T 128 174 T 158 174" />
    </g>
  </svg>
);

export default async function Nav() {
  const data = await client
    .fetch<NavData>(navSectionQuery, {}, { cache: 'no-store' })
    .catch(() => null);
  const brandTitle = data?.brandTitle ?? 'PHOS';
  const brandSubtitle = data?.brandSubtitle ?? 'Wellness';
  const items = data?.items?.length ? data.items : DEFAULT_ITEMS;
  const ctaLabel = data?.ctaLabel ?? 'Book a consultation';
  const ctaHref = data?.ctaHref ?? '/book';
  const logoUrl = data?.logo
    ? urlFor(data.logo as never)
        .width(140)
        .height(140)
        .url()
    : null;
  const logoAlt = data?.logoAlt ?? `${brandTitle} ${brandSubtitle}`;

  return (
    <div className="nav-wrap" role="presentation">
      <NavScrollEffect />
      <nav className="nav-pill" id="navBar" aria-label="Primary">
        <a className="nav-logo" href="/" aria-label={`${brandTitle} ${brandSubtitle} — home`}>
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={logoAlt}
              width={108}
              height={108}
              className="nav-logo-mark"
              priority
            />
          ) : (
            <LogoMark />
          )}
          <span className="nav-logo-text">
            <span className="nav-logo-word">{brandTitle}</span>
            <span className="nav-logo-sub">{brandSubtitle}</span>
          </span>
        </a>

        <NavLinks items={items} />

        <a className="nav-cta" href={ctaHref}>
          {ctaLabel}
        </a>

        <NavBurger items={items} ctaLabel={ctaLabel} ctaHref={ctaHref} />
      </nav>
    </div>
  );
}
