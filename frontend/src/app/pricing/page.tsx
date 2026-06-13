import type { Metadata } from 'next';
import { client } from '@/lib/sanity/client';
import { pricingSectionQuery } from '@/lib/sanity/queries';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Pricing, { type PricingCalloutData, type PricingTier } from '@/components/Pricing';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Pricing | Phos',
  description:
    'IV ketamine pricing at Phos. A $400 per session membership rate, the lowest published in Los Angeles, alongside single infusion and at-home program options. Every session includes PA consultation before and after.',
  alternates: { canonical: '/pricing' },
};

type PricingDoc = (PricingCalloutData & { tiers?: PricingTier[] }) | null;

export default async function PricingPage() {
  const pricingData = await client
    .fetch<PricingDoc>(pricingSectionQuery, {}, { next: { tags: ['sanity'], revalidate: 300 } })
    .catch(() => null);

  return (
    <>
      <Nav />
      <main>
        <Pricing data={{ callout: pricingData ?? undefined, tiers: pricingData?.tiers ?? [] }} />
      </main>
      <Footer />
    </>
  );
}
