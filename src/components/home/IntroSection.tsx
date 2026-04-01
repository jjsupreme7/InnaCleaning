'use client';

import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';

export default function IntroSection() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-zinc-950">
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-red-500">
              {t.intro.badge}
            </p>
            <h2 className="text-3xl font-bold leading-snug text-white lg:text-4xl">
              {t.intro.headline}
            </h2>
            <p className="mt-4 leading-relaxed text-zinc-400">{t.intro.p1}</p>
            <p className="mt-3 leading-relaxed text-zinc-400">{t.intro.p2}</p>

            <div className="mt-8 grid grid-cols-3 gap-6">
              <div>
                <p className="text-4xl font-bold text-red-500">5+</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-zinc-500">{t.intro.years}</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-red-500">200+</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-zinc-500">{t.intro.clients}</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-red-500">100%</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-zinc-500">{t.intro.satisfaction}</p>
              </div>
            </div>

            <div className="mt-8">
              <Button href="/about" variant="outline" size="md">{t.intro.cta}</Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 flex aspect-video items-center justify-center border border-zinc-800 bg-gradient-to-br from-red-950 to-zinc-900">
              <p className="text-sm uppercase tracking-widest text-zinc-600">{t.intro.photoSoon}</p>
            </div>
            <div className="flex flex-col justify-center bg-red-600 p-6">
              <p className="text-4xl font-bold text-white">5★</p>
              <p className="mt-1 text-sm text-red-100">{t.intro.rating}</p>
            </div>
            <div className="flex flex-col justify-center border border-zinc-800 bg-zinc-900 p-6">
              <p className="text-4xl font-bold text-white">200+</p>
              <p className="mt-1 text-sm text-zinc-400">{t.intro.homes}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
