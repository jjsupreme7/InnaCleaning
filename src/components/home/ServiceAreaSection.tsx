import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import { serviceAreas } from '@/data/serviceAreas';

export default function ServiceAreaSection() {
  return (
    <section className="py-16 md:py-24 bg-zinc-900">
      <Container>
        <SectionHeading
          title="Service Areas"
          subtitle="Proudly serving the greater Seattle area"
        />

        <div className="flex flex-wrap justify-center gap-3">
          {serviceAreas.map((area) => (
            <span
              key={area}
              className="border border-zinc-700 bg-zinc-950 px-5 py-2 text-sm text-zinc-400 uppercase tracking-widest font-medium hover:border-red-600 hover:text-red-500 transition-all duration-300"
            >
              {area}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
