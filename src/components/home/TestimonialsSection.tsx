import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import ReviewCard from '@/components/reviews/ReviewCard';
import { reviews } from '@/data/reviews';

export default function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Subtle decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-sky-50 rounded-full blur-3xl opacity-40 translate-y-1/2 -translate-x-1/2" />

      <Container>
        <div className="relative z-10">
          <SectionHeading
            title="What Clients Say"
            subtitle="Real reviews from real homeowners"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.slice(0, 3).map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
