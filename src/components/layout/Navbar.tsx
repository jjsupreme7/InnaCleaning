'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Sparkles } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import MobileMenu from './MobileMenu';

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
      <header className="sticky top-0 z-50 border-b border-white/45 bg-[#f8f4ed]/85 backdrop-blur-xl">
        <Container>
          <div className="flex h-20 items-center justify-between md:h-24">
            <Link
              href="/"
              className="flex items-center gap-3 text-[var(--color-foreground)]"
            >
              <span className="accent-ring flex h-11 w-11 items-center justify-center rounded-2xl bg-white/85 text-[#4f8676]">
                <Sparkles className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <span>
                <span className="block font-serif text-2xl leading-none md:text-3xl">
                  Inna Cleaning
                </span>
                <span className="mt-1 block text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[#69857e]">
                  Warm, personal home care
                </span>
              </span>
            </Link>

            <nav className="hidden items-center gap-2 rounded-full border border-white/55 bg-white/55 px-3 py-2 shadow-[0_18px_40px_-32px_rgba(27,69,56,0.45)] md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-[#5e7972] transition-colors duration-300 hover:bg-white hover:text-[var(--color-foreground)]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:block">
              <Button href="/booking" size="sm">
                Book Now
              </Button>
            </div>

            <button
              onClick={() => setMobileOpen(true)}
              className="accent-ring flex h-11 w-11 items-center justify-center rounded-2xl bg-white/85 text-[var(--color-foreground)] md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" strokeWidth={1.8} />
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
