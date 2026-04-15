'use client';

import Container from '@/components/ui/Container';
import { serviceAreas } from '@/data/serviceAreas';
import { useLanguage } from '@/contexts/LanguageContext';
import ZipChecker from './ZipChecker';

export default function ServiceAreaSection() {
  const { t } = useLanguage();

  return (
    <section className="theme-transition py-20 md:py-28" style={{ background: 'var(--bg-elevated)' }}>
      <Container>
        <div className="text-center mb-10">
          <h2 className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: 'var(--text-muted)' }}>{t.areas.title}</h2>
          <p className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{t.areas.subtitle}</p>
        </div>

        <ZipChecker />

        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {serviceAreas.map((area) => (
            <span
              key={area.city}
              className="theme-transition rounded-full border px-5 py-2 text-sm uppercase tracking-widest font-medium hover:border-red-600 hover:text-red-500 transition-all duration-300"
              style={{ borderColor: 'var(--card-border)', background: 'var(--card-bg)', color: 'var(--text-secondary)' }}
            >
              {area.city}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
