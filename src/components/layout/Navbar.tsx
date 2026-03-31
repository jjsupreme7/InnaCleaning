'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => setHasLoaded(true), 100);

    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50) {
        if (currentScrollY > lastScrollY.current && currentScrollY - lastScrollY.current > 5) {
          setIsVisible(false);
        } else if (lastScrollY.current - currentScrollY > 5) {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', controlNavbar, { passive: true });
    return () => {
      window.removeEventListener('scroll', controlNavbar);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <nav
        className="fixed top-4 md:top-6 left-1/2 z-50 w-[92vw] max-w-4xl"
        style={{
          transition: hasLoaded ? 'all 0.4s ease-out' : 'opacity 0.8s ease-out, transform 0.8s ease-out',
          opacity: hasLoaded ? 1 : 0,
          transform: `translateX(-50%) translateY(${isVisible ? '0' : '-100px'})`,
        }}
      >
        {/* Main pill */}
        <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 md:px-6 md:py-2.5">
          <div className="flex w-full items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-base md:text-lg font-bold tracking-[0.1em] uppercase text-white hover:text-red-400 transition-colors duration-300">
              Inna Cleaning
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-200 font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/portal"
                className="text-xs uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-200 font-medium"
              >
                My Portal
              </Link>
              <Link
                href="/booking"
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2 rounded-full text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white hover:scale-110 transition-transform duration-200"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ${
                    mobileOpen ? 'opacity-0 rotate-180 scale-75' : 'opacity-100 rotate-0 scale-100'
                  }`}
                />
                <X
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ${
                    mobileOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-75'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          className={`md:hidden mt-2 transition-all duration-400 ease-out ${
            mobileOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
          }`}
        >
          <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-white/70 hover:text-white hover:bg-white/10 rounded-lg px-3 py-3 text-sm uppercase tracking-widest font-medium transition-all duration-200"
                  style={{ animationDelay: mobileOpen ? `${i * 50 + 50}ms` : '0ms' }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-white/10 my-2" />
              <Link
                href="/booking"
                onClick={() => setMobileOpen(false)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-full text-xs uppercase tracking-widest text-center transition-all duration-300"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer so content doesn't hide under floating nav */}
      <div className="h-20 md:h-24" />
    </>
  );
}
