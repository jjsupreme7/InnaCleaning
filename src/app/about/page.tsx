'use client';

import Image from 'next/image';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-zinc-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="border border-zinc-200 rounded-xl px-8 py-12 md:px-14 md:py-16 relative">
              {/* Top accent line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-red-500" />
              <p className="text-red-500 text-sm uppercase tracking-[0.2em] font-bold mb-3">
                {a.badge}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 font-display mb-6">
                {a.headline}
              </h1>
              <p className="text-zinc-600 text-lg leading-relaxed">
                {a.intro}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28 bg-white">
        <Container>
          <div className="border border-zinc-200 rounded-xl p-4 md:p-8 relative">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-[2px] bg-red-500" />
            <div className="absolute top-0 left-0 w-[2px] h-8 bg-red-500" />
            <div className="absolute bottom-0 right-0 w-8 h-[2px] bg-red-500" />
            <div className="absolute bottom-0 right-0 w-[2px] h-8 bg-red-500" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Photo */}
              <div className="aspect-[4/5] relative overflow-hidden border border-zinc-200">
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
                <h2 className="text-2xl font-bold text-zinc-900 font-display mb-6 uppercase tracking-widest">
                  {a.storyHeading}
                </h2>
                <div className="space-y-4 text-zinc-600 leading-relaxed">
                  {a.storyParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Visual Break — Sunset Lake */}
      <section className="relative h-[35vh] min-h-[240px] max-h-[400px] overflow-hidden">
        <Image
          src="/images/sunset-lake.jpg"
          alt="Peaceful misty lake at sunset"
          fill
          className="object-cover object-center"
          quality={85}
        />
        <div className="absolute inset-0 bg-black/30" />
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 bg-zinc-50">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-zinc-900 font-display mb-10 uppercase tracking-widest text-center">
              {a.valuesHeading}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {a.values.map((val) => (
                <div
                  key={val.title}
                  className="text-center border border-zinc-200 rounded-xl px-6 py-8 relative group hover:border-zinc-300 transition-colors duration-300"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-red-500/80 group-hover:w-12 transition-all duration-300" />
                  <h3 className="text-sm uppercase tracking-widest font-bold text-zinc-900 mb-3">
                    {val.title}
                  </h3>
                  <p className="text-zinc-600 text-sm leading-relaxed">
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
            <h2 className="text-2xl font-bold text-zinc-900 font-display mb-6 uppercase tracking-widest">
              {a.promiseHeading}
            </h2>
            <div className="space-y-4 text-sm text-zinc-600">
              {[a.promise1, a.promise2, a.promise3].map((promise, i) => (
                <div
                  key={i}
                  className="border border-zinc-200 rounded-xl p-5 flex items-center gap-4 relative hover:border-zinc-300 transition-colors duration-300"
                >
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-6 bg-red-500" />
                  <span className="text-red-500 text-xl">&#10003;</span>
                  <span>{promise}</span>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Button href="/quote" variant="primary" size="lg">
                {a.getQuote}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
