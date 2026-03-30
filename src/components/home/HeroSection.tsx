import Button from '@/components/ui/Button';
import { Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&auto=format&fit=crop&q=80"
        alt="Bright, clean modern living room"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Warm overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/80 via-stone-900/70 to-teal-800/60" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full mb-8 animate-fade-in-up">
          <Sparkles className="w-4 h-4 text-teal-300" />
          Professional Home Cleaning · Seattle Area
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight font-bold animate-fade-in-up-delay-1">
          A Spotless Home,
          <br />
          <span className="text-teal-300 italic font-light">Every Time</span>
        </h1>

        <p className="text-stone-200 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up-delay-2">
          Reliable, detailed, and personally delivered cleaning services
          in the greater Seattle area. Your home deserves the best.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up-delay-3">
          <Button href="/quote" variant="primary" size="lg">
            Get Free Quote
          </Button>
          <Button href="/booking" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-teal-800">
            Book Now
          </Button>
        </div>
      </div>
    </section>
  );
}
