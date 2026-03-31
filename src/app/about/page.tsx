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
      <section className="py-16 md:py-24 bg-zinc-900">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-red-500 text-sm uppercase tracking-[0.2em] font-bold mb-3">
              About
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Hi, I&apos;m Inna Rohovska
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Professional cleaner based in Western Washington, dedicated to making
              every home shine.
            </p>
          </div>
        </Container>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24 bg-zinc-950">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Photo */}
            <div className="aspect-[4/5] relative overflow-hidden">
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
              <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest">
                My Story
              </h2>
              <div className="space-y-4 text-zinc-400 leading-relaxed">
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
      <section className="py-16 md:py-24 bg-zinc-900">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-10 uppercase tracking-widest text-center">
              What I Stand For
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { title: 'Reliability', desc: 'I show up on time, every time. You can count on me.' },
                { title: 'Attention to Detail', desc: 'No corner is overlooked. I clean with care and precision.' },
                { title: 'Trust', desc: 'Your home, your rules. I treat every space with respect.' },
              ].map((val) => (
                <div key={val.title} className="text-center">
                  <h3 className="text-sm uppercase tracking-widest font-bold text-white mb-3">
                    {val.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Guarantees */}
      <section className="py-16 md:py-24 bg-zinc-950">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-widest">
              My Promise to You
            </h2>
            <div className="space-y-4 text-sm text-zinc-400">
              <div className="border border-zinc-800 p-5 flex items-center gap-4">
                <span className="text-red-500 text-xl">&#10003;</span>
                <span>100% Satisfaction Guarantee — not happy? I&apos;ll re-clean for free.</span>
              </div>
              <div className="border border-zinc-800 p-5 flex items-center gap-4">
                <span className="text-red-500 text-xl">&#10003;</span>
                <span>Fully Insured — your home is protected.</span>
              </div>
              <div className="border border-zinc-800 p-5 flex items-center gap-4">
                <span className="text-red-500 text-xl">&#10003;</span>
                <span>Eco-Friendly Products — safe for your family and pets.</span>
              </div>
            </div>

            <div className="mt-10">
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
