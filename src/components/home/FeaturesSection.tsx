'use client';

import Container from '@/components/ui/Container';
import { Shield, Leaf, Clock, Star, Sparkles, Lock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const icons = [Shield, Leaf, Clock, Star, Sparkles, Lock];

export default function FeaturesSection() {
  const { t } = useLanguage();

  return (
    <section className="theme-transition py-20 md:py-28" style={{ background: 'var(--section-alt)' }}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-red-500">
              {t.features.badge}
            </p>
            <h2 className="font-display text-3xl font-bold lg:text-4xl" style={{ color: 'var(--text-primary)' }}>
              {t.features.headline}
            </h2>
            <p className="mt-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{t.features.description}</p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {t.features.items.map((feature, i) => {
                const Icon = icons[i];
                return (
                  <div key={i} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border" style={{ borderColor: 'var(--card-border)', background: 'var(--bg-elevated)' }}>
                      <Icon className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{feature.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:mt-12">
            <div className="col-span-2 flex aspect-video items-center justify-center rounded-xl border bg-gradient-to-br from-red-50 to-zinc-100" style={{ borderColor: 'var(--card-border)' }}>
              <p className="text-sm uppercase tracking-widest" style={{ color: 'var(--text-faint)' }}>{t.features.photo}</p>
            </div>
            <div className="flex flex-col justify-center rounded-xl bg-red-600 p-6">
              <p className="text-4xl font-bold text-white">5+</p>
              <p className="mt-1 text-sm text-red-100">{t.features.yearsExp}</p>
            </div>
            <div className="flex flex-col justify-center rounded-xl border p-6" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--card-border)' }}>
              <p className="text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>0</p>
              <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>{t.features.complaints}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
