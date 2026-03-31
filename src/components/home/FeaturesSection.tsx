import Container from '@/components/ui/Container';
import { Shield, Leaf, Clock, Star, Sparkles, Lock } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Fully Insured',
    description: 'Bonded and insured for your peace of mind. Your home and belongings are always protected.',
  },
  {
    icon: Leaf,
    title: 'Eco-Friendly Products',
    description: 'Safe for kids, pets, and the planet. We use non-toxic, biodegradable cleaning solutions.',
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Morning, afternoon, or weekend — we work around your schedule, not the other way around.',
  },
  {
    icon: Star,
    title: 'Satisfaction Guaranteed',
    description: "Not happy with something? We'll come back and fix it at no charge.",
  },
  {
    icon: Sparkles,
    title: 'Detail-Obsessed',
    description: 'From baseboards to ceiling fans, nothing gets missed. Every clean is thorough, every time.',
  },
  {
    icon: Lock,
    title: 'Trusted & Vetted',
    description: 'Background checked and personally vetted. Feel confident welcoming us into your home.',
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-zinc-900">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-red-500">
              Why Choose Inna
            </p>
            <h2 className="text-3xl font-bold text-white lg:text-4xl">
              Quality and trust, built into every clean
            </h2>
            <p className="mt-4 leading-relaxed text-zinc-400">
              Every detail of our service is designed to give you confidence and a
              consistently spotless home — from eco-friendly products to our
              satisfaction guarantee.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-zinc-700 bg-zinc-950">
                    <feature.icon className="h-5 w-5 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{feature.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats panel */}
          <div className="grid grid-cols-2 gap-4 lg:mt-12">
            <div className="col-span-2 flex aspect-video items-center justify-center border border-zinc-800 bg-gradient-to-br from-red-950 to-zinc-900">
              <p className="text-sm uppercase tracking-widest text-zinc-600">Interior Photo</p>
            </div>
            <div className="flex flex-col justify-center bg-red-600 p-6">
              <p className="text-4xl font-bold text-white">5+</p>
              <p className="mt-1 text-sm text-red-100">Years of experience</p>
            </div>
            <div className="flex flex-col justify-center border border-zinc-800 bg-zinc-950 p-6">
              <p className="text-4xl font-bold text-white">0</p>
              <p className="mt-1 text-sm text-zinc-400">Complaints, ever</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
