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
      <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
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
          className={`py-16 md:py-20 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
        >
          <Container>
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl">{service.icon}</span>
                <div>
                  <h2 className="text-xl font-bold text-slate-800 uppercase tracking-widest">
                    {service.title}
                  </h2>
                  <p className="text-sky-600 font-bold text-sm mt-1">
                    Starting at ${service.startingPrice}
                  </p>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="mb-8">
                <h3 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-4">
                  What&apos;s Included
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {service.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <div className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
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

      <section className="py-20 md:py-28 bg-gradient-to-br from-sky-600 via-sky-600 to-sky-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-[30%] w-64 h-64 bg-white/[0.04] rounded-full blur-2xl" />
          <div className="absolute bottom-0 right-[15%] w-80 h-80 bg-white/[0.03] rounded-full blur-3xl" />
        </div>
        <Container>
          <div className="text-center relative z-10">
            <h2 className="text-2xl md:text-3xl uppercase tracking-[0.15em] font-bold text-white mb-4">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-sky-100 text-lg mb-8">
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
