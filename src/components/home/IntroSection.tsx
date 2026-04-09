'use client';

import Image from 'next/image';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';

export default function IntroSection() {
  const { t } = useLanguage();

  return (
    <section className="theme-transition py-20 md:py-28" style={{ background: 'var(--bg-elevated)' }}>
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-red-500">
              {t.intro.badge}
            </p>
            <h2 className="font-display text-3xl font-bold leading-snug lg:text-4xl" style={{ color: 'var(--text-primary)' }}>
              {t.intro.headline}
            </h2>
            <p className="mt-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{t.intro.p1}</p>
            <p className="mt-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{t.intro.p2}</p>

            <div className="mt-8 grid grid-cols-3 gap-6">
              <div>
                <p className="text-4xl font-bold text-red-500">5+</p>
                <p className="mt-1 text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{t.intro.years}</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-red-500">327+</p>
                <p className="mt-1 text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{t.intro.clients}</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-red-500">100%</p>
                <p className="mt-1 text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{t.intro.satisfaction}</p>
              </div>
            </div>

            <div className="mt-8">
              <Button href="/about" variant="outline" size="md">{t.intro.cta}</Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 aspect-video relative overflow-hidden rounded-xl">
              <Image
                src="/images/gallery/inna/cleaning-equipment.jpg"
                alt="Professional cleaning supplies and equipment"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center rounded-xl bg-red-600 p-6">
              <p className="text-4xl font-bold text-white">5★</p>
              <p className="mt-1 text-sm text-red-100">{t.intro.rating}</p>
            </div>
            <div className="flex flex-col justify-center rounded-xl border p-6" style={{ background: 'var(--card-bg)', borderColor: 'var(--card-border)' }}>
              <p className="text-4xl font-bold" style={{ color: 'var(--text-primary)' }}>327+</p>
              <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>{t.intro.homes}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
