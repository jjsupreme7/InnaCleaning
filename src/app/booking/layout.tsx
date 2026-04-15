import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Your Cleaning',
  description:
    'Book a Regular, Deep, Move-In/Out, or Airbnb turnover clean with Inna Cleaning. Pick a date and time — confirmation arrives by email.',
  alternates: { canonical: '/booking' },
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
