import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function IntroSection() {
  return (
    <section className="py-16 md:py-24 bg-stone-50">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <div className="order-1 md:order-2">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&auto=format&fit=crop&q=80"
                alt="Professional cleaner at work in a bright kitchen"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text content */}
          <div className="order-2 md:order-1">
            <p className="text-teal-600 text-sm font-semibold uppercase tracking-widest mb-3">
              Welcome
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-stone-800 mb-6 leading-snug">
              Hi, I&apos;m Inna — and I love making homes sparkle.
            </h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              With years of professional cleaning experience, I treat every home
              as if it were my own. I understand that inviting someone into your
              space requires trust, and I take that responsibility seriously.
            </p>
            <p className="text-stone-600 leading-relaxed mb-8">
              Whether you need a regular cleaning to maintain your space, a deep
              clean for that fresh start, or help preparing for a move — I&apos;m here
              to deliver results that exceed your expectations. Every time.
            </p>
            <div className="flex flex-wrap gap-8 mb-8">
              <div>
                <p className="text-3xl font-bold text-teal-600">5+</p>
                <p className="text-xs uppercase tracking-widest text-stone-500 mt-1">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-teal-600">200+</p>
                <p className="text-xs uppercase tracking-widest text-stone-500 mt-1">Happy Clients</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-teal-600">100%</p>
                <p className="text-xs uppercase tracking-widest text-stone-500 mt-1">Satisfaction</p>
              </div>
            </div>
            <Button href="/about" variant="outline" size="md">
              My Story
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
