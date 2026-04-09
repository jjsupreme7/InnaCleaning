'use client';

import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CTABanner() {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-28 bg-red-700">
      <Container>
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl uppercase tracking-[0.15em] font-bold text-white mb-4">
            {t.cta.headline}
          </h2>
          <p className="text-red-100 text-lg mb-8 max-w-xl mx-auto">
            {t.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
            <Button href="/quote" variant="secondary" size="lg">{t.cta.quote}</Button>
            <a
              href="/booking"
              className="text-white/80 underline underline-offset-4 hover:text-white text-sm uppercase tracking-widest font-bold transition-colors"
            >
              {t.cta.book}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
