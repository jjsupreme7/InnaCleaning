'use client';

import Image from 'next/image';
import Button from '@/components/ui/Button';
import RotatingText from '@/components/ui/RotatingText';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-[90vh] items-end overflow-hidden pb-16 pt-24 lg:min-h-screen lg:items-center lg:pb-0 lg:pt-0">
      <Image
        src="/images/clean-interior.jpg"
        alt="Clean interior"
        fill
        className="object-cover object-center"
        priority
        quality={85}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      {/* Decorative gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Large soft orb top-center */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[40rem] h-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)]" />
        {/* Warm accent bottom-left */}
        <div className="absolute bottom-20 -left-20 w-[30rem] h-60 rounded-full bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.08),transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-red-400">
            {t.hero.badge}
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            {t.hero.headline}
            <br />
            <span className="inline-flex overflow-hidden pl-[0.05em] pr-[0.2em] pb-[0.2em] leading-[1.15]">
              <RotatingText
                texts={t.hero.rotating as unknown as string[]}
                rotationInterval={2500}
                staggerDuration={0.03}
                staggerFrom="first"
                mainClassName="italic"
              />
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 lg:text-xl">
            {t.hero.description}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/quote" variant="primary" size="lg">
              {t.hero.quote}
            </Button>
            <Button
              href="/booking"
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
            >
              {t.hero.book}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
