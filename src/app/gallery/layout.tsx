import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Before and after photos from real Inna Cleaning jobs across Seattle, Tacoma, and surrounding cities. Kitchens, bathrooms, deep cleans, and turnovers.',
  alternates: { canonical: '/gallery' },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
