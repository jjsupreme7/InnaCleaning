import { ArrowRight, Sparkles } from 'lucide-react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import BeforeAfterCard from '@/components/gallery/BeforeAfterCard';
import Button from '@/components/ui/Button';
import { galleryImages } from '@/data/images';

export const metadata = {
  title: 'Gallery | Inna Cleaning',
  description: 'See the before and after transformations from our professional cleaning services.',
};

const galleryItems = [
  { title: 'Kitchen Deep Clean', image: galleryImages[0] },
  { title: 'Bathroom Transformation', image: galleryImages[1] },
  { title: 'Living Room Refresh', image: galleryImages[2] },
  { title: 'Move-Out Full Clean', image: galleryImages[3] },
  { title: 'Oven & Appliance Detail', image: galleryImages[4] },
  { title: 'Bedroom & Closet Reset', image: galleryImages[5] },
];

export default function GalleryPage() {
  return (
    <section className="section-shell">
      <Container>
        <div className="mb-16 text-center">
          <span className="eyebrow scroll-fade-up">
            <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
            Gallery
          </span>
        </div>
        <SectionHeading
          title="Before & After"
          subtitle="See the difference a professional cleaning makes"
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <BeforeAfterCard
              key={item.title}
              title={item.title}
              image={item.image}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-6 text-sm leading-7 text-[#67827b]">
            Real photos coming soon. For now, these stock images show the kind
            of bright, polished finish you can expect.
          </p>
          <Button href="/quote" size="lg">
            Get Your Free Quote
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Button>
        </div>
      </Container>
    </section>
  );
}
