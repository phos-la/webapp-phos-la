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

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ServiceCards />
        <BenefitPills />
        <ProviderCard />
        <ProcessSteps />
        <TheSpace />
        <Pricing />
        <Testimonials />
        <FAQ />
        <BlogGrid />
        <Glimpses />
      </main>
      <Footer />
    </>
  );
}
