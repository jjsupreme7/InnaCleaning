'use client';

import Container from '@/components/ui/Container';
import ReviewCard from '@/components/reviews/ReviewCard';
import { reviews } from '@/data/reviews';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TestimonialsSection() {
  const { t } = useLanguage();

  return (
    <section className="theme-transition py-20 md:py-28" style={{ background: 'var(--section-alt)' }}>
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: 'var(--text-muted)' }}>{t.testimonials.title}</h2>
          <p className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{t.testimonials.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.slice(0, 3).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </Container>
    </section>
  );
}
