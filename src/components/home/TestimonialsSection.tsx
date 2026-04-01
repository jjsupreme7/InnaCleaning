import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import ReviewCard from '@/components/reviews/ReviewCard';
import { reviews } from '@/data/reviews';

export default function TestimonialsSection() {
  return (
    <section className="section-shell">
      <Container>
        <SectionHeading
          title="What Clients Say"
          subtitle="Real reviews from real homeowners"
        />

        <div className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.24em] text-[#6f8882]">
          5-star testimonials and repeat clients
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {reviews.slice(0, 3).map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </Container>
    </section>
  );
}
