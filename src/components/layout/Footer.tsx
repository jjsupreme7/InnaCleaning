'use client';

import Link from 'next/link';
import Container from '@/components/ui/Container';
import { useLanguage } from '@/contexts/LanguageContext';

const footerLinks = [
  { href: '/services' },
  { href: '/quote' },
  { href: '/booking' },
  { href: '/about' },
  { href: '/faq' },
  { href: '/contact' },
];

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-zinc-800 bg-black py-12">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-bold uppercase tracking-[0.1em] text-white">
              Inna Cleaning
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
              {t.footer.quickLinks}
            </h4>
            <ul className="flex flex-col gap-2">
              {footerLinks.map((link, i) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-500 transition-colors hover:text-white"
                  >
                    {t.footer.links[i]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-white">
              {t.footer.contact}
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
              {t.footer.hours}
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-zinc-500">
              <li>{t.footer.weekdays}</li>
              <li>{t.footer.saturday}</li>
              <li className="mt-1 font-bold text-white">{t.footer.sunday}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-800 pt-6 text-center text-xs uppercase tracking-widest text-zinc-700">
          &copy; {new Date().getFullYear()} Inna Cleaning. {t.footer.rights}
        </div>
      </Container>
    </footer>
  );
}
