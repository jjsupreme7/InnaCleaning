'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function StickyBookButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop: floating button */}
      <Link
        href="/booking"
        className={`hidden md:flex fixed bottom-6 right-6 z-40 bg-sky-600 text-white px-6 py-3 text-xs uppercase tracking-widest font-bold border-2 border-sky-600 rounded-sm hover:bg-sky-700 hover:border-sky-700 transition-all duration-500 shadow-lg shadow-sky-600/25 hover:shadow-xl hover:shadow-sky-600/30 items-center gap-2 ${
          visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
        }`}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Book Now
      </Link>

      {/* Mobile: bottom bar */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 z-40 p-3 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] transition-all duration-500 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <Link
          href="/booking"
          className="block w-full bg-sky-600 text-white py-3.5 text-xs uppercase tracking-widest font-bold text-center border-2 border-sky-600 rounded-sm hover:bg-sky-700 transition-all duration-300 shadow-md shadow-sky-600/20"
        >
          Book Now
        </Link>
      </div>
    </>
  );
}
