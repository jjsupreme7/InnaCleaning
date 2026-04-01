import Image from 'next/image';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import ServiceIcon from '@/components/ui/ServiceIcon';
import { services } from '@/data/services';
import { serviceImages, siteImages } from '@/data/images';

export const metadata = {
  title: 'Services | Inna Cleaning',
  description: 'Professional cleaning services: standard, deep cleaning, move-in/move-out, and Airbnb turnovers in the Seattle area.',
};

export default function ServicesPage() {
  return (
    <>
      <section className="section-shell">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-[0.95fr_1.05fr]">
            <div className="scroll-fade-up">
              <span className="eyebrow">
                <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
                Our Services
              </span>
              <h1 className="mt-6 font-serif text-5xl leading-[0.95] text-[var(--color-foreground)] md:text-6xl">
                Every home deserves the right kind of clean.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-[#617d76] md:text-lg">
                Choose the service that fits your space, your schedule, and the
                kind of reset you need most. Pricing and service descriptions
                stay transparent from the start.
              </p>
            </div>

            <div className="scroll-fade-up relative overflow-hidden rounded-[2.4rem] shadow-[0_30px_80px_-40px_rgba(27,69,56,0.52)]">
              <Image
                src={siteImages.cleanKitchen}
                alt="Bright, freshly cleaned kitchen interior"
                className="aspect-[6/5] w-full object-cover"
                width={800}
                height={667}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_48%,rgba(18,52,43,0.62)_100%)]" />
              <div className="absolute inset-x-6 bottom-6 rounded-[1.6rem] border border-white/25 bg-white/18 px-5 py-4 text-white backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/72">
                  Fresh finishes
                </p>
                <p className="mt-2 text-sm leading-7 text-white/88">
                  Regular upkeep, top-to-bottom deep cleans, move support, and
                  rental-ready resets.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.id}
                className="panel-card scroll-fade-up overflow-hidden"
              >
                <Image
                  src={serviceImages[service.id as keyof typeof serviceImages]}
                  alt={`${service.title} cleaning service`}
                  className="aspect-[16/10] w-full object-cover"
                  width={800}
                  height={500}
                  loading="lazy"
                />
                <div className="p-7 md:p-8">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-[1.3rem] bg-[linear-gradient(135deg,#dff0ea,#f2e8cf)] text-[#467968]">
                      <ServiceIcon icon={service.icon} className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="font-serif text-3xl leading-none text-[var(--color-foreground)]">
                        {service.title}
                      </h2>
                      <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#467968]">
                        Starting at ${service.startingPrice}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm leading-7 text-[#5d7871] md:text-base">
                    {service.description}
                  </p>

                  <div className="mt-8">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#728c85]">
                      What&apos;s Included
                    </h3>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {service.includes.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm leading-7 text-[#5d7871]"
                        >
                          <Check
                            className="mt-1 h-4 w-4 flex-shrink-0 text-[#467968]"
                            strokeWidth={2.2}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8">
                    <Button href="/quote" size="md">
                      Get a Quote
                      <ArrowRight className="h-4 w-4" strokeWidth={2} />
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-24">
        <Container>
          <div className="scroll-fade-up rounded-[2.5rem] bg-[linear-gradient(135deg,#1d4339_0%,#325d51_55%,#5d8f80_100%)] px-6 py-12 text-center shadow-[0_30px_90px_-42px_rgba(27,69,56,0.8)] md:px-10">
            <h2 className="font-serif text-4xl leading-none text-white md:text-5xl">
              Not sure which service you need?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/78 md:text-lg">
              Try the quote estimator for a fast starting point tailored to your
              home.
            </p>
            <div className="mt-8">
              <Button href="/quote" variant="secondary" size="lg">
                Free Quote Estimator
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
