'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { CalendarDays } from 'lucide-react';

export default function StickyBookButton() {
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
      <Link
        href="/booking"
        className="fixed bottom-6 right-6 z-40 hidden items-center gap-2 rounded-full border border-[#467968] bg-[#467968] px-6 py-3.5 text-sm font-semibold tracking-[0.08em] text-white shadow-[0_24px_52px_-28px_rgba(27,69,56,0.9)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3a6659] md:flex"
      >
        <CalendarDays className="h-4 w-4" strokeWidth={1.8} />
        Book Now
      </Link>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/40 bg-[#f8f4ed]/95 p-3 backdrop-blur md:hidden">
        <Link
          href="/booking"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#467968] py-3.5 text-sm font-semibold tracking-[0.08em] text-white shadow-[0_18px_40px_-22px_rgba(27,69,56,0.8)] transition-all duration-300 hover:bg-[#3a6659]"
        >
          <CalendarDays className="h-4 w-4" strokeWidth={1.8} />
          Book Now
        </Link>
      </div>
    </>
  );
}
