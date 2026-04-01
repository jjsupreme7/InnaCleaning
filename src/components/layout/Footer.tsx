import Link from 'next/link';
import { Mail, MapPin, Phone, Sparkles } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function Footer() {
  return (
    <footer className="mt-16 bg-[#17352d] py-16 text-white md:mt-24">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.2fr_.9fr_.9fr]">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-[#b2dbc9]">
                <Sparkles className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <div>
                <h3 className="font-serif text-3xl leading-none">Inna Cleaning</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#b8d0c7]">
                  Personal, detail-first service
                </p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-7 text-[#c1d5cf]">
              Professional home cleaning services in the greater Seattle area.
              Reliable, thorough, and always with a personal touch.
            </p>
            <div className="mt-6">
              <Button href="/quote" variant="secondary" size="sm">
                Free Quote
              </Button>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#b8d0c7]">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              {[
                { href: '/services', label: 'Services' },
                { href: '/quote', label: 'Free Quote' },
                { href: '/booking', label: 'Book Now' },
                { href: '/about', label: 'About' },
                { href: '/faq', label: 'FAQ' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#d4e2dd] transition-colors duration-300 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#b8d0c7]">
              Contact
            </h4>
            <div className="space-y-4 text-sm text-[#d4e2dd]">
              <a
                href="tel:+12065551234"
                className="flex items-center gap-3 transition-colors duration-300 hover:text-white"
              >
                <Phone className="h-4 w-4 text-[#9dcdbc]" strokeWidth={1.8} />
                (206) 555-1234
              </a>
              <a
                href="mailto:inna@innacleaning.com"
                className="flex items-center gap-3 transition-colors duration-300 hover:text-white"
              >
                <Mail className="h-4 w-4 text-[#9dcdbc]" strokeWidth={1.8} />
                inna@innacleaning.com
              </a>
              <p className="flex items-start gap-3 leading-7">
                <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-[#9dcdbc]" strokeWidth={1.8} />
                <span>Serving Seattle, Bellevue, Tacoma & surrounding areas</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs uppercase tracking-[0.24em] text-[#9ab7ae]">
          &copy; {new Date().getFullYear()} Inna Cleaning. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
