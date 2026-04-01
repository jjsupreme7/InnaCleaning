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
      <section className="py-16 md:py-24 bg-zinc-900">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-red-500 text-sm uppercase tracking-[0.2em] font-bold mb-3">
              {a.badge}
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {a.headline}
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              {a.intro}
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
                {a.storyHeading}
              </h2>
              <div className="space-y-4 text-zinc-400 leading-relaxed">
                <p>{a.story1}</p>
                <p>{a.story2}</p>
                <p>{a.story3}</p>
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
              {a.valuesHeading}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {a.values.map((val) => (
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
              {a.promiseHeading}
            </h2>
            <div className="space-y-4 text-sm text-zinc-400">
              <div className="border border-zinc-800 p-5 flex items-center gap-4">
                <span className="text-red-500 text-xl">&#10003;</span>
                <span>{a.promise1}</span>
              </div>
              <div className="border border-zinc-800 p-5 flex items-center gap-4">
                <span className="text-red-500 text-xl">&#10003;</span>
                <span>{a.promise2}</span>
              </div>
              <div className="border border-zinc-800 p-5 flex items-center gap-4">
                <span className="text-red-500 text-xl">&#10003;</span>
                <span>{a.promise3}</span>
              </div>
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
