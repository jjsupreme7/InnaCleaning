'use client';

import { useState } from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import MobileMenu from './MobileMenu';
import { Leaf } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/quote', label: 'Free Quote' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-100 shadow-sm">
        <Container>
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="flex items-center gap-2 text-xl md:text-2xl font-bold text-stone-800">
              <div className="bg-teal-100 rounded-lg p-1.5">
                <Leaf className="w-5 h-5 text-teal-600" />
              </div>
              Inna Cleaning
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-stone-600 hover:text-teal-600 transition-colors duration-300 font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:block">
              <Link
                href="/booking"
                className="inline-block bg-teal-600 text-white px-5 py-2.5 text-sm font-semibold rounded-full hover:bg-teal-700 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Book Now
              </Link>
            </div>

            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 text-stone-800"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={navLinks}
      />
    </>
  );
}
