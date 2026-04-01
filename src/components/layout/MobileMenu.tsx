'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-72 bg-zinc-950 shadow-xl border-l border-zinc-800">
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 text-white"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col px-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="py-3 text-sm uppercase tracking-widest text-zinc-400 hover:text-white transition-colors duration-300 font-medium border-b border-zinc-800"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/booking"
            onClick={onClose}
            className="mt-6 inline-block border-2 border-red-600 bg-red-600 text-white px-5 py-3 text-xs uppercase tracking-widest font-bold text-center hover:bg-red-700 transition-all duration-300"
          >
            {t.nav.bookNow}
          </Link>
        </nav>
      </div>
    </div>
  );
}
