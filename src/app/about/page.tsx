'use client';

import Image from 'next/image';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import FlipCard from '@/components/ui/FlipCard';
import { Shield, Leaf, Star, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import BorderBeam from '@/components/ui/BorderBeam';

export default function AboutPage() {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <>
      {/* Hero */}
      <section className="theme-transition py-20 md:py-28" style={{ background: 'var(--section-alt)' }}>
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="theme-transition border rounded-xl px-8 py-12 md:px-14 md:py-16 relative" style={{ borderColor: 'var(--card-border)' }}>
              <BorderBeam />
              {/* Top accent line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-red-500" />
              <p className="text-red-500 text-sm uppercase tracking-[0.2em] font-bold mb-3">
                {a.badge}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold font-display mb-6" style={{ color: 'var(--text-primary)' }}>
                {a.headline}
              </h1>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {a.intro}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Story */}
      <section className="theme-transition py-20 md:py-28" style={{ background: 'var(--bg-elevated)' }}>
        <Container>
          <div className="theme-transition border rounded-xl p-4 md:p-8 relative" style={{ borderColor: 'var(--card-border)' }}>
            <BorderBeam />
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-[2px] bg-red-500" />
            <div className="absolute top-0 left-0 w-[2px] h-8 bg-red-500" />
            <div className="absolute bottom-0 right-0 w-8 h-[2px] bg-red-500" />
            <div className="absolute bottom-0 right-0 w-[2px] h-8 bg-red-500" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Flip Card */}
              <FlipCard
                trigger="hover"
                direction="horizontal"
                duration={700}
                perspective={1200}
                className="aspect-[4/5] cursor-pointer"
                front={
                  <div className="w-full h-full relative overflow-hidden rounded-xl shadow-lg shadow-black/15">
                    <Image
                      src="/inna-about.jpg"
                      alt="Inna Rohovska — professional cleaner in Western Washington"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-white text-2xl font-bold font-display">Inna Rohovska</p>
                      <p className="text-white/70 text-sm mt-1 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" strokeWidth={2} />
                        Western Washington
                      </p>
                    </div>
                    <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                      Owner
                    </div>
                  </div>
                }
                back={
                  <div
                    className="w-full h-full rounded-xl border shadow-lg shadow-black/15 flex flex-col items-center justify-center p-8 text-center"
                    style={{ background: 'var(--bg-elevated)', borderColor: 'var(--card-border)' }}
                  >
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-red-500 mb-4 relative">
                      <Image
                        src="/inna-about.jpg"
                        alt="Inna"
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <p className="text-xl font-bold font-display mb-1" style={{ color: 'var(--text-primary)' }}>Inna Rohovska</p>
                    <p className="text-xs uppercase tracking-widest text-red-500 font-bold mb-6">Professional Cleaner</p>

                    <div className="grid grid-cols-3 gap-4 w-full mb-8">
                      <div>
                        <p className="text-2xl font-bold text-red-500">5+</p>
                        <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>Years Experience</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-red-500">327+</p>
                        <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>Homes Cleaned</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-red-500">5.0</p>
                        <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>Avg Rating</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2.5 w-full">
                      <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                        <Shield className="w-4 h-4 text-red-500 shrink-0" strokeWidth={2} />
                        <span>Fully Insured & Bonded</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                        <Leaf className="w-4 h-4 text-red-500 shrink-0" strokeWidth={2} />
                        <span>Eco-Friendly Products</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                        <Star className="w-4 h-4 text-red-500 shrink-0" strokeWidth={2} />
                        <span>100% Satisfaction Guarantee</span>
                      </div>
                    </div>
                  </div>
                }
              />

              <div>
                <h2 className="text-2xl font-bold font-display mb-6 uppercase tracking-widest" style={{ color: 'var(--text-primary)' }}>
                  {a.storyHeading}
                </h2>
                <div className="space-y-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {a.storyParagraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="theme-transition py-20 md:py-28" style={{ background: 'var(--section-alt)' }}>
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold font-display mb-10 uppercase tracking-widest text-center" style={{ color: 'var(--text-primary)' }}>
              {a.valuesHeading}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {a.values.map((val) => (
                <div
                  key={val.title}
                  className="theme-transition text-center border rounded-xl px-6 py-8 relative group transition-colors duration-300"
                  style={{ borderColor: 'var(--card-border)' }}
                >
                  <BorderBeam />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-red-500/80 group-hover:w-12 transition-all duration-300" />
                  <h3 className="text-sm uppercase tracking-widest font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
                    {val.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Guarantees */}
      <section className="theme-transition py-20 md:py-28" style={{ background: 'var(--bg-elevated)' }}>
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold font-display mb-6 uppercase tracking-widest" style={{ color: 'var(--text-primary)' }}>
              {a.promiseHeading}
            </h2>
            <div className="space-y-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
              {[a.promise1, a.promise2, a.promise3].map((promise, i) => (
                <div
                  key={i}
                  className="theme-transition border rounded-xl p-5 flex items-center gap-4 relative transition-colors duration-300"
                  style={{ borderColor: 'var(--card-border)' }}
                >
                  <BorderBeam />
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
