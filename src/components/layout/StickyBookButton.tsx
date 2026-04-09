'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function StickyBookButton() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Desktop: floating button */}
      <Link
        href="/booking"
        className="hidden md:flex fixed bottom-6 right-6 z-40 bg-red-600 text-white px-6 py-3 rounded-lg text-xs uppercase tracking-widest font-bold border-2 border-red-600 hover:bg-red-700 hover:border-red-700 transition-all duration-300 shadow-lg items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {t.nav.bookNow}
      </Link>

      {/* Mobile: bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-white border-t border-zinc-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <Link
          href="/booking"
          className="block w-full rounded-lg bg-red-600 text-white py-3 text-xs uppercase tracking-widest font-bold text-center border-2 border-red-600 hover:bg-red-700 transition-all duration-300"
        >
          {t.nav.bookNow}
        </Link>
      </div>
    </>
  );
}
