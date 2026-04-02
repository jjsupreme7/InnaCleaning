'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

const navItems = [
  { href: '/admin', label: 'Overview', exact: true },
  { href: '/admin/users', label: 'Portal Users' },
  { href: '/admin/bookings', label: 'Bookings' },
  { href: '/admin/quotes', label: 'Quotes' },
  { href: '/admin/contacts', label: 'Messages' },
];

function NavLink({ href, label, exact }: { href: string; label: string; exact?: boolean }) {
  const pathname = usePathname();
  const active = exact ? pathname === href : pathname.startsWith(href);
  return (
    <Link
      href={href}
      className={`block px-4 py-2.5 text-xs uppercase tracking-widest font-bold transition-colors ${
        active ? 'text-white bg-zinc-800' : 'text-zinc-500 hover:text-white hover:bg-zinc-800/50'
      }`}
    >
      {label}
    </Link>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleSignOut = async () => {
    setSigningOut(true);
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-zinc-800 flex flex-col">
        <div className="px-4 py-6 border-b border-zinc-800">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-red-600">Inna Cleaning</p>
          <p className="text-white font-bold mt-0.5">Admin</p>
        </div>

        <nav className="flex-1 py-4 space-y-0.5">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-zinc-800">
          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="w-full text-xs uppercase tracking-widest font-bold text-zinc-600 hover:text-white transition-colors text-left disabled:opacity-50"
          >
            {signingOut ? '…' : 'Sign Out'}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}
