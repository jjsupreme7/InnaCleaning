import { ArrowRight, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { siteImages } from '@/data/images';
import { services } from '@/data/services';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import ServiceIcon from '@/components/ui/ServiceIcon';

const stats = [
  { value: '5+', label: 'Years Experience' },
  { value: '200+', label: 'Happy Clients' },
  { value: '100%', label: 'Satisfaction' },
];

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${siteImages.heroHome})` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(16,44,37,0.84)_0%,rgba(24,56,47,0.72)_42%,rgba(41,84,72,0.26)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.26),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(103,163,146,0.34),transparent_22%)]" />

      <Container className="relative">
        <div className="grid min-h-[calc(100vh-5rem)] items-end gap-8 py-24 md:min-h-[calc(100vh-6rem)] md:grid-cols-[1.1fr_0.9fr] md:py-28 lg:py-32">
          <div className="max-w-3xl">
            <span className="eyebrow scroll-fade-up">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
              Professional home cleaning
            </span>

            <h1 className="scroll-fade-up mt-7 font-serif text-5xl leading-[0.95] text-white md:text-7xl">
              A spotless home,
              <span className="mt-2 block text-[#d8efe7] italic">
                every time.
              </span>
            </h1>

            <p className="scroll-fade-up mt-6 max-w-2xl text-lg leading-8 text-white/84 md:text-xl">
              Reliable, detailed, and personally delivered cleaning services in
              the greater Seattle area. Your home deserves a warm, welcoming
              reset that actually lasts.
            </p>

            <div className="scroll-fade-up mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href="/quote" size="lg">
                Get Free Quote
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Button>
              <Button
                href="/booking"
                variant="outline"
                size="lg"
                className="border-white/60 text-white hover:bg-white/12 hover:text-white"
              >
                Book Now
              </Button>
            </div>

            <div className="scroll-fade-up mt-10 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.75rem] border border-white/16 bg-white/12 px-5 py-5 backdrop-blur-md"
                >
                  <p className="font-serif text-4xl text-white">{stat.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="scroll-fade-up panel-card p-6 text-[var(--color-foreground)] md:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#68857d]">
                  Why homeowners stay
                </p>
                <h2 className="mt-2 font-serif text-3xl leading-none">
                  Personal service with a polished finish
                </h2>
              </div>
              <div className="hidden items-center gap-2 rounded-full bg-[#e2f0ea] px-3 py-2 text-sm font-semibold text-[#467968] sm:flex">
                <Star
                  className="h-4 w-4 fill-[#f2c869] text-[#f2c869]"
                  strokeWidth={1.8}
                />
                <span>5-star care</span>
              </div>
            </div>

            <div className="space-y-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center gap-4 rounded-[1.5rem] border border-[#d7e7e1] bg-white/88 px-4 py-4"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e7f1ed] text-[#467968]">
                    <ServiceIcon icon={service.icon} className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{service.title}</p>
                    <p className="text-sm text-[#6f8882]">
                      Starting at ${service.startingPrice}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-[1.5rem] bg-[#edf5ee] px-4 py-4 text-sm leading-7 text-[#5d7871]">
              <ShieldCheck
                className="mt-1 h-5 w-5 flex-shrink-0 text-[#467968]"
                strokeWidth={1.8}
              />
              <p>
                Fast online estimate, flexible recurring cleanings, and a calm,
                detail-first approach from start to finish.
              </p>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
