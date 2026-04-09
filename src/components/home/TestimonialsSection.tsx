'use client';

import Container from '@/components/ui/Container';
import ReviewCard from '@/components/reviews/ReviewCard';
import { reviews } from '@/data/reviews';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TestimonialsSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-28 bg-zinc-50">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-xs uppercase tracking-widest font-bold text-zinc-500 mb-2">{t.testimonials.title}</h2>
          <p className="font-display text-2xl font-bold text-zinc-900">{t.testimonials.subtitle}</p>
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
