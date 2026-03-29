import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import FAQItemComponent from '@/components/faq/FAQItem';
import Button from '@/components/ui/Button';
import { faqItems } from '@/data/faq';

export const metadata = {
  title: 'FAQ | Inna Cleaning',
  description: 'Frequently asked questions about our cleaning services, pricing, and policies.',
};

export default function FAQPage() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Everything you need to know"
        />

        <div className="max-w-2xl mx-auto">
          {faqItems.map((item) => (
            <FAQItemComponent
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}

          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm mb-4">
              Still have questions?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="outline" size="md">
                Contact Me
              </Button>
              <Button href="/quote" variant="primary" size="md">
                Get a Quote
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
