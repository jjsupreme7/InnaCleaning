import { ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { services } from '@/data/services';
import ServiceIcon from '@/components/ui/ServiceIcon';

export default function ServicesPreview() {
  return (
    <section className="section-shell bg-[#edf5ee]/70">
      <Container>
        <SectionHeading
          title="Services"
          subtitle="Professional cleaning tailored to your needs"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="scroll-fade-up soft-card group flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_70px_-38px_rgba(27,69,56,0.45)]"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-[linear-gradient(135deg,#dff0ea,#f2e8cf)] text-[#467968] transition-transform duration-300 group-hover:scale-105">
                <ServiceIcon icon={service.icon} className="h-6 w-6" strokeWidth={1.8} />
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-foreground)]">
                {service.title}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-7 text-[#67827b]">
                {service.description.substring(0, 100)}...
              </p>
              <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#467968]">
                From ${service.startingPrice}
              </p>
              <div className="mt-6">
                <Button href="/services" variant="outline" size="sm">
                  Learn More
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
