import Image from 'next/image';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'About | Inna Cleaning',
  description: 'Meet Inna Rohovska — professional cleaner serving the Western Washington area with years of experience, care, and attention to detail.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50 to-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sky-600 text-sm uppercase tracking-[0.2em] font-bold mb-3 flex items-center justify-center gap-3">
              <span className="w-6 h-px bg-sky-500" />
              About
              <span className="w-6 h-px bg-sky-500" />
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Hi, I&apos;m Inna Rohovska
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              Professional cleaner based in Western Washington, dedicated to making
              every home shine.
            </p>
          </div>
        </Container>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
            {/* Photo */}
            <div className="aspect-[4/5] relative overflow-hidden rounded-sm shadow-xl shadow-gray-200/50">
              <Image
                src="/inna-about.jpg"
                alt="Inna Rohovska — professional cleaner in Western Washington"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 uppercase tracking-widest flex items-center gap-3">
                <span className="w-6 h-px bg-sky-500" />
                My Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  I&apos;m Inna Rohovska, a sole proprietor and professional cleaner
                  based in the Western Washington area. I started my cleaning
                  business because I believe everyone deserves to come home to a
                  clean, fresh, and comfortable space — without the stress of
                  doing it themselves.
                </p>
                <p>
                  With multiple years of professional cleaning experience, I&apos;ve
                  built my reputation on trust, reliability, and an obsessive
                  attention to detail. Whether it&apos;s a cozy apartment, a large
                  family home, or anything in between — I can serve any type of
                  home and tailor my cleaning to your specific needs.
                </p>
                <p>
                  I understand that letting someone into your home requires trust.
                  That&apos;s why I take the time to learn your preferences, respect your
                  space, and deliver consistent results every single time.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-gray-50">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 uppercase tracking-widest text-center">
              What I Stand For
            </h2>
            <div className="mx-auto w-12 h-0.5 bg-sky-500 mb-12" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { title: 'Reliability', desc: 'I show up on time, every time. You can count on me.', icon: '🕐' },
                { title: 'Attention to Detail', desc: 'No corner is overlooked. I clean with care and precision.', icon: '🔍' },
                { title: 'Trust', desc: 'Your home, your rules. I treat every space with respect.', icon: '🤝' },
              ].map((val) => (
                <div key={val.title} className="text-center bg-white rounded-sm p-7 border border-gray-100 hover:shadow-lg hover:shadow-gray-100 transition-all duration-300">
                  <div className="text-3xl mb-4">{val.icon}</div>
                  <h3 className="text-sm uppercase tracking-widest font-bold text-slate-800 mb-3">
                    {val.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Guarantees */}
      <section className="py-20 md:py-28 bg-white">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 uppercase tracking-widest">
              My Promise to You
            </h2>
            <div className="mx-auto w-12 h-0.5 bg-sky-500 mb-10" />
            <div className="space-y-4 text-sm text-gray-600">
              {[
                '100% Satisfaction Guarantee — not happy? I\'ll re-clean for free.',
                'Fully Insured — your home is protected.',
                'Eco-Friendly Products — safe for your family and pets.',
              ].map((promise) => (
                <div key={promise} className="border border-gray-200 rounded-sm p-5 flex items-center gap-4 hover:border-sky-200 hover:bg-sky-50/30 transition-all duration-300">
                  <div className="w-7 h-7 rounded-full bg-sky-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>{promise}</span>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Button href="/quote" variant="primary" size="lg">
                Get Your Free Quote
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
