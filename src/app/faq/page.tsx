'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import Container from '@/components/ui/Container';
import FAQItemComponent from '@/components/faq/FAQItem';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';

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
              className="text-sm font-bold uppercase tracking-[0.3em] text-red-400 mb-3"
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
      <section className="py-16 md:py-24 bg-zinc-950">
        <Container>
          <div className="max-w-3xl mx-auto">
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
      <section className="relative py-20 bg-zinc-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-transparent to-transparent" />
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
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-[0.1em] uppercase mb-4">
              {t.cta.headline}
            </h2>
            <p className="text-zinc-400 mb-10 leading-relaxed">
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
