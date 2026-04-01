import Image from 'next/image';
import { ArrowRight, Leaf, ShieldCheck, Sparkles } from 'lucide-react';
import { siteImages } from '@/data/images';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function IntroSection() {
  return (
    <section className="section-shell">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-[0.92fr_1.08fr]">
          <div className="scroll-fade-up order-2 md:order-1">
            <div className="relative overflow-hidden rounded-[2.2rem] shadow-[0_30px_70px_-34px_rgba(27,69,56,0.46)]">
              <Image
                src={siteImages.aboutInna}
                alt="Professional cleaner holding a broom in a bright kitchen"
                className="aspect-[4/5] w-full object-cover"
                width={600}
                height={750}
                loading="lazy"
              />
              <div className="absolute inset-x-6 bottom-6 rounded-[1.6rem] border border-white/40 bg-white/70 px-5 py-4 backdrop-blur-md">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6e8a82]">
                  Detail-first care
                </p>
                <p className="mt-2 text-sm leading-7 text-[#4e6d64]">
                  Thoughtful cleaning that feels personal, not rushed.
                </p>
              </div>
            </div>
          </div>

          <div className="scroll-fade-up order-1 md:order-2">
            <span className="eyebrow">
              <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
              Welcome
            </span>
            <h2 className="mt-6 font-serif text-4xl leading-tight text-[var(--color-foreground)] md:text-5xl">
              Hi, I&apos;m Inna — and I love making homes sparkle.
            </h2>
            <p className="mt-6 text-base leading-8 text-[#5e7972] md:text-lg">
              With years of professional cleaning experience, I treat every home
              as if it were my own. I understand that inviting someone into your
              space requires trust, and I take that responsibility seriously.
            </p>
            <p className="mt-4 text-base leading-8 text-[#5e7972] md:text-lg">
              Whether you need a regular cleaning to maintain your space, a deep
              clean for that fresh start, or help preparing for a move — I&apos;m here
              to deliver results that exceed your expectations. Every time.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                {
                  icon: ShieldCheck,
                  title: 'Trusted',
                  text: 'Respectful, reliable visits every time.',
                },
                {
                  icon: Leaf,
                  title: 'Fresh',
                  text: 'Gentle products and a calm, clean finish.',
                },
                {
                  icon: Sparkles,
                  title: 'Detailed',
                  text: 'No rushed cleanups or missed corners.',
                },
              ].map((item) => (
                <div key={item.title} className="soft-card p-5">
                  <item.icon className="h-5 w-5 text-[#467968]" strokeWidth={1.8} />
                  <h3 className="mt-4 font-semibold text-[var(--color-foreground)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#67827b]">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-8">
              {[
                { value: '5+', label: 'Years Experience' },
                { value: '200+', label: 'Happy Clients' },
                { value: '100%', label: 'Satisfaction' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-4xl text-[#467968]">{stat.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#718b84]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Button href="/about" variant="outline" size="md">
                My Story
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
