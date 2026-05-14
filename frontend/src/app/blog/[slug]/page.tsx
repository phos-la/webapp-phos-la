import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity/client';
import { urlFor } from '@/lib/sanity/image';
import { allBlogSlugsQuery, blogPostBySlugQuery } from '@/lib/sanity/queries';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import RevealOnScroll from '@/components/RevealOnScroll';
import HeroParallaxImage from '@/components/HeroParallaxImage';
import { Markdown } from '@/components/Markdown';
import type { SanityImageSource } from '@sanity/image-url';
import '../blog.css';

export const revalidate = 300;

type BlogPostFull = {
  _id: string;
  title: string;
  slug: string;
  image?: SanityImageSource;
  imageAlt?: string;
  body?: string;
  fullBody?: string;
  author?: string;
  publishDate?: string;
  readMinutes?: number;
  metaTitle?: string;
  metaDescription?: string;
};

function formatDate(d?: string): string {
  if (!d) return '';
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(allBlogSlugsQuery).catch(() => []);
  return (slugs ?? []).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await client
    .fetch<BlogPostFull | null>(blogPostBySlugQuery, { slug })
    .catch(() => null);
  if (!post) return { title: 'Field Notes — Phos' };
  return {
    title: post.metaTitle?.trim() || `${post.title} — Field Notes — Phos`,
    description: post.metaDescription?.trim() || post.body || undefined,
  };
}

export default async function BlogSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await client
    .fetch<BlogPostFull | null>(blogPostBySlugQuery, { slug })
    .catch(() => null);
  if (!post) notFound();

  const heroImg = post.image
    ? urlFor(post.image).width(2400).quality(80).auto('format').url()
    : null;

  const dateLabel = formatDate(post.publishDate);
  const readLabel = post.readMinutes ? `${post.readMinutes} min read` : '';

  return (
    <div className="blog-page">
      <RevealOnScroll selectors={['[data-reveal]']} visibleClass="vis" />
      <Nav />
      <main>
        {/* HERO TITLE */}
        <section className="blog-hero">
          <div className="blog-hero-copy">
            <p className="blog-hero-eyebrow" data-reveal>
              Field Notes
            </p>
            <h1 className="hero-h1" data-reveal data-d="1">
              {post.title}
            </h1>
            {post.body && (
              <p className="hero-sub" data-reveal data-d="2">
                {post.body}
              </p>
            )}
            {(post.author || dateLabel || readLabel) && (
              <div className="blogpost-meta-row" data-reveal data-d="3">
                {post.author && <span>{post.author}</span>}
                {dateLabel && <span>{dateLabel}</span>}
                {readLabel && <span>{readLabel}</span>}
              </div>
            )}
          </div>
        </section>

        {/* HERO IMAGE — parallax to full bleed */}
        <HeroParallaxImage>
          <figure
            className="hero-image hero-image--simple"
            aria-label={post.imageAlt ?? post.title}
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
                <span>{post.title}</span>
              </div>
            )}
          </figure>
        </HeroParallaxImage>

        {/* BODY */}
        <section className="blogpost-body-wrap">
          <div className="blogpost-body">
            {post.fullBody ? (
              <Markdown content={post.fullBody} />
            ) : (
              <p>
                This note is still being written. Come back soon, or browse the rest of our{' '}
                <a href="/blog">Field Notes</a>.
              </p>
            )}
          </div>
          <p className="blogpost-back">
            <a href="/blog">← All field notes</a>
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
