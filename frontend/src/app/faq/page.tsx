import type { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import { faqSectionQuery } from '@/lib/sanity/queries';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FAQ, { type FaqSectionData } from '@/components/FAQ';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'FAQ | Phos',
  description:
    'Common questions about IV ketamine therapy at Phos: candidacy, what a session is like, how many infusions you may need, and how insurance and pricing work.',
  alternates: { canonical: '/faq' },
};

export default async function FaqPage() {
  const faqData = await client
    .fetch<FaqSectionData | null>(
      faqSectionQuery,
      {},
      { cache: 'no-store' },
    )
    .catch(() => null);

  return (
    <>
      <Nav />
      <main>
        <FAQ data={{ ...faqData, items: faqData?.items ?? [] }} />
      </main>
      <Footer />
    </>
  );
}
