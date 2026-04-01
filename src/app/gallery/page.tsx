'use client';

import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import BeforeAfterCard from '@/components/gallery/BeforeAfterCard';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';

export default function GalleryPage() {
  const { t } = useLanguage();
  const g = t.gallery;

  return (
    <>
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading title={g.title} subtitle={g.subtitle} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {g.items.map((title, i) => (
              <BeforeAfterCard key={title} title={title} index={i} before={g.before} after={g.after} />
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-zinc-500 text-sm mb-6">
              {g.photosSoon}
            </p>
            <Button href="/quote" variant="primary" size="lg">
              {g.getQuote}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
