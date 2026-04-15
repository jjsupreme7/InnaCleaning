import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Inna Cleaning. Call, email, or send a message — serving Seattle, Tacoma, Kent, Federal Way, Puyallup, and surrounding cities.',
  alternates: { canonical: '/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
