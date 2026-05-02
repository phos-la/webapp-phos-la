import { createClient } from 'next-sanity';

const isPreview =
  process.env.VERCEL_ENV === 'preview' ||
  process.env.VERCEL_ENV === 'development' ||
  (process.env.VERCEL_ENV === undefined && process.env.NODE_ENV === 'development');

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: false,
  perspective: isPreview ? 'previewDrafts' : 'published',
  token: isPreview ? process.env.SANITY_API_TOKEN : undefined,
});
