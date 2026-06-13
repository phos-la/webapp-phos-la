/**
 * Shared cover-image resolution for Field Notes.
 *
 * A post's image must look identical on the index card and on the post hero,
 * so both call resolveBlogImage with the same inputs. When the post has a real
 * Sanity cover image we use it. When it does not, we fall back to a stock photo
 * chosen deterministically from the slug, so the card and the spoke page land
 * on the exact same fallback rather than drifting apart.
 */
import { urlFor } from '@/lib/sanity/image';
import type { SanityImageSource } from '@sanity/image-url';

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1448375240586-882707db888b',
  'https://images.unsplash.com/photo-1545389336-cf090694435e',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
];

/** Stable index from a slug so a given post always maps to the same fallback. */
function fallbackIndex(slug: string): number {
  let sum = 0;
  for (let i = 0; i < slug.length; i += 1) sum += slug.charCodeAt(i);
  return sum % FALLBACK_IMAGES.length;
}

function fallbackUrl(slug: string, width: number): string {
  const base = FALLBACK_IMAGES[fallbackIndex(slug)] ?? FALLBACK_IMAGES[0]!;
  return `${base}?w=${width}&q=80&auto=format&fit=crop`;
}

/**
 * Resolve the cover image for a post. Real Sanity image wins; otherwise a
 * deterministic stock fallback keyed off the slug. width drives both the
 * Sanity transform and the stock query so cards request small, heroes large.
 */
export function resolveBlogImage(
  image: SanityImageSource | undefined,
  slug: string,
  width: number,
): string {
  if (image) {
    return urlFor(image).width(width).quality(80).auto('format').url();
  }
  return fallbackUrl(slug, width);
}
