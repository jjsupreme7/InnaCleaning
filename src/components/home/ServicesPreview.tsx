import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { services } from '@/data/services';

export default function ServicesPreview() {
  return (
    <section className="py-16 md:py-24 bg-zinc-900">
      <Container>
        <SectionHeading
          title="Services"
          subtitle="Professional cleaning tailored to your needs"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-zinc-950 border border-zinc-800 p-6 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="text-3xl mb-4">{service.icon}</div>
              <h3 className="text-sm uppercase tracking-widest font-bold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-4">
                {service.description.substring(0, 100)}...
              </p>
              <p className="text-red-500 font-bold text-sm mb-4">
                From ${service.startingPrice}
              </p>
              <Button href="/services" variant="outline" size="sm">
                Learn More
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
