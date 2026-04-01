import { ArrowRight, Check, House, Leaf, ShieldCheck, Sparkles } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { siteImages } from '@/data/images';

export const metadata = {
  title: 'About | Inna Cleaning',
  description: 'Meet Inna Rohovska — professional cleaner serving the Western Washington area with years of experience, care, and attention to detail.',
};

export default function AboutPage() {
  return (
    <>
      <section className="section-shell">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-[0.95fr_1.05fr]">
            <div className="scroll-fade-up">
              <span className="eyebrow">
                <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
                About
              </span>
              <h1 className="mt-6 font-serif text-5xl leading-[0.95] text-[var(--color-foreground)] md:text-6xl">
                Hi, I&apos;m Inna Rohovska
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-[#617d76] md:text-lg">
                Professional cleaner based in Western Washington, dedicated to
                making every home shine with care, consistency, and calm.
              </p>
            </div>

            <div className="scroll-fade-up relative overflow-hidden rounded-[2.4rem] shadow-[0_30px_80px_-40px_rgba(27,69,56,0.52)]">
              <img
                src={siteImages.aboutInna}
                alt="Professional cleaner standing in a bright kitchen"
                className="aspect-[6/5] w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_46%,rgba(18,52,43,0.56)_100%)]" />
              <div className="absolute inset-x-6 bottom-6 rounded-[1.6rem] border border-white/25 bg-white/16 px-5 py-4 text-white backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/72">
                  Sole proprietor
                </p>
                <p className="mt-2 text-sm leading-7 text-white/88">
                  A personal relationship, thoughtful service, and dependable results.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-24">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="panel-card scroll-fade-up p-7 md:p-8">
              <h2 className="font-serif text-4xl leading-none text-[var(--color-foreground)]">
                My Story
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-7 text-[#5d7871] md:text-base">
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

            <div className="grid gap-4">
              {[
                {
                  icon: ShieldCheck,
                  title: 'Reliability',
                  desc: 'I show up on time, every time. You can count on me.',
                },
                {
                  icon: Sparkles,
                  title: 'Attention to Detail',
                  desc: 'No corner is overlooked. I clean with care and precision.',
                },
                {
                  icon: House,
                  title: 'Trust',
                  desc: 'Your home, your rules. I treat every space with respect.',
                },
              ].map((value) => (
                <div key={value.title} className="soft-card scroll-fade-up p-6">
                  <value.icon className="h-5 w-5 text-[#467968]" strokeWidth={1.8} />
                  <h3 className="mt-4 text-xl font-semibold text-[var(--color-foreground)]">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#67827b]">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20 md:pb-24">
        <Container>
          <div className="scroll-fade-up rounded-[2.5rem] bg-[linear-gradient(135deg,#17352d_0%,#2e594d_55%,#5d8f80_100%)] px-6 py-12 text-center shadow-[0_30px_90px_-42px_rgba(27,69,56,0.8)] md:px-10">
            <h2 className="font-serif text-4xl leading-none text-white md:text-5xl">
              My Promise to You
            </h2>
            <div className="mx-auto mt-8 max-w-3xl space-y-4 text-sm text-white/86">
              <div className="flex items-center gap-4 rounded-[1.6rem] border border-white/14 bg-white/10 p-5 text-left backdrop-blur-md">
                <Check className="h-5 w-5 flex-shrink-0 text-[#dff0ea]" strokeWidth={2.4} />
                <span>100% Satisfaction Guarantee — not happy? I&apos;ll re-clean for free.</span>
              </div>
              <div className="flex items-center gap-4 rounded-[1.6rem] border border-white/14 bg-white/10 p-5 text-left backdrop-blur-md">
                <ShieldCheck className="h-5 w-5 flex-shrink-0 text-[#dff0ea]" strokeWidth={2.2} />
                <span>Fully Insured — your home is protected.</span>
              </div>
              <div className="flex items-center gap-4 rounded-[1.6rem] border border-white/14 bg-white/10 p-5 text-left backdrop-blur-md">
                <Leaf className="h-5 w-5 flex-shrink-0 text-[#dff0ea]" strokeWidth={2.2} />
                <span>Eco-Friendly Products — safe for your family and pets.</span>
              </div>
            </div>

            <div className="mt-10">
              <Button href="/quote" variant="primary" size="lg">
                Get Your Free Quote
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
