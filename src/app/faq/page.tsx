'use client';

import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import FAQItemComponent from '@/components/faq/FAQItem';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';

export default function FAQPage() {
  const { t } = useLanguage();
  const f = t.faq;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading title={f.title} subtitle={f.subtitle} />

        <div className="max-w-2xl mx-auto">
          {f.items.map((item) => (
            <FAQItemComponent
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}

          <div className="text-center mt-12">
            <p className="text-zinc-500 text-sm mb-4">
              {f.stillHave}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="outline" size="md">
                {f.contact}
              </Button>
              <Button href="/quote" variant="primary" size="md">
                {f.getQuote}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
