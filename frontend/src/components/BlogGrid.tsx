import { urlFor } from '@/lib/sanity/image';
import type { SanityImageSource } from '@sanity/image-url';

export interface BlogPostItem {
  _id?: string;
  image?: SanityImageSource;
  imageAlt?: string;
  title: string;
  body: string;
  slug?: { current: string };
}

export interface BlogSectionData {
  label?: string;
  heading?: string;
  cardCtaLabel?: string;
  posts?: BlogPostItem[];
}

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1545389336-cf090694435e?w=900&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=80&auto=format&fit=crop',
];

export default function BlogGrid({ data }: { data?: BlogSectionData }) {
  const label = data?.label?.trim() || 'Field Notes';
  const heading = data?.heading?.trim() || 'Field Notes';
  const cardCtaLabel = data?.cardCtaLabel?.trim() || 'Read →';
  const posts = data?.posts ?? [];

  // If there are no posts in Sanity, render nothing rather than fake content.
  // Editors pick posts under Home Page → Field Notes in the studio.
  if (posts.length === 0) return null;

  return (
    <section className="section" data-screen-label="12 Blog">
      <div className="section-inner">
        <div className="section-head">
          <span className="label-pill">{label}</span>
          <h2 className="section-title">{heading}</h2>
        </div>
        <div className="blog-grid">
          {posts.map((post, i) => {
            const imgSrc = post.image
              ? urlFor(post.image).width(900).quality(80).auto('format').url()
              : FALLBACK_IMAGES[i % FALLBACK_IMAGES.length];
            const href = post.slug?.current ? `/blog/${post.slug.current}` : '/blog';

            return (
              <article className="blog-card" key={post._id ?? post.title}>
                <div className="blog-card-photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imgSrc} alt={post.imageAlt ?? ''} loading="lazy" />
                </div>
                <h3 className="blog-card-title">{post.title}</h3>
                <p className="blog-card-body">{post.body}</p>
                <a className="blog-card-read" href={href}>
                  {cardCtaLabel}
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
