import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { serviceAreas } from '@/data/serviceAreas';

export default function ServiceAreaSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <Container>
        <SectionHeading
          title="Service Areas"
          subtitle="Proudly serving the greater Seattle area"
        />

        <div className="flex flex-wrap justify-center gap-3">
          {serviceAreas.map((area) => (
            <span
              key={area}
              className="border border-gray-200 bg-white px-5 py-2 text-sm text-gray-600 uppercase tracking-widest font-medium hover:border-sky-600 hover:text-sky-600 transition-all duration-300"
            >
              {area}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
