'use client';

import { useState } from 'react';
import Container from '@/components/ui/Container';
import { services } from '@/data/services';
import { Sparkles, Paintbrush, PackageOpen, Home } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import GlowCard from '@/components/ui/GlowCard';

const categoryMap: Record<string, number> = {
  standard: 1,
  deep: 2,
  move: 3,
  airbnb: 4,
};

const popularId = 'deep';

const serviceIcons: Record<string, { icon: typeof Sparkles; color: string; bg: string }> = {
  standard: { icon: Sparkles, color: '#f87171', bg: 'rgba(248,113,113,0.08)' },
  deep: { icon: Paintbrush, color: '#f87171', bg: 'rgba(248,113,113,0.12)' },
  move: { icon: PackageOpen, color: '#f87171', bg: 'rgba(248,113,113,0.08)' },
  airbnb: { icon: Home, color: '#FFB020', bg: 'rgba(255,176,32,0.12)' },
};

export default function ServicesPreview() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState(0);

  const filtered =
    activeFilter === 0
      ? services
      : services.filter((s) => categoryMap[s.id] === activeFilter);

  return (
    <section className="theme-transition py-20 md:py-28" style={{ background: 'var(--bg-elevated)' }}>
      <Container>
        {/* Header */}
        <div className="mb-10 text-center max-w-xl mx-auto">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-red-400">
            {t.services.badge}
          </p>
          <h2 className="font-display text-3xl font-light lg:text-5xl leading-tight tracking-tight" style={{ color: 'var(--text-primary)' }}>
            {t.services.headline}
          </h2>
          <p className="mt-4 leading-relaxed text-[15px]" style={{ color: 'var(--text-muted)' }}>
            {t.services.description}
          </p>
        </div>

        {/* Filter chips */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {t.services.filters.map((label, i) => (
            <button
              key={i}
              onClick={() => setActiveFilter(i)}
              className={`min-h-[44px] rounded-full px-5 py-2 text-xs font-semibold tracking-wider transition-all duration-200 ${
                activeFilter === i
                  ? 'bg-red-50 border border-red-300 text-red-600'
                  : 'border hover:border-red-300 hover:text-red-600'
              }`}
              style={activeFilter !== i ? { background: 'var(--card-bg)', borderColor: 'var(--card-border)', color: 'var(--text-muted)' } : undefined}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.map((service, index) => {
              const { icon: Icon, color, bg } = serviceIcons[service.id];
              const isPopular = service.id === popularId;
              const isAirbnb = service.id === 'airbnb';
              const dotColor = isAirbnb ? '#FFB020' : '#f87171';

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                <GlowCard
                  className={`theme-transition group relative flex flex-col gap-5 rounded-xl p-7 transition-all duration-300
                    hover:-translate-y-1 hover:shadow-xl h-full
                    ${isPopular
                      ? 'border border-red-200 bg-gradient-to-br from-red-50 to-white shadow-sm hover:border-red-300 hover:shadow-red-100/50'
                      : 'border shadow-sm'
                    }`}
                  style={!isPopular ? { background: 'var(--bg-elevated)', borderColor: 'var(--card-border)' } : undefined}
                >
                  {isPopular && (
                    <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-[radial-gradient(circle_at_top_right,rgba(248,113,113,0.08),transparent_70%)]" />
                  )}

                  {isPopular && (
                    <span className="absolute right-4 top-4 rounded-full border border-red-300 bg-red-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-red-600">
                      {t.services.popular}
                    </span>
                  )}

                  <div
                    className="flex h-[52px] w-[52px] items-center justify-center rounded-lg"
                    style={{ backgroundColor: bg }}
                  >
                    <Icon size={24} strokeWidth={1.5} style={{ color }} />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-[22px] font-normal tracking-tight" style={{ color: isPopular ? '#1a1a1a' : 'var(--text-primary)' }}>
                      {t.servicesItems[service.id as keyof typeof t.servicesItems].title}
                    </h3>
                    <p className="text-[13px] leading-relaxed" style={{ color: isPopular ? '#6b7280' : 'var(--text-muted)' }}>
                      {t.servicesItems[service.id as keyof typeof t.servicesItems].description.substring(0, 80)}…
                    </p>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-light" style={{ color: isPopular ? '#1a1a1a' : 'var(--text-primary)' }}>
                      ${service.startingPrice}
                    </span>
                    <span className="text-xs" style={{ color: isPopular ? '#9ca3af' : 'var(--text-faint)' }}>{t.services.starting}</span>
                  </div>

                  <div
                    className={`h-px w-full ${
                      isPopular ? 'bg-red-200' : ''
                    }`}
                    style={!isPopular ? { background: 'var(--card-border)' } : undefined}
                  />

                  <ul className="flex flex-col gap-2.5">
                    {t.servicesItems[service.id as keyof typeof t.servicesItems].includes.slice(0, 3).map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-[13px]" style={{ color: isPopular ? '#4b5563' : 'var(--text-muted)' }}>
                        <span
                          className="inline-block h-[5px] w-[5px] shrink-0 rounded-full"
                          style={{ backgroundColor: dotColor }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto">
                    {isPopular ? (
                      <a
                        href="/services"
                        className="flex items-center justify-center rounded-xl bg-red-600 px-4 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-red-700"
                      >
                        {t.services.learnMore}
                      </a>
                    ) : (
                      <a
                        href="/services"
                        className="flex items-center justify-center rounded-xl border px-4 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors"
                        style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)', color: 'var(--text-secondary)' }}
                      >
                        {t.services.learnMore}
                      </a>
                    )}
                  </div>
                </GlowCard>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </Container>
    </section>
  );
}
