'use client';

import { useState } from 'react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { services } from '@/data/services';
import { Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const categoryMap: Record<string, number> = {
  standard: 1,
  deep: 2,
  move: 3,
  airbnb: 4,
};

const popularId = 'deep';

export default function ServicesPreview() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState(0);

  const filtered =
    activeFilter === 0
      ? services
      : services.filter((s) => categoryMap[s.id] === activeFilter);

  return (
    <section className="py-16 md:py-24 bg-zinc-950">
      <Container>
        <div className="mb-10 max-w-xl">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            {t.services.badge}
          </p>
          <h2 className="text-3xl font-bold text-white lg:text-4xl">
            {t.services.headline}
          </h2>
          <p className="mt-3 leading-relaxed text-zinc-400">{t.services.description}</p>
        </div>

        {/* Filter chips */}
        <div className="mb-8 flex flex-wrap gap-2">
          {t.services.filters.map((label, i) => (
            <button
              key={i}
              onClick={() => setActiveFilter(i)}
              className={`min-h-[44px] px-5 py-2 text-sm font-bold uppercase tracking-widest transition-colors ${
                activeFilter === i
                  ? 'bg-red-600 text-white'
                  : 'border border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-red-600 hover:text-red-500'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((service) => (
            <div
              key={service.id}
              className={`relative flex flex-col gap-4 border p-6 transition-shadow hover:shadow-lg hover:shadow-red-950/20 ${
                service.id === popularId
                  ? 'border-red-600 bg-zinc-900'
                  : 'border-zinc-800 bg-zinc-900'
              }`}
            >
              {service.id === popularId && (
                <span className="absolute right-3 top-3 bg-red-600 px-2 py-1 text-xs font-bold uppercase tracking-widest text-white">
                  {t.services.popular}
                </span>
              )}

              <div>
                <p className="mb-2 text-2xl">{service.icon}</p>
                <h3 className="font-bold text-white">{t.servicesItems[service.id as keyof typeof t.servicesItems].title}</h3>
                <p className="mt-1 text-sm text-zinc-500">
                  {t.servicesItems[service.id as keyof typeof t.servicesItems].description.substring(0, 80)}…
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">${service.startingPrice}</span>
                <span className="text-sm text-zinc-500">{t.services.starting}</span>
              </div>

              <ul className="flex flex-col gap-1.5">
                {t.servicesItems[service.id as keyof typeof t.servicesItems].includes.slice(0, 3).map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-zinc-400">
                    <Check className="h-3.5 w-3.5 shrink-0 text-red-500" />
                    {item}
                  </li>
                ))}
              </ul>

              <Button
                href="/services"
                variant={service.id === popularId ? 'primary' : 'outline'}
                size="sm"
                className="mt-auto"
              >
                {t.services.learnMore}
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
