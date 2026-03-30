import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import BookingForm from '@/components/booking/BookingForm';

export const metadata = {
  title: 'Book Now | Inna Cleaning',
  description: 'Book your professional cleaning appointment. Choose your date, time, and service.',
};

export default function BookingPage() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-gray-50/50 to-white">
      <Container>
        <SectionHeading
          title="Book Your Cleaning"
          subtitle="Fill out the form below and I'll confirm your appointment"
        />
        <div className="max-w-2xl mx-auto">
          <BookingForm />
        </div>
      </Container>
    </section>
  );
}
