import Button from '@/components/ui/Button';

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center bg-slate-900 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 animate-gradient" />

      {/* Decorative floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-[10%] w-32 h-32 border border-white/[0.06] rounded-full animate-float" />
        <div className="absolute top-[40%] right-[8%] w-48 h-48 border border-sky-400/[0.08] rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[15%] left-[15%] w-24 h-24 border border-white/[0.04] rounded-full animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute top-[25%] left-[50%] w-64 h-64 bg-sky-500/[0.03] rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-[20%] right-[20%] w-80 h-80 bg-sky-400/[0.03] rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }} />
      </div>

      {/* Shimmer overlay */}
      <div className="absolute inset-0 animate-shimmer" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <p className="animate-fade-in-up text-sky-400 text-sm uppercase tracking-[0.35em] font-bold mb-6 flex items-center justify-center gap-3">
          <span className="w-8 h-px bg-sky-400/60" />
          Professional Home Cleaning
          <span className="w-8 h-px bg-sky-400/60" />
        </p>
        <h1 className="animate-fade-in-up-delay-1 text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight font-bold">
          A Spotless Home,
          <br />
          <span className="bg-gradient-to-r from-sky-300 to-sky-500 bg-clip-text text-transparent italic">
            Every Time
          </span>
        </h1>
        <p className="animate-fade-in-up-delay-2 text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          Reliable, detailed, and personally delivered cleaning services
          in the greater Seattle area. Your home deserves the best.
        </p>
        <div className="animate-fade-in-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/quote" variant="primary" size="lg">
            Get Free Quote
          </Button>
          <Button href="/booking" variant="outline" size="lg" className="border-white/80 text-white hover:bg-white hover:text-slate-800">
            Book Now
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="animate-fade-in-up-delay-3 mt-14 flex flex-wrap items-center justify-center gap-6 text-gray-500 text-xs uppercase tracking-widest">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            Insured
          </span>
          <span className="w-px h-3 bg-gray-700" />
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            Eco-Friendly
          </span>
          <span className="w-px h-3 bg-gray-700" />
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
            100% Satisfaction
          </span>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
