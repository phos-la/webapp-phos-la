import { notFound } from 'next/navigation';
import { client } from '@/lib/sanity/client';
import { resolveBlogImage } from '@/lib/blogFallbackImage';
import { allBlogSlugsQuery, blogPostBySlugQuery, blogPostPageQuery } from '@/lib/sanity/queries';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import RevealOnScroll from '@/components/RevealOnScroll';
import HeroParallaxImage from '@/components/HeroParallaxImage';
import PageHero from '@/components/PageHero';
import { BlogPortableText } from '@/components/BlogPortableText';
import type { Metadata } from 'next';
import type { SanityImageSource } from '@sanity/image-url';
import type { PortableTextBlock } from '@portabletext/types';
import '../blog.css';

export const dynamic = 'force-dynamic';

type BlogPostFull = {
  _id: string;
  title: string;
  slug: string;
  image?: SanityImageSource;
  imageAlt?: string;
  body?: string;
  fullBody?: PortableTextBlock[];
  author?: string;
  publishDate?: string;
  readMinutes?: number;
  metaTitle?: string;
  metaDescription?: string;
};

type BlogPostPageLayout = {
  eyebrowLabel?: string;
  readMinutesSuffix?: string;
  backLinkLabel?: string;
  backLinkHref?: string;
  placeholderBody?: string;
  placeholderLinkLabel?: string;
  metaTitleSuffix?: string;
  metaTitleSeparator?: string;
  fallbackMetaTitle?: string;
};

const LAYOUT_DEFAULTS: Required<BlogPostPageLayout> = {
  eyebrowLabel: 'Field Notes',
  readMinutesSuffix: 'min read',
  backLinkLabel: '← All field notes',
  backLinkHref: '/blog',
  placeholderBody:
    'This note is still being written. Come back soon, or browse the rest of our Field Notes.',
  placeholderLinkLabel: 'Field Notes',
  metaTitleSuffix: 'Field Notes — Phos',
  metaTitleSeparator: ' — ',
  fallbackMetaTitle: 'Field Notes — Phos',
};

function mergeLayout(c: BlogPostPageLayout | null): Required<BlogPostPageLayout> {
  return {
    eyebrowLabel: c?.eyebrowLabel?.trim() || LAYOUT_DEFAULTS.eyebrowLabel,
    readMinutesSuffix: c?.readMinutesSuffix?.trim() || LAYOUT_DEFAULTS.readMinutesSuffix,
    backLinkLabel: c?.backLinkLabel?.trim() || LAYOUT_DEFAULTS.backLinkLabel,
    backLinkHref: c?.backLinkHref?.trim() || LAYOUT_DEFAULTS.backLinkHref,
    placeholderBody: c?.placeholderBody?.trim() || LAYOUT_DEFAULTS.placeholderBody,
    placeholderLinkLabel: c?.placeholderLinkLabel?.trim() || LAYOUT_DEFAULTS.placeholderLinkLabel,
    metaTitleSuffix: c?.metaTitleSuffix?.trim() || LAYOUT_DEFAULTS.metaTitleSuffix,
    metaTitleSeparator: c?.metaTitleSeparator ?? LAYOUT_DEFAULTS.metaTitleSeparator,
    fallbackMetaTitle: c?.fallbackMetaTitle?.trim() || LAYOUT_DEFAULTS.fallbackMetaTitle,
  };
}

function formatDate(d?: string): string {
  if (!d) return '';
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/**
 * Render the placeholder body with the link substituted in for {link}.
 * Editors can rewrite the copy in Sanity and decide where the link sits.
 */
function PlaceholderBody({
  template,
  linkLabel,
  href,
}: {
  template: string;
  linkLabel: string;
  href: string;
}) {
  // Try to match the editor-provided linkLabel inside the template and turn it
  // into an anchor. Fall back to "<text>. <linkLabel link>" if not found.
  const idx = template.indexOf(linkLabel);
  if (idx >= 0) {
    const before = template.slice(0, idx);
    const after = template.slice(idx + linkLabel.length);
    return (
      <p>
        {before}
        <a href={href}>{linkLabel}</a>
        {after}
      </p>
    );
  }
  return (
    <p>
      {template} <a href={href}>{linkLabel}</a>
    </p>
  );
}

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(allBlogSlugsQuery).catch(() => []);
  return (slugs ?? []).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const [post, layoutRaw] = await Promise.all([
    client.fetch<BlogPostFull | null>(blogPostBySlugQuery, { slug }).catch(() => null),
    client.fetch<BlogPostPageLayout | null>(blogPostPageQuery).catch(() => null),
  ]);
  const layout = mergeLayout(layoutRaw);
  if (!post) return { title: layout.fallbackMetaTitle };
  return {
    title:
      post.metaTitle?.trim() ||
      `${post.title}${layout.metaTitleSeparator}${layout.metaTitleSuffix}`,
    description: post.metaDescription?.trim() || post.body || undefined,
  };
}

export default async function BlogSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, layoutRaw] = await Promise.all([
    client.fetch<BlogPostFull | null>(blogPostBySlugQuery, { slug }).catch(() => null),
    client.fetch<BlogPostPageLayout | null>(blogPostPageQuery).catch(() => null),
  ]);
  if (!post) notFound();
  const layout = mergeLayout(layoutRaw);

  const heroImg = resolveBlogImage(post.image, post.slug, 2400);

  const dateLabel = formatDate(post.publishDate);
  const readLabel = post.readMinutes ? `${post.readMinutes} ${layout.readMinutesSuffix}` : '';

  return (
    <div className="blog-page">
      <RevealOnScroll selectors={['[data-reveal]']} visibleClass="vis" />
      <Nav />
      <main>
        {/* HERO TITLE */}
        <PageHero title={post.title}>
          {post.body && <p className="blogpost-lede">{post.body}</p>}
          {(post.author || dateLabel || readLabel) && (
            <div className="blogpost-meta-row">
              {post.author && <span>{post.author}</span>}
              {dateLabel && <span>{dateLabel}</span>}
              {readLabel && <span>{readLabel}</span>}
            </div>
          )}
        </PageHero>

        {/* HERO IMAGE — parallax to full bleed */}
        <HeroParallaxImage>
          <figure
            className="hero-image hero-image--simple"
            aria-label={post.imageAlt ?? post.title}
            style={{ background: `url(${heroImg}) center/cover no-repeat` }}
          />
        </HeroParallaxImage>

        {/* BODY */}
        <section className="blogpost-body-wrap">
          <div className="blogpost-body">
            {post.fullBody && post.fullBody.length > 0 ? (
              <BlogPortableText value={post.fullBody} />
            ) : (
              <PlaceholderBody
                template={layout.placeholderBody}
                linkLabel={layout.placeholderLinkLabel}
                href={layout.backLinkHref}
              />
            )}
          </div>
          <p className="blogpost-back">
            <a href={layout.backLinkHref}>{layout.backLinkLabel}</a>
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
