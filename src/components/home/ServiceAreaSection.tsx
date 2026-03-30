import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { serviceAreas } from '@/data/serviceAreas';

export default function ServiceAreaSection() {
  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <Container>
        <SectionHeading
          title="Service Areas"
          subtitle="Proudly serving the greater Seattle area"
        />

        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {serviceAreas.map((area) => (
            <span
              key={area}
              className="border border-gray-200 bg-white px-5 py-2.5 text-sm text-gray-600 uppercase tracking-widest font-medium rounded-sm hover:border-sky-500 hover:text-sky-600 hover:bg-sky-50 hover:shadow-sm transition-all duration-300 cursor-default"
            >
              {area}
            </span>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-400 text-sm">
            Don&apos;t see your area? <a href="/contact" className="text-sky-600 font-bold hover:underline">Contact me</a> to check availability.
          </p>
        </div>
      </Container>
    </section>
  );
}
