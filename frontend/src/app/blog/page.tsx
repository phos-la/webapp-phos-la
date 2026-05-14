import { client } from '@/lib/sanity/client';
import { urlFor } from '@/lib/sanity/image';
import { allBlogPostsQuery, blogIndexPageQuery } from '@/lib/sanity/queries';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import RevealOnScroll from '@/components/RevealOnScroll';
import HeroParallaxImage from '@/components/HeroParallaxImage';
import type { SanityImageSource } from '@sanity/image-url';
import './blog.css';

export const revalidate = 300;

export const metadata = {
  title: 'Field Notes — Phos',
  description:
    'Notes from the clinic on ketamine treatment, integration, and the science behind it.',
};

type PostCard = {
  _id: string;
  title: string;
  slug: string;
  image?: SanityImageSource;
  imageAlt?: string;
  body?: string;
  author?: string;
  publishDate?: string;
  readMinutes?: number;
};

type IndexData = {
  heroEyebrow?: string;
  heroHeadline?: string;
  heroSubheading?: string;
  heroImage?: SanityImageSource;
  heroImageCaption?: string;
  emptyHeadline?: string;
  emptyBody?: string;
  featuredPost?: PostCard;
};

const DEFAULTS = {
  heroEyebrow: 'Field Notes',
  heroHeadline: 'Field Notes',
  heroSubheading:
    'Notes from the clinic on ketamine treatment, integration, and the science behind it.',
  heroImageCaption: '',
  emptyHeadline: 'New notes coming soon.',
  emptyBody: 'Katie and Christa are working on the first batch. Check back in a couple weeks.',
};

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1545389336-cf090694435e?w=900&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=80&auto=format&fit=crop',
];

function formatDate(d?: string): string {
  if (!d) return '';
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function cardImage(post: PostCard, fallbackIdx: number): string {
  if (post.image) {
    return urlFor(post.image).width(900).quality(80).auto('format').url();
  }
  return FALLBACK_IMAGES[fallbackIdx % FALLBACK_IMAGES.length] ?? FALLBACK_IMAGES[0]!;
}

export default async function BlogIndexPage() {
  const [indexData, postsData] = await Promise.all([
    client.fetch<IndexData | null>(blogIndexPageQuery).catch(() => null),
    client.fetch<PostCard[]>(allBlogPostsQuery).catch(() => []),
  ]);

  const heroEyebrow = indexData?.heroEyebrow?.trim() || DEFAULTS.heroEyebrow;
  const heroHeadline = indexData?.heroHeadline?.trim() || DEFAULTS.heroHeadline;
  const heroSubheading = indexData?.heroSubheading?.trim() || DEFAULTS.heroSubheading;
  const heroCaption = indexData?.heroImageCaption?.trim() || DEFAULTS.heroImageCaption;
  const heroImg = indexData?.heroImage
    ? urlFor(indexData.heroImage).width(2400).quality(80).auto('format').url()
    : null;

  const emptyHeadline = indexData?.emptyHeadline?.trim() || DEFAULTS.emptyHeadline;
  const emptyBody = indexData?.emptyBody?.trim() || DEFAULTS.emptyBody;

  const featured = indexData?.featuredPost ?? null;
  const featuredId = featured?._id;

  // Posts grid excludes the featured post so it doesn't appear twice.
  const gridPosts = (postsData ?? []).filter((p) => p._id !== featuredId);

  return (
    <div className="blog-page">
      <RevealOnScroll selectors={['[data-reveal]']} visibleClass="vis" />
      <Nav />
      <main>
        {/* HERO TITLE */}
        <section className="blog-hero">
          <div className="blog-hero-copy">
            <p className="blog-hero-eyebrow" data-reveal>
              {heroEyebrow}
            </p>
            <h1 className="hero-h1" data-reveal data-d="1">
              {heroHeadline}
            </h1>
            <p className="hero-sub" data-reveal data-d="2">
              {heroSubheading}
            </p>
          </div>
        </section>

        {/* HERO PARALLAX IMAGE */}
        <HeroParallaxImage>
          <figure
            className="hero-image hero-image--simple"
            aria-label="Field Notes hero photo"
            style={heroImg ? { background: `url(${heroImg}) center/cover no-repeat` } : undefined}
          >
            {!heroImg && (
              <div className="hero-image--placeholder">
                <svg width="56" height="56" viewBox="0 0 200 200" fill="none" aria-hidden="true">
                  <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="2.5" />
                  <path
                    d="M60 130 Q 80 100 100 110 Q 120 120 140 90"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
                <span>Field Notes hero photo</span>
              </div>
            )}
            {heroCaption && <figcaption className="hero-image-caption">{heroCaption}</figcaption>}
          </figure>
        </HeroParallaxImage>

        {/* FEATURED POST */}
        {featured && (
          <section className="blog-featured-wrap">
            <article className="blog-featured" data-reveal>
              <div className="blog-featured-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={cardImage(featured, 0)} alt={featured.imageAlt ?? ''} loading="eager" />
              </div>
              <div className="blog-featured-text">
                <p className="blog-featured-eyebrow">Featured</p>
                <h2 className="blog-featured-title">{featured.title}</h2>
                {featured.body && <p className="blog-featured-body">{featured.body}</p>}
                {(featured.author || featured.publishDate || featured.readMinutes) && (
                  <p className="blog-featured-meta">
                    {[
                      featured.author,
                      formatDate(featured.publishDate),
                      featured.readMinutes ? `${featured.readMinutes} min read` : null,
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                )}
                <a className="blog-featured-read" href={`/blog/${featured.slug}`}>
                  Read the note →
                </a>
              </div>
            </article>
          </section>
        )}

        {/* GRID */}
        <section className="blog-grid-wrap">
          <div className="blog-grid-inner">
            {gridPosts.length > 0 && (
              <header className="blog-grid-head">
                <h2 className="blog-grid-title">{featured ? 'More notes' : 'All notes'}</h2>
                <span className="blog-grid-count">
                  {gridPosts.length} {gridPosts.length === 1 ? 'note' : 'notes'}
                </span>
              </header>
            )}
            {gridPosts.length === 0 && !featured ? (
              <div className="blog-empty">
                <h2 className="blog-empty-title">{emptyHeadline}</h2>
                <p className="blog-empty-body">{emptyBody}</p>
              </div>
            ) : (
              <div className="blog-grid-list">
                {gridPosts.map((post, i) => (
                  <a key={post._id} href={`/blog/${post.slug}`} className="blog-card" data-reveal>
                    <div className="blog-card-photo">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={cardImage(post, i + 1)} alt={post.imageAlt ?? ''} loading="lazy" />
                    </div>
                    <div className="blog-card-body">
                      {(post.author || post.publishDate) && (
                        <p className="blog-card-meta">
                          {[post.author, formatDate(post.publishDate)].filter(Boolean).join(' · ')}
                        </p>
                      )}
                      <h3 className="blog-card-title">{post.title}</h3>
                      {post.body && <p className="blog-card-excerpt">{post.body}</p>}
                      <span className="blog-card-read">Read →</span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
