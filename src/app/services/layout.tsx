import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services & Pricing',
  description:
    'Regular Cleaning, Deep Cleaning, Move-In/Move-Out, and Airbnb turnover cleaning in the Seattle area. Room-by-room breakdowns and transparent starting prices.',
  alternates: { canonical: '/services' },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
