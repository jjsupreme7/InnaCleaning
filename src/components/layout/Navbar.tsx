'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Sun, Moon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import type { Lang } from '@/i18n/translations';

const LANGS: { code: Lang; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
  { code: 'uk', label: 'UK' },
];

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
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
        className="fixed top-4 md:top-6 left-1/2 z-50 w-[97vw]"
        style={{
          transition: hasLoaded ? 'all 0.4s ease-out' : 'opacity 0.8s ease-out, transform 0.8s ease-out',
          opacity: hasLoaded ? 1 : 0,
          transform: `translateX(-50%) translateY(${isVisible ? '0' : '-100px'})`,
        }}
      >
        {/* Main pill */}
        <div className="backdrop-blur-md rounded-full px-4 py-2 md:px-6 md:py-2.5 theme-transition" style={{ background: 'var(--bg-overlay)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border-subtle)', boxShadow: 'var(--shadow-nav)' }}>
          <div className="flex w-full items-center justify-between">
            {/* Logo */}
            <Link href="/" className="text-base md:text-lg font-bold tracking-[0.1em] uppercase hover:text-red-500 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
              Inna Cleaning
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex flex-1 items-center justify-evenly">
              {[
                { href: '/services', label: t.nav.services },
                { href: '/about', label: t.nav.about },
                { href: '/gallery', label: t.nav.gallery },
                { href: '/contact', label: t.nav.contact },
                { href: '/portal', label: t.nav.portal },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs uppercase tracking-wide hover:text-red-500 rounded-full px-3 py-1.5 transition-all duration-200 font-medium theme-transition"
                  style={{ color: 'var(--text-secondary)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border-default)' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA + language switcher */}
            <div className="hidden md:flex items-center gap-2">
              {/* Language switcher */}
              <div className="flex items-center gap-1 rounded-full px-2 py-1 theme-transition" style={{ borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border-default)' }}>
                {LANGS.map((l, i) => (
                  <span key={l.code} className="flex items-center">
                    <button
                      onClick={() => setLang(l.code)}
                      className="text-[10px] font-bold uppercase tracking-widest px-1 transition-colors"
                      style={{ color: lang === l.code ? 'var(--text-primary)' : 'var(--text-faint)' }}
                    >
                      {l.label}
                    </button>
                    {i < LANGS.length - 1 && <span className="text-[10px]" style={{ color: 'var(--text-faint)' }}>|</span>}
                  </span>
                ))}
              </div>
              {/* Dark mode toggle */}
              <button
                onClick={toggleTheme}
                className="relative w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
                style={{ color: 'var(--text-secondary)' }}
                aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              >
                <Sun size={16} strokeWidth={2} className={`absolute transition-all duration-300 ${theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-75'}`} />
                <Moon size={16} strokeWidth={2} className={`absolute transition-all duration-300 ${theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'}`} />
              </button>
              <a
                href="tel:+12532156068"
                className="flex items-center gap-1.5 text-sm transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Phone size={14} strokeWidth={2} />
                (253) 215-6068
              </a>
              <Link
                href="/booking"
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2 rounded-full text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105"
              >
                {t.nav.bookNow}
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden hover:scale-110 transition-transform duration-200"
              style={{ color: 'var(--text-primary)' }}
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
          <div className="backdrop-blur-md shadow-lg rounded-xl p-4 theme-transition" style={{ background: 'var(--bg-overlay-mobile)', borderWidth: 1, borderStyle: 'solid', borderColor: 'var(--border-default)' }}>
            <div className="flex flex-col gap-1">
              {[
                { href: '/services', label: t.nav.services },
                { href: '/about', label: t.nav.about },
                { href: '/gallery', label: t.nav.gallery },
                { href: '/contact', label: t.nav.contact },
                { href: '/portal', label: t.nav.portal || 'My Portal' },
              ].map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm uppercase tracking-widest font-medium transition-all duration-200"
                  style={{ color: 'var(--text-secondary)', animationDelay: mobileOpen ? `${i * 50 + 50}ms` : '0ms' }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px my-2" style={{ background: 'var(--border-default)' }} />
              {/* Mobile language switcher + dark mode toggle */}
              <div className="flex justify-center items-center gap-4 py-2">
                {LANGS.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className="text-sm font-bold uppercase tracking-widest transition-colors"
                    style={{ color: lang === l.code ? 'var(--text-primary)' : 'var(--text-faint)' }}
                  >
                    {l.label}
                  </button>
                ))}
                <div className="w-px h-5" style={{ background: 'var(--border-default)' }} />
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-1.5 text-sm font-bold uppercase tracking-widest transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
                  {theme === 'light' ? 'Dark' : 'Light'}
                </button>
              </div>
              <div className="h-px my-1" style={{ background: 'var(--border-default)' }} />
              <Link
                href="/booking"
                onClick={() => setMobileOpen(false)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-full text-xs uppercase tracking-widest text-center transition-all duration-300"
              >
                {t.nav.bookNow}
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
