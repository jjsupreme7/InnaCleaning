'use client';

import { useState } from 'react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { services } from '@/data/services';
import { Check } from 'lucide-react';

const categories = ['All', 'Regular', 'Deep Clean', 'Move', 'Airbnb'];

const categoryMap: Record<string, string> = {
  standard: 'Regular',
  deep: 'Deep Clean',
  move: 'Move',
  airbnb: 'Airbnb',
};

const popularId = 'deep';

export default function ServicesPreview() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered =
    activeFilter === 'All'
      ? services
      : services.filter((s) => categoryMap[s.id] === activeFilter);

  return (
    <section className="py-16 md:py-24 bg-zinc-950">
      <Container>
        <div className="mb-10 max-w-xl">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-red-500">
            Services & Pricing
          </p>
          <h2 className="text-3xl font-bold text-white lg:text-4xl">
            Find the right clean for your home
          </h2>
          <p className="mt-3 leading-relaxed text-zinc-400">
            From quick turnaround visits to top-to-bottom deep cleans.
            Every service tailored to your home.
          </p>
        </div>

        {/* Filter chips */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`min-h-[44px] px-5 py-2 text-sm font-bold uppercase tracking-widest transition-colors ${
                activeFilter === cat
                  ? 'bg-red-600 text-white'
                  : 'border border-zinc-700 bg-zinc-900 text-zinc-400 hover:border-red-600 hover:text-red-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((service) => (
            <div
              key={service.id}
              className={`relative flex flex-col gap-4 border p-6 transition-shadow hover:shadow-lg hover:shadow-red-950/20 ${
                service.id === popularId
                  ? 'border-red-600 bg-zinc-900'
                  : 'border-zinc-800 bg-zinc-900'
              }`}
            >
              {service.id === popularId && (
                <span className="absolute right-3 top-3 bg-red-600 px-2 py-1 text-xs font-bold uppercase tracking-widest text-white">
                  Most Popular
                </span>
              )}

              <div>
                <p className="mb-2 text-2xl">{service.icon}</p>
                <h3 className="font-bold text-white">{service.title}</h3>
                <p className="mt-1 text-sm text-zinc-500">
                  {service.description.substring(0, 80)}…
                </p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">${service.startingPrice}</span>
                <span className="text-sm text-zinc-500">starting</span>
              </div>

              <ul className="flex flex-col gap-1.5">
                {service.includes.slice(0, 3).map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-zinc-400">
                    <Check className="h-3.5 w-3.5 shrink-0 text-red-500" />
                    {item}
                  </li>
                ))}
              </ul>

              <Button
                href="/services"
                variant={service.id === popularId ? 'primary' : 'outline'}
                size="sm"
                className="mt-auto"
              >
                Learn More
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
