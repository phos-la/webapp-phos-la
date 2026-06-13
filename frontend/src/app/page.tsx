import { client } from '@/lib/sanity/client';
import {
  heroSectionQuery,
  servicesSectionQuery,
  conditionsSectionQuery,
  providerSectionQuery,
  processSectionQuery,
  clinicSectionQuery,
  testimonialsSectionQuery,
  blogSectionQuery,
  glimpsesSectionQuery,
} from '@/lib/sanity/queries';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import ServiceCards from '@/components/ServiceCards';
import BenefitPills from '@/components/BenefitPills';
import ProviderCard from '@/components/ProviderCard';
import ProcessSteps from '@/components/ProcessSteps';
import TheSpace from '@/components/TheSpace';
import Testimonials from '@/components/Testimonials';
import BlogGrid from '@/components/BlogGrid';
import Glimpses from '@/components/Glimpses';
import Footer from '@/components/Footer';

// Sanity content is read live on every request (no Next.js data cache), so
// edits in Studio show up immediately with no stale window.
export const dynamic = 'force-dynamic';

const sanityFetch = (query: string) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client.fetch<any>(query, {}, { cache: 'no-store' });

export default async function Page() {
  const [
    heroData,
    servicesData,
    conditionsData,
    providerData,
    processData,
    clinicData,
    testimonialsData,
    blogData,
    glimpsesData,
  ] = await Promise.all([
    sanityFetch(heroSectionQuery),
    sanityFetch(servicesSectionQuery),
    sanityFetch(conditionsSectionQuery),
    sanityFetch(providerSectionQuery),
    sanityFetch(processSectionQuery),
    sanityFetch(clinicSectionQuery),
    sanityFetch(testimonialsSectionQuery),
    sanityFetch(blogSectionQuery),
    sanityFetch(glimpsesSectionQuery),
  ]);

  // Pricing lives entirely on its own /pricing page; the homepage no longer
  // surfaces a pricing section or hint band.
  return (
    <>
      <Nav />
      <main>
        <Hero data={heroData} />
        <ServiceCards data={servicesData} />
        <BenefitPills data={conditionsData} />
        <ProviderCard data={providerData} />
        <ProcessSteps data={processData} />
        <TheSpace data={clinicData} />
        <Testimonials data={{ ...testimonialsData, items: testimonialsData?.items ?? [] }} />
        <BlogGrid
          data={{
            ...blogData,
            posts: (blogData?.posts ?? []).filter((p: unknown) => p !== null && p !== undefined),
          }}
        />
        <Glimpses data={glimpsesData} />
      </main>
      <Footer />
    </>
  );
}
