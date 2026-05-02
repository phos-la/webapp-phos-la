import { client } from '@/lib/sanity/client';
import {
  heroSectionQuery,
  servicesSectionQuery,
  conditionsSectionQuery,
  providerSectionQuery,
  processSectionQuery,
  clinicSectionQuery,
  pricingCalloutQuery,
  pricingTiersQuery,
  testimonialsSectionQuery,
  testimonialsQuery,
  faqSectionQuery,
  faqsQuery,
  blogSectionQuery,
  blogPostsQuery,
  glimpsesSectionQuery,
  footerSectionQuery,
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

export const revalidate = 60;

export default async function Page() {
  const [
    heroData,
    servicesData,
    conditionsData,
    providerData,
    processData,
    clinicData,
    pricingCallout,
    pricingTiers,
    testimonialsSection,
    testimonialItems,
    faqSection,
    faqItems,
    blogSection,
    blogPosts,
    glimpsesData,
    footerData,
  ] = await Promise.all([
    client.fetch(heroSectionQuery),
    client.fetch(servicesSectionQuery),
    client.fetch(conditionsSectionQuery),
    client.fetch(providerSectionQuery),
    client.fetch(processSectionQuery),
    client.fetch(clinicSectionQuery),
    client.fetch(pricingCalloutQuery),
    client.fetch(pricingTiersQuery),
    client.fetch(testimonialsSectionQuery),
    client.fetch(testimonialsQuery),
    client.fetch(faqSectionQuery),
    client.fetch(faqsQuery),
    client.fetch(blogSectionQuery),
    client.fetch(blogPostsQuery),
    client.fetch(glimpsesSectionQuery),
    client.fetch(footerSectionQuery),
  ]);

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
        <Pricing data={{ callout: pricingCallout, tiers: pricingTiers }} />
        <Testimonials data={{ ...testimonialsSection, items: testimonialItems }} />
        <FAQ data={{ ...faqSection, items: faqItems }} />
        <BlogGrid data={{ ...blogSection, posts: blogPosts }} />
        <Glimpses data={glimpsesData} />
      </main>
      <Footer data={footerData} />
    </>
  );
}
