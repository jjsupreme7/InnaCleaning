import HeroSection from '@/components/home/HeroSection';
import IntroSection from '@/components/home/IntroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import ServicesPreview from '@/components/home/ServicesPreview';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ServiceAreaSection from '@/components/home/ServiceAreaSection';
import CTABanner from '@/components/home/CTABanner';

export default function Home() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <FeaturesSection />
      <ServicesPreview />
      <TestimonialsSection />
      <ServiceAreaSection />
      <CTABanner />
    </>
  );
}
