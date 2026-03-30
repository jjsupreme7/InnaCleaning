import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import QuoteEstimator from '@/components/quote/QuoteEstimator';

export const metadata = {
  title: 'Free Quote | Inna Cleaning',
  description: 'Get your free cleaning estimate in under a minute. No commitment, no hassle.',
};

export default function QuotePage() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50/50 to-white">
      <Container>
        <SectionHeading
          title="Get Your Free Estimate"
          subtitle="Takes less than a minute — no commitment"
        />
        <QuoteEstimator />
      </Container>
    </section>
  );
}
