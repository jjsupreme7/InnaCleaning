'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import Container from '@/components/ui/Container';
import FAQItemComponent from '@/components/faq/FAQItem';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';
import BorderBeam from '@/components/ui/BorderBeam';

export default function FAQPage() {
  const { t } = useLanguage();
  const f = t.faq;

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[320px] max-h-[480px] flex items-end overflow-hidden">
        <Image
          src="/images/clean-interior.jpg"
          alt="Clean modern kitchen interior"
          fill
          className="object-cover object-center"
          priority
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

        <div className="relative z-10 w-full pb-10">
          <Container>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-bold uppercase tracking-[0.3em] text-red-600 mb-3"
            >
              FAQ
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold text-white tracking-[0.08em] uppercase"
            >
              {f.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-3 text-lg text-white/60"
            >
              {f.subtitle}
            </motion.p>
          </Container>
        </div>
      </section>

      {/* FAQ Items */}
      <section className="theme-transition py-20 md:py-28" style={{ background: 'var(--bg-elevated)' }}>
        <Container>
          <div className="max-w-3xl mx-auto border rounded-xl p-4 md:p-8 relative" style={{ borderColor: 'var(--card-border)' }}>
            <BorderBeam />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-red-500" />
            {f.items.map((item, i) => (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 * i }}
              >
                <FAQItemComponent
                  question={item.question}
                  answer={item.answer}
                  index={i + 1}
                />
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="theme-transition relative py-20 md:py-28 overflow-hidden" style={{ background: 'var(--section-alt)' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/60 via-transparent to-transparent" />
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-xl mx-auto"
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-red-400 mb-4">
              {f.stillHave}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold font-display tracking-[0.1em] uppercase mb-4" style={{ color: 'var(--text-primary)' }}>
              {t.cta.headline}
            </h2>
            <p className="mb-10 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {t.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="outline" size="lg">
                {f.contact}
              </Button>
              <Button href="/quote" variant="primary" size="lg">
                {f.getQuote}
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  );
}
