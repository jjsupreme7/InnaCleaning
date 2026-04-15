import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Inna',
  description:
    'Meet Inna — a detail-obsessed home cleaner serving the greater Seattle area. Bonded, insured, eco-friendly, and personally delivered every time.',
  alternates: { canonical: '/about' },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
