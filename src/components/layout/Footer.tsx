import Link from 'next/link';
import Container from '@/components/ui/Container';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-black py-12">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-bold uppercase tracking-[0.1em] text-white">
              Inna Cleaning
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              Professional home cleaning services in the greater Seattle area.
              Reliable, thorough, and always with a personal touch.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2">
              {[
                { href: '/services', label: 'Services' },
                { href: '/quote', label: 'Free Quote' },
                { href: '/booking', label: 'Book Now' },
                { href: '/about', label: 'About' },
                { href: '/faq', label: 'FAQ' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
              Contact
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-zinc-500">
              <li>
                <a href="tel:+12065551234" className="hover:text-white transition-colors">
                  (206) 555-1234
                </a>
              </li>
              <li>
                <a href="mailto:inna@innacleaning.com" className="hover:text-white transition-colors">
                  inna@innacleaning.com
                </a>
              </li>
              <li className="mt-1">Seattle, WA &amp; surrounding areas</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
              Hours
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-zinc-500">
              <li>Mon – Fri: 8am – 6pm</li>
              <li>Saturday: 9am – 4pm</li>
              <li className="mt-1 font-bold text-white">Sunday: By request</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-800 pt-6 text-center text-xs uppercase tracking-widest text-zinc-700">
          &copy; {new Date().getFullYear()} Inna Cleaning. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
