import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Instant Quote',
  description:
    'Get a free instant cleaning quote from Inna Cleaning in under a minute. No phone calls, no commitment — just transparent pricing for your home.',
  alternates: { canonical: '/quote' },
};

export default function QuoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
