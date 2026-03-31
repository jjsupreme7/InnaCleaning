import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function IntroSection() {
  return (
    <section className="py-16 md:py-24 bg-zinc-950">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Photo placeholder */}
          <div className="order-1 md:order-2">
            <div className="aspect-[4/5] bg-gradient-to-br from-red-950 to-zinc-900 flex items-center justify-center border border-zinc-800">
              <div className="text-center text-red-400">
                <svg className="w-16 h-16 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p className="text-sm uppercase tracking-widest font-medium">Photo Coming Soon</p>
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="order-2 md:order-1">
            <p className="text-red-500 text-sm uppercase tracking-[0.2em] font-bold mb-3">
              Welcome
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-snug">
              Hi, I&apos;m Inna — and I love making homes sparkle.
            </h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              With years of professional cleaning experience, I treat every home
              as if it were my own. I understand that inviting someone into your
              space requires trust, and I take that responsibility seriously.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-8">
              Whether you need a regular cleaning to maintain your space, a deep
              clean for that fresh start, or help preparing for a move — I&apos;m here
              to deliver results that exceed your expectations. Every time.
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div>
                <p className="text-3xl font-bold text-red-500">5+</p>
                <p className="text-xs uppercase tracking-widest text-zinc-500">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-red-500">200+</p>
                <p className="text-xs uppercase tracking-widest text-zinc-500">Happy Clients</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-red-500">100%</p>
                <p className="text-xs uppercase tracking-widest text-zinc-500">Satisfaction</p>
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
