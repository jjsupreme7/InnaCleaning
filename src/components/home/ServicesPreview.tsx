import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { services } from '@/data/services';

export default function ServicesPreview() {
  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <Container>
        <SectionHeading
          title="Services"
          subtitle="Professional cleaning tailored to your needs"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-sm border border-gray-100 p-7 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 group"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{service.icon}</div>
              <h3 className="text-sm uppercase tracking-widest font-bold text-slate-800 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                {service.description.substring(0, 100)}...
              </p>
              <p className="text-sky-600 font-bold text-sm mb-5">
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
