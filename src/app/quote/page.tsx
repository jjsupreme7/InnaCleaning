import { Calculator, ShieldCheck, Sparkles } from 'lucide-react';
import Container from '@/components/ui/Container';
import QuoteEstimator from '@/components/quote/QuoteEstimator';

export const metadata = {
  title: 'Free Quote | Inna Cleaning',
  description: 'Get your free cleaning estimate in under a minute. No commitment, no hassle.',
};

export default function QuotePage() {
  return (
    <section className="section-shell">
      <Container>
        <div className="mb-12 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="scroll-fade-up">
            <span className="eyebrow">
              <Calculator className="h-3.5 w-3.5" strokeWidth={2} />
              Free Estimate
            </span>
            <h1 className="mt-6 font-serif text-5xl leading-[0.95] text-[var(--color-foreground)] md:text-6xl">
              Get a tailored estimate in under a minute.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#617d76] md:text-lg">
              Choose your home size, cleaning type, condition, add-ons, and
              preferred frequency. The pricing logic stays exactly as configured.
            </p>
          </div>

          <div className="soft-card scroll-fade-up p-6">
            <div className="flex items-center gap-3 text-[#467968]">
              <Sparkles className="h-5 w-5" strokeWidth={1.8} />
              <p className="text-sm font-semibold uppercase tracking-[0.18em]">
                No obligation
              </p>
            </div>
            <div className="mt-4 flex items-start gap-3 text-sm leading-7 text-[#617d76]">
              <ShieldCheck className="mt-1 h-5 w-5 flex-shrink-0 text-[#467968]" strokeWidth={1.8} />
              Book only when the estimate feels right. Final pricing may still
              vary after inspection, just as before.
            </div>
          </div>
        </div>
        <QuoteEstimator />
      </Container>
    </section>
  );
}
