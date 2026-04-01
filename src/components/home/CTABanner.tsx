import { ArrowRight, CalendarDays } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function CTABanner() {
  return (
    <section className="section-shell">
      <Container>
        <div className="scroll-fade-up relative overflow-hidden rounded-[2.5rem] bg-[linear-gradient(135deg,#1d4339_0%,#325d51_55%,#5d8f80_100%)] px-6 py-12 text-center shadow-[0_30px_90px_-42px_rgba(27,69,56,0.8)] md:px-10 md:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(224,207,168,0.18),transparent_24%)]" />
          <div className="relative">
            <h2 className="font-serif text-4xl leading-none text-white md:text-5xl">
            Ready for a Sparkling Clean Home?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-white/78 md:text-lg">
            Get your free estimate in under a minute. No commitment, no hassle.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button href="/quote" variant="secondary" size="lg">
                Get Free Quote
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Button>
              <Button
                href="/booking"
                variant="outline"
                size="lg"
                className="border-white/60 text-white hover:bg-white/12 hover:text-white"
              >
                <CalendarDays className="h-4 w-4" strokeWidth={1.8} />
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
