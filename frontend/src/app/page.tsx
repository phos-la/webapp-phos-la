import { client } from '@/lib/sanity/client';
import {
  heroSectionQuery,
  servicesSectionQuery,
  conditionsSectionQuery,
  providerSectionQuery,
  processSectionQuery,
  clinicSectionQuery,
  pricingSectionQuery,
  testimonialsSectionQuery,
  faqSectionQuery,
  blogSectionQuery,
  glimpsesSectionQuery,
  footerSectionQuery,
  navSectionQuery,
} from '@/lib/sanity/queries';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import ServiceCards from '@/components/ServiceCards';
import BenefitPills from '@/components/BenefitPills';
import ProviderCard from '@/components/ProviderCard';
import ProcessSteps from '@/components/ProcessSteps';
import TheSpace from '@/components/TheSpace';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import BlogGrid from '@/components/BlogGrid';
import Glimpses from '@/components/Glimpses';
import Footer from '@/components/Footer';

// Fallback in case the Sanity webhook ever fails to fire; publish events
// normally invalidate the 'sanity' tag instantly via /api/revalidate.
export const dynamic = 'force-dynamic';

const sanityFetch = (query: string) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client.fetch<any>(query, {}, { next: { tags: ['sanity'], revalidate: 300 } });

export default async function Page() {
  const [
    navData,
    heroData,
    servicesData,
    conditionsData,
    providerData,
    processData,
    clinicData,
    pricingData,
    testimonialsData,
    faqData,
    blogData,
    glimpsesData,
    footerData,
  ] = await Promise.all([
    sanityFetch(navSectionQuery),
    sanityFetch(heroSectionQuery),
    sanityFetch(servicesSectionQuery),
    sanityFetch(conditionsSectionQuery),
    sanityFetch(providerSectionQuery),
    sanityFetch(processSectionQuery),
    sanityFetch(clinicSectionQuery),
    sanityFetch(pricingSectionQuery),
    sanityFetch(testimonialsSectionQuery),
    sanityFetch(faqSectionQuery),
    sanityFetch(blogSectionQuery),
    sanityFetch(glimpsesSectionQuery),
    sanityFetch(footerSectionQuery),
  ]);

  return (
    <>
      <Nav data={navData} />
      <main>
        <Hero data={heroData} />
        <ServiceCards data={servicesData} />
        <BenefitPills data={conditionsData} />
        <ProviderCard data={providerData} />
        <ProcessSteps data={processData} />
        <TheSpace data={clinicData} />
        <Pricing
          data={{
            callout: pricingData,
            tiers: pricingData?.tiers ?? [],
          }}
        />
        <Testimonials data={{ ...testimonialsData, items: testimonialsData?.items ?? [] }} />
        <FAQ data={{ ...faqData, items: faqData?.items ?? [] }} />
        <BlogGrid data={{ ...blogData, posts: blogData?.posts ?? [] }} />
        <Glimpses data={glimpsesData} />
      </main>
      <Footer data={footerData} />
    </>
  );
}
