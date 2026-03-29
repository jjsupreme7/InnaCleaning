import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import BeforeAfterCard from '@/components/gallery/BeforeAfterCard';
import Button from '@/components/ui/Button';

export const metadata = {
  title: 'Gallery | Inna Cleaning',
  description: 'See the before and after transformations from our professional cleaning services.',
};

const galleryItems = [
  'Kitchen Deep Clean',
  'Bathroom Transformation',
  'Living Room Refresh',
  'Move-Out Full Clean',
  'Oven & Appliance Detail',
  'Bedroom & Closet Reset',
];

export default function GalleryPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            title="Before & After"
            subtitle="See the difference a professional cleaning makes"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((title, i) => (
              <BeforeAfterCard key={title} title={title} index={i} />
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm mb-6">
              Real photos coming soon! Want to see your home transformed?
            </p>
            <Button href="/quote" variant="primary" size="lg">
              Get Your Free Quote
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
