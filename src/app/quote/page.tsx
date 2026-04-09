'use client';

import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import QuoteEstimator from '@/components/quote/QuoteEstimator';
import { useLanguage } from '@/contexts/LanguageContext';

export default function QuotePage() {
  const { t } = useLanguage();

  return (
    <section className="theme-transition py-16 md:py-24" style={{ background: 'var(--bg-base)' }}>
      <Container>
        <SectionHeading
          title={t.quote.title}
          subtitle={t.quote.subtitle}
        />
        <QuoteEstimator />
      </Container>
    </section>
  );
}
