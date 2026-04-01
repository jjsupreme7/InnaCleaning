'use client';

import Link from 'next/link';
import { Sparkles, X } from 'lucide-react';
import Button from '@/components/ui/Button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { href: string; label: string }[];
}

export default function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-[#18342d]/38 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute right-0 top-0 flex h-full w-[min(22rem,88vw)] flex-col rounded-l-[2rem] border-l border-white/45 bg-[#f8f4ed]/95 p-5 shadow-[0_30px_90px_-40px_rgba(27,69,56,0.65)]">
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="accent-ring flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[#4f8676]">
              <Sparkles className="h-4 w-4" strokeWidth={1.8} />
            </span>
            <div>
              <p className="font-serif text-2xl text-[var(--color-foreground)]">
                Inna Cleaning
              </p>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f8882]">
                Seattle area homes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[var(--color-foreground)]"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" strokeWidth={1.8} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="rounded-2xl px-4 py-3 text-base font-medium text-[#57756c] transition-colors duration-300 hover:bg-white hover:text-[var(--color-foreground)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="panel-card mt-8 p-4">
          <p className="text-sm leading-7 text-[#5c7770]">
            Get a tailored estimate in under a minute, then book when you&apos;re ready.
          </p>
          <div className="mt-4">
            <Button href="/booking" onClick={onClose} className="w-full">
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
