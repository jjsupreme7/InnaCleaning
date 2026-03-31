import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { services } from '@/data/services';

export const metadata = {
  title: 'Services | Inna Cleaning',
  description: 'Professional cleaning services: standard, deep cleaning, move-in/move-out, and Airbnb turnovers in the Seattle area.',
};

export default function ServicesPage() {
  return (
    <>
      <section className="py-16 md:py-24 bg-zinc-900">
        <Container>
          <SectionHeading
            title="Our Services"
            subtitle="Every home deserves the right kind of clean"
          />
        </Container>
      </section>

      {services.map((service, i) => (
        <section
          key={service.id}
          className={`py-16 md:py-20 ${i % 2 === 0 ? 'bg-zinc-950' : 'bg-zinc-900'}`}
        >
          <Container>
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl">{service.icon}</span>
                <div>
                  <h2 className="text-xl font-bold text-white uppercase tracking-widest">
                    {service.title}
                  </h2>
                  <p className="text-red-500 font-bold text-sm mt-1">
                    Starting at ${service.startingPrice}
                  </p>
                </div>
              </div>

              <p className="text-zinc-400 leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="mb-8">
                <h3 className="text-xs uppercase tracking-widest font-bold text-zinc-500 mb-3">
                  What&apos;s Included
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-zinc-400">
                      <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Button href="/quote" variant="primary" size="md">
                Get a Quote
              </Button>
            </div>
          </Container>
        </section>
      ))}

      <section className="py-16 md:py-24 bg-red-700">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl uppercase tracking-[0.15em] font-bold text-white mb-4">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-red-100 text-lg mb-8">
              Try our free quote estimator — it takes less than a minute.
            </p>
            <Button href="/quote" variant="secondary" size="lg">
              Free Quote Estimator
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
