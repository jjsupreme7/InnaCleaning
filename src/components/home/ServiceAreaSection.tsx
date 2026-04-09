'use client';

import Container from '@/components/ui/Container';
import { serviceAreas } from '@/data/serviceAreas';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ServiceAreaSection() {
  const { t } = useLanguage();

  return (
    <section className="theme-transition py-20 md:py-28" style={{ background: 'var(--bg-elevated)' }}>
      <Container>
        <div className="text-center mb-10">
          <h2 className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: 'var(--text-muted)' }}>{t.areas.title}</h2>
          <p className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{t.areas.subtitle}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {serviceAreas.map((area) => (
            <span
              key={area}
              className="theme-transition rounded-full border px-5 py-2 text-sm uppercase tracking-widest font-medium hover:border-red-600 hover:text-red-500 transition-all duration-300"
              style={{ borderColor: 'var(--card-border)', background: 'var(--card-bg)', color: 'var(--text-secondary)' }}
            >
              {area}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
