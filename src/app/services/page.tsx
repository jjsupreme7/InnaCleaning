'use client';

import Image from 'next/image';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { services } from '@/data/services';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles, Paintbrush, PackageOpen, Home } from 'lucide-react';
import BorderBeam from '@/components/ui/BorderBeam';

const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  standard: Sparkles,
  deep: Paintbrush,
  move: PackageOpen,
  airbnb: Home,
};

export default function ServicesPage() {
  const { t } = useLanguage();
  const sp = t.servicesPage;
  const si = t.servicesItems;

  return (
    <>
      {/* ── Immersive Hero ── */}
      <section className="relative min-h-[50vh] md:min-h-[55vh] flex items-end overflow-hidden">
        <Image
          src="/images/clean-interior.jpg"
          alt="Sparkling clean home interior"
          fill
          className="object-cover object-center scale-105"
          priority
          quality={85}
        />
        {/* Layered gradient: soft top fade, strong bottom for text */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/75" />
        {/* Subtle warm tint */}
        <div className="absolute inset-0 bg-gradient-to-tr from-red-950/20 via-transparent to-transparent" />

        {/* Decorative geometric accent */}
        <div className="absolute top-0 right-0 w-48 h-48 md:w-72 md:h-72 opacity-10">
          <div className="absolute inset-0 border-2 border-white rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute inset-4 border border-white/50 rounded-full translate-x-1/2 -translate-y-1/2" />
        </div>

        <div className="relative z-10 w-full pb-12 md:pb-16">
          <Container>
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[2px] bg-red-400" />
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-400">
                  {sp.title}
                </p>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white font-display leading-tight mb-4">
                {sp.subtitle}
              </h1>
              <p className="text-white/70 text-lg max-w-lg">
                Professional cleaning tailored to your needs — from routine upkeep to deep restoration.
              </p>
            </div>
          </Container>
        </div>
      </section>

      {/* ── Service Cards ── */}
      {services.map((service, i) => {
        const content = si[service.id as keyof typeof si];
        const isPopular = service.id === 'deep';

        return (
          <section
            key={service.id}
            className="py-20 md:py-28 theme-transition"
            style={{ background: i % 2 === 0 ? 'var(--bg-elevated)' : 'var(--section-alt)' }}
          >
            <Container>
              <div className="max-w-3xl mx-auto">
                <div
                  className="rounded-xl p-6 md:p-8 relative group transition-all duration-300 theme-transition"
                  style={{
                    background: 'var(--card-bg)',
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: isPopular ? 'rgba(239,68,68,0.3)' : 'var(--card-border)',
                  }}
                >
                  <BorderBeam />
                  {/* Left accent bar */}
                  <div className={`absolute left-0 top-8 w-[2px] h-12 ${isPopular ? 'bg-red-500' : 'bg-red-400'}`} />

                  {/* Popular badge */}
                  {isPopular && (
                    <div className="absolute -top-3 right-6 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}

                  <div className="flex items-center gap-4 mb-6">
                    {(() => { const Icon = SERVICE_ICONS[service.id] || Sparkles; return <Icon className="w-7 h-7 text-red-500" strokeWidth={1.5} />; })()}
                    <div>
                      <h2 className="text-xl font-bold font-display uppercase tracking-widest" style={{ color: 'var(--text-primary)' }}>
                        {content.title}
                      </h2>
                      <p className="text-red-500 font-bold text-sm mt-1">
                        Starting at ${service.startingPrice}
                      </p>
                    </div>
                  </div>

                  <p className="leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                    {content.description}
                  </p>

                  <div className="mb-8">
                    <h3 className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: 'var(--text-muted)' }}>
                      {sp.whatsIncluded}
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {content.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
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

      {/* ── CTA Banner ── */}
      <section className="py-20 md:py-28 bg-red-700 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute -top-20 -left-20 w-64 h-64 border-2 border-white rounded-full" />
          <div className="absolute -bottom-10 -right-10 w-48 h-48 border border-white rounded-full" />
        </div>
        <Container>
          <div className="text-center relative z-10">
            <h2 className="text-2xl md:text-3xl uppercase tracking-[0.15em] font-bold text-white font-display mb-4">
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
