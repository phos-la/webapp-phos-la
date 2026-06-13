import type { MetadataRoute } from 'next';
import { groq } from 'next-sanity';
import { client } from '@/lib/sanity/client';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://phos.la';

export const dynamic = 'force-dynamic';

type SlugRow = { slug: string; _updatedAt?: string };

const allBlogSlugsForSitemap = groq`*[_type == "blogPost" && defined(slug.current)]{
  "slug": slug.current,
  _updatedAt
}`;

const allTreatmentSlugsForSitemap = groq`*[_type == "treatment" && defined(slug.current)]{
  "slug": slug.current,
  _updatedAt
}`;

function abs(path: string): string {
  if (path === '/') return BASE_URL;
  return `${BASE_URL}${path}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const [blogPosts, treatments] = await Promise.all([
    client.fetch<SlugRow[]>(allBlogSlugsForSitemap).catch(() => []),
    client.fetch<SlugRow[]>(allTreatmentSlugsForSitemap).catch(() => []),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: abs('/'), lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: abs('/about'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: abs('/treatments'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: abs('/pricing'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: abs('/blog'), lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: abs('/book'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: abs('/contact'), lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: abs('/flow'), lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: abs('/flow2'), lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];

  const treatmentRoutes: MetadataRoute.Sitemap = treatments.map((t) => ({
    url: abs(`/treatments/${t.slug}`),
    lastModified: t._updatedAt ? new Date(t._updatedAt) : now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: abs(`/blog/${p.slug}`),
    lastModified: p._updatedAt ? new Date(p._updatedAt) : now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...treatmentRoutes, ...blogRoutes];
}
