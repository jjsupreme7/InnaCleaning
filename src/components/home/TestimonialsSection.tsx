'use client';

import Container from '@/components/ui/Container';
import ReviewCard from '@/components/reviews/ReviewCard';
import { reviews } from '@/data/reviews';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TestimonialsSection() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden theme-transition py-20 md:py-28" style={{ background: 'var(--section-alt)' }}>
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[30rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.03),transparent_70%)]" aria-hidden="true" />
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: 'var(--text-muted)' }}>{t.testimonials.title}</h2>
          <p className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{t.testimonials.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Featured review — spans 3 cols for visual weight */}
          <div className="md:col-span-3">
            <ReviewCard review={reviews[0]} />
          </div>
          {/* Supporting reviews — stacked in remaining 2 cols */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <ReviewCard review={reviews[1]} />
            <ReviewCard review={reviews[2]} />
          </div>
        </div>
      </Container>
    </section>
  );
}
