import Link from 'next/link';
import Container from '@/components/ui/Container';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-lg font-bold uppercase tracking-[0.1em] mb-4">
              Inna Cleaning
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Professional home cleaning services in the greater Seattle area.
              Reliable, thorough, and always with a personal touch.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-4">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
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
                  className="text-zinc-500 text-sm hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-4">
              Contact
            </h4>
            <div className="flex flex-col gap-2 text-zinc-500 text-sm">
              <a href="tel:+12065551234" className="hover:text-white transition-colors duration-300">
                (206) 555-1234
              </a>
              <a href="mailto:inna@innacleaning.com" className="hover:text-white transition-colors duration-300">
                inna@innacleaning.com
              </a>
              <p className="mt-2">Serving Seattle, Bellevue, Tacoma & surrounding areas</p>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 mt-12 pt-8 text-center text-zinc-600 text-xs uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Inna Cleaning. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
