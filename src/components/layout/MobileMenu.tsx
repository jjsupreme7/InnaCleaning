'use client';

import Link from 'next/link';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-80 z-[70] bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <span className="text-sm uppercase tracking-widest font-bold text-slate-800">Menu</span>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-slate-800 transition-colors rounded-sm hover:bg-gray-50"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col px-5 py-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="py-3.5 text-sm uppercase tracking-widest text-gray-600 hover:text-sky-600 transition-colors duration-300 font-medium border-b border-gray-50"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/booking"
            onClick={onClose}
            className="mt-6 inline-block border-2 border-sky-600 bg-sky-600 text-white px-5 py-3.5 text-xs uppercase tracking-widest font-bold text-center rounded-sm hover:bg-sky-700 transition-all duration-300 shadow-md shadow-sky-600/20"
          >
            Book Now
          </Link>
        </nav>
      </div>
    </>
  );
}
