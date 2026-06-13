import Link from 'next/link';
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

// Fallback in case the Sanity webhook ever fails to fire; publish events
// normally invalidate the 'sanity' tag instantly via /api/revalidate.
export const dynamic = 'force-dynamic';

const sanityFetch = (query: string) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  client.fetch<any>(query, {}, { next: { tags: ['sanity'], revalidate: 300 } });

export default async function Page() {
  const [
    heroData,
    servicesData,
    conditionsData,
    providerData,
    processData,
    clinicData,
    pricingData,
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
    sanityFetch(pricingSectionQuery),
    sanityFetch(testimonialsSectionQuery),
    sanityFetch(blogSectionQuery),
    sanityFetch(glimpsesSectionQuery),
  ]);

  // Homepage only hints at pricing; the full tier grid lives on /pricing.
  const pricingLabel = pricingData?.label ?? 'Pricing';
  const pricingHeading = pricingData?.heading ?? 'Membership pricing, published openly';
  const pricingSub =
    pricingData?.subheading ??
    'Our membership rate is $400 per infusion, the lowest published in Los Angeles, with single-session and at-home options. Every session includes a PA consultation before and after.';

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
        <section className="section" id="pricing-hint">
          <div className="section-inner">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="label-pill">{pricingLabel}</span>
              <h2 className="section-title">{pricingHeading}</h2>
              <p className="section-sub">{pricingSub}</p>
              <Link href="/pricing" className="hero-cta">
                See full pricing
                <span className="hero-cta-arrow" aria-hidden="true">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>
        </section>
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
