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
          <div className="flex flex-col sm:flex-row gap-5 items-center justify-center">
            <Button href="/quote" variant="secondary" size="lg">{t.cta.quote}</Button>
            <a
              href="https://instagram.com/INNAS_CLEANING"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-[#e1306c] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#c62a5e]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              DM on Instagram
            </a>
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
