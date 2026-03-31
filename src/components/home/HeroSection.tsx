import Button from '@/components/ui/Button';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-black">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-red-950/70" />

      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 border border-red-600" />
        <div className="absolute bottom-20 right-10 w-60 h-60 border border-red-600" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-red-600" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="text-red-400 text-sm uppercase tracking-[0.3em] font-bold mb-6">
          Professional Home Cleaning
        </p>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight">
          A Spotless Home,
          <br />
          <span className="italic">Every Time</span>
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Reliable, detailed, and personally delivered cleaning services
          in the greater Seattle area. Your home deserves the best.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/quote" variant="primary" size="lg">
            Get Free Quote
          </Button>
          <Button href="/booking" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-black">
            Book Now
          </Button>
        </div>
      </div>
    </section>
  );
}
