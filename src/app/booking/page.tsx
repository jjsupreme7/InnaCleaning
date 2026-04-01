import { CalendarDays, Clock3, ShieldCheck } from 'lucide-react';
import Container from '@/components/ui/Container';
import BookingForm from '@/components/booking/BookingForm';

export const metadata = {
  title: 'Book Now | Inna Cleaning',
  description: 'Book your professional cleaning appointment. Choose your date, time, and service.',
};

export default function BookingPage() {
  return (
    <section className="section-shell">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="scroll-fade-up">
            <span className="eyebrow">
              <CalendarDays className="h-3.5 w-3.5" strokeWidth={2} />
              Book Your Cleaning
            </span>
            <h1 className="mt-6 font-serif text-5xl leading-[0.95] text-[var(--color-foreground)] md:text-6xl">
              Choose a day, share the details, and I&apos;ll confirm the plan.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[#617d76] md:text-lg">
              Fill out the request below and I&apos;ll follow up with availability,
              timing, and any final details.
            </p>

            <div className="mt-8 grid gap-4">
              {[
                {
                  icon: CalendarDays,
                  title: 'Flexible Scheduling',
                  text: 'Morning, afternoon, or evening windows available.',
                },
                {
                  icon: Clock3,
                  title: 'Fast Follow-Up',
                  text: 'I&apos;ll confirm your request within a few hours.',
                },
                {
                  icon: ShieldCheck,
                  title: 'Straightforward Process',
                  text: 'Clear communication before anything is booked.',
                },
              ].map((item) => (
                <div key={item.title} className="soft-card p-5">
                  <item.icon className="h-5 w-5 text-[#467968]" strokeWidth={1.8} />
                  <h3 className="mt-4 font-semibold text-[var(--color-foreground)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[#67827b]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-card scroll-fade-up p-6 md:p-8">
            <BookingForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
