import { MapPin, Sparkles } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { serviceAreas } from '@/data/serviceAreas';

export default function ServiceAreaSection() {
  return (
    <section className="section-shell bg-[#edf5ee]/70">
      <Container>
        <SectionHeading
          title="Service Areas"
          subtitle="Proudly serving the greater Seattle area"
        />

        <div className="grid items-start gap-8 md:grid-cols-[0.95fr_1.05fr]">
          <div className="panel-card scroll-fade-up p-7 md:p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-[1.35rem] bg-[#dff0ea] text-[#467968]">
              <MapPin className="h-6 w-6" strokeWidth={1.8} />
            </div>
            <h3 className="mt-6 font-serif text-3xl text-[var(--color-foreground)]">
              Local, personal service across greater Seattle
            </h3>
            <p className="mt-4 text-sm leading-7 text-[#64827a] md:text-base">
              From regular upkeep to deep reset cleanings, I help busy households
              stay fresh, calm, and company-ready throughout the week.
            </p>
            <div className="mt-6 flex items-start gap-3 rounded-[1.5rem] bg-[#edf5ee] px-4 py-4 text-sm leading-7 text-[#5d7871]">
              <Sparkles className="mt-1 h-5 w-5 flex-shrink-0 text-[#467968]" strokeWidth={1.8} />
              Flexible recurring options available for homes, moves, and short-term rental turnovers.
            </div>
          </div>

          <div className="scroll-fade-up flex flex-wrap gap-3">
            {serviceAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-white/60 bg-white/88 px-5 py-3 text-sm font-semibold tracking-[0.08em] text-[#56746c] shadow-[0_16px_34px_-26px_rgba(27,69,56,0.34)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#9bc6b8] hover:text-[var(--color-foreground)]"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
