import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function CTABanner() {
  return (
    <section className="py-16 md:py-24 bg-teal-600">
      <Container>
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready for a Sparkling Clean Home?
          </h2>
          <p className="text-teal-100 text-lg mb-8 max-w-xl mx-auto">
            Get your free estimate in under a minute. No commitment, no hassle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/quote" variant="secondary" size="lg">
              Get Free Quote
            </Button>
            <Button href="/booking" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-teal-700">
              Book Now
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
