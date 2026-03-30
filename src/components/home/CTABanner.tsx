import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function CTABanner() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-sky-600 via-sky-600 to-sky-700 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-[20%] w-64 h-64 bg-white/[0.04] rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-[10%] w-80 h-80 bg-white/[0.03] rounded-full blur-3xl" />
      </div>

      <Container>
        <div className="text-center relative z-10">
          <h2 className="text-2xl md:text-4xl uppercase tracking-[0.12em] font-bold text-white mb-5">
            Ready for a Sparkling Clean Home?
          </h2>
          <p className="text-sky-100 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Get your free estimate in under a minute. No commitment, no hassle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/quote" variant="secondary" size="lg">
              Get Free Quote
            </Button>
            <Button href="/booking" variant="outline" size="lg" className="border-white/80 text-white hover:bg-white hover:text-sky-600 hover:border-white">
              Book Now
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
