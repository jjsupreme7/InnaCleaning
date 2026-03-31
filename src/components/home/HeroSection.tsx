import Image from 'next/image';
import Button from '@/components/ui/Button';
import RotatingText from '@/components/ui/RotatingText';

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] items-end overflow-hidden pb-16 pt-24 lg:min-h-screen lg:items-center lg:pb-0 lg:pt-0">
      <Image
        src="/images/mansion.jpg"
        alt="Luxury home"
        fill
        className="object-cover object-center"
        priority
        quality={85}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-t from-red-950/30 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-red-400">
            Professional Home Cleaning
          </p>
          <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            A Spotless Home,
            <br />
            <span className="italic inline-flex overflow-hidden">
              <RotatingText
                texts={['Every Time', 'Every Visit', 'Guaranteed', 'Always']}
                rotationInterval={2500}
                staggerDuration={0.03}
                staggerFrom="first"
                mainClassName="italic"
              />
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 lg:text-xl">
            Reliable, detailed, and personally delivered cleaning services
            for homes that deserve the very best.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href="/quote" variant="primary" size="lg">
              Get Free Quote
            </Button>
            <Button
              href="/booking"
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
