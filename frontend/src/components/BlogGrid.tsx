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
  posts?: BlogPostItem[];
}

const DEFAULT_POSTS: BlogPostItem[] = [
  {
    title: 'Light through trees',
    body: 'A quiet walk through morning light. The forest breathing with you - slow, soft, alive.',
    slug: { current: 'blog-1' },
    imageAlt: 'Sunlight through pine trees',
  },
  {
    title: 'Hands and presence',
    body: "Inside a session: soft touch, and the safety to feel what's ready to unfold.",
    slug: { current: 'blog-2' },
    imageAlt: 'Hands giving a healing touch',
  },
  {
    title: 'Night in the Wild',
    body: 'How the forest shifts at night and what it teaches us about stillness.',
    slug: { current: 'blog-3' },
    imageAlt: 'Forest at twilight',
  },
];

const DEFAULT_FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1545389336-cf090694435e?w=900&q=80&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=80&auto=format&fit=crop',
];

export default function BlogGrid({ data }: { data?: BlogSectionData }) {
  const label = data?.label ?? 'Our Blog';
  const heading = data?.heading ?? 'Forest Stories';
  const posts = data?.posts?.length ? data.posts : DEFAULT_POSTS;

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
              : DEFAULT_FALLBACK_IMAGES[i % DEFAULT_FALLBACK_IMAGES.length];
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
                  Read
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
