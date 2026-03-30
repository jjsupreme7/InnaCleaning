import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { services } from '@/data/services';
import { Sparkles, Brush, PackageOpen, Home } from 'lucide-react';

const serviceIcons: Record<string, React.ReactNode> = {
  standard: <Sparkles className="w-7 h-7 text-teal-600" />,
  deep: <Brush className="w-7 h-7 text-teal-600" />,
  move: <PackageOpen className="w-7 h-7 text-teal-600" />,
  airbnb: <Home className="w-7 h-7 text-teal-600" />,
};

export default function ServicesPreview() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <Container>
        <SectionHeading
          title="Services"
          subtitle="Professional cleaning tailored to your needs"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <div
              key={service.id}
              className={`bg-stone-50 border border-stone-100 rounded-2xl p-6 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group animate-fade-in-up-delay-${i + 1}`}
            >
              <div className="bg-teal-50 w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:bg-teal-100 transition-colors duration-300">
                {serviceIcons[service.id]}
              </div>
              <h3 className="font-semibold text-stone-800 text-base mb-2">
                {service.title}
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed mb-4">
                {service.description.substring(0, 90)}...
              </p>
              <p className="text-teal-600 font-bold text-sm mb-4">
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
