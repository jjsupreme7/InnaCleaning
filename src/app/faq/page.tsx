import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import FAQItemComponent from '@/components/faq/FAQItem';
import Button from '@/components/ui/Button';
import { faqItems } from '@/data/faq';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'FAQ | Inna Cleaning',
  description: 'Frequently asked questions about our cleaning services, pricing, and policies.',
};

export default function FAQPage() {
  return (
    <section className="section-shell">
      <Container>
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Everything you need to know"
        />

        <div className="mx-auto max-w-3xl">
          {faqItems.map((item) => (
            <FAQItemComponent
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}

          <div className="mt-12 text-center">
            <p className="mb-4 text-sm leading-7 text-[#67827b]">
              Still have questions?
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button href="/contact" variant="outline" size="md">
                Contact Me
              </Button>
              <Button href="/quote" size="md">
                Get a Quote
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
