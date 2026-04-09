'use client';

import Image from 'next/image';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { services } from '@/data/services';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ServicesPage() {
  const { t } = useLanguage();
  const sp = t.servicesPage;
  const si = t.servicesItems;

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[320px] max-h-[480px] flex items-end overflow-hidden">
        <Image
          src="/images/clean-interior.jpg"
          alt="Sparkling clean home interior"
          fill
          className="object-cover object-center"
          priority
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

        <div className="relative z-10 w-full pb-10">
          <Container>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-400 mb-3">
              {sp.title}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-white font-display">
              {sp.subtitle}
            </h1>
          </Container>
        </div>
      </section>

      {services.map((service, i) => {
        const content = si[service.id as keyof typeof si];
        return (
          <section
            key={service.id}
            className={`py-20 md:py-28 ${i % 2 === 0 ? 'bg-white' : 'bg-zinc-50'}`}
          >
            <Container>
              <div className="max-w-3xl mx-auto">
                <div className="border border-zinc-200 rounded-xl p-6 md:p-8 relative hover:border-zinc-300 transition-colors duration-300">
                  {/* Left accent bar */}
                  <div className="absolute left-0 top-8 w-[2px] h-12 bg-red-500" />

                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-3xl">{service.icon}</span>
                    <div>
                      <h2 className="text-xl font-bold text-zinc-900 font-display uppercase tracking-widest">
                        {content.title}
                      </h2>
                      <p className="text-red-500 font-bold text-sm mt-1">
                        Starting at ${service.startingPrice}
                      </p>
                    </div>
                  </div>

                  <p className="text-zinc-600 leading-relaxed mb-6">
                    {content.description}
                  </p>

                  <div className="mb-8">
                    <h3 className="text-xs uppercase tracking-widest font-bold text-zinc-500 mb-3">
                      {sp.whatsIncluded}
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {content.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-zinc-600">
                          <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button href="/quote" variant="primary" size="md">
                    {sp.getQuote}
                  </Button>
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      <section className="py-20 md:py-28 bg-red-700">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl uppercase tracking-[0.15em] font-bold text-white mb-4">
              {sp.ctaHeadline}
            </h2>
            <p className="text-red-100 text-lg mb-8">
              {sp.ctaDesc}
            </p>
            <Button href="/quote" variant="secondary" size="lg">
              {sp.ctaBtn}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
