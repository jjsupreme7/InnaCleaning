'use client';

import Container from '@/components/ui/Container';
import { serviceAreas } from '@/data/serviceAreas';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ServiceAreaSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-28 bg-white">
      <Container>
        <div className="text-center mb-10">
          <h2 className="text-xs uppercase tracking-widest font-bold text-zinc-500 mb-2">{t.areas.title}</h2>
          <p className="font-display text-2xl font-bold text-zinc-900">{t.areas.subtitle}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {serviceAreas.map((area) => (
            <span
              key={area}
              className="rounded-full border border-zinc-200 bg-zinc-50 px-5 py-2 text-sm text-zinc-600 uppercase tracking-widest font-medium hover:border-red-600 hover:text-red-500 transition-all duration-300"
            >
              {area}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
