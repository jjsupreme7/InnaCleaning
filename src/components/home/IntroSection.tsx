import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function IntroSection() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          {/* Photo placeholder */}
          <div className="order-1 md:order-2">
            <div className="aspect-[4/5] bg-gradient-to-br from-sky-50 to-sky-100 flex items-center justify-center rounded-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-sky-200/30 to-transparent" />
              <div className="text-center text-sky-400 relative z-10">
                <svg className="w-16 h-16 mx-auto mb-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p className="text-sm uppercase tracking-widest font-medium text-sky-400/80">Photo Coming Soon</p>
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="order-2 md:order-1">
            <p className="text-sky-600 text-sm uppercase tracking-[0.2em] font-bold mb-3 flex items-center gap-3">
              <span className="w-6 h-px bg-sky-500" />
              Welcome
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 leading-snug">
              Hi, I&apos;m Inna — and I love making homes sparkle.
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              With years of professional cleaning experience, I treat every home
              as if it were my own. I understand that inviting someone into your
              space requires trust, and I take that responsibility seriously.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Whether you need a regular cleaning to maintain your space, a deep
              clean for that fresh start, or help preparing for a move — I&apos;m here
              to deliver results that exceed your expectations. Every time.
            </p>
            <div className="flex flex-wrap gap-8 mb-10">
              {[
                { value: '5+', label: 'Years Experience' },
                { value: '200+', label: 'Happy Clients' },
                { value: '100%', label: 'Satisfaction' },
              ].map((stat) => (
                <div key={stat.label} className="relative">
                  <p className="text-3xl font-bold bg-gradient-to-r from-sky-500 to-sky-700 bg-clip-text text-transparent">{stat.value}</p>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mt-1">{stat.label}</p>
                </div>
              ))}
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
