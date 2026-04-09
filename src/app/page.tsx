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
      <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, var(--border-default), transparent)' }} />
      <IntroSection />
      <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, var(--border-default), transparent)' }} />
      <FeaturesSection />
      <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, var(--border-default), transparent)' }} />
      <ServiceAreaSection />
      <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, var(--border-default), transparent)' }} />
      <ServicesPreview />
      <div className="h-px" style={{ background: 'linear-gradient(to right, transparent, var(--border-default), transparent)' }} />
      <TestimonialsSection />
      <CTABanner />
    </>
  );
}
