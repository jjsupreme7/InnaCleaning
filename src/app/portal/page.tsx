'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';

interface Booking {
  id: string;
  service_type: string;
  preferred_date: string;
  preferred_time: string;
  address: string;
  notes: string | null;
  created_at: string;
}

interface Quote {
  id: string;
  home_size: string | null;
  cleaning_type: string | null;
  frequency: string | null;
  estimated_total: number | null;
  created_at: string;
}

export default function PortalPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const p = t.portal;

  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/portal/login');
        return;
      }
      setUser(session.user);
      fetchData();
    });
  }, [router]);

  const fetchData = async () => {
    const [{ data: b }, { data: q }] = await Promise.all([
      supabase.from('inna_bookings').select('id, service_type, preferred_date, preferred_time, address, notes, created_at').order('created_at', { ascending: false }),
      supabase.from('inna_quotes').select('id, home_size, cleaning_type, frequency, estimated_total, created_at').order('created_at', { ascending: false }),
    ]);
    setBookings(b ?? []);
    setQuotes(q ?? []);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/portal/login');
  };

  if (loading) {
    return (
      <section className="py-16 md:py-24">
        <Container>
          <p className="text-zinc-500 text-center">{p.loading}</p>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24">
      <Container>
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-2xl font-bold uppercase tracking-widest text-white">{p.title}</h1>
            <p className="text-zinc-500 text-sm mt-1">{user?.email}</p>
          </div>
          <div className="flex gap-3">
            <Button href="/booking" variant="primary" size="sm">{p.newBooking}</Button>
            <Button onClick={handleLogout} variant="outline" size="sm">{p.logOut}</Button>
          </div>
        </div>

        {/* Bookings */}
        <div className="mb-12">
          <h2 className="text-xs uppercase tracking-widest font-bold text-zinc-500 mb-4">{p.bookings}</h2>
          {bookings.length === 0 ? (
            <div className="border border-zinc-800 bg-zinc-900 p-8 text-center">
              <p className="text-zinc-500 text-sm mb-4">{p.noBookings}</p>
              <Button href="/booking" variant="primary" size="md">{p.bookCleaning}</Button>
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.map((b) => (
                <div key={b.id} className="border border-zinc-800 bg-zinc-900 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="text-white font-bold text-sm capitalize">{b.service_type.replace('_', ' ')}</p>
                    <p className="text-zinc-400 text-xs mt-0.5">{b.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white text-sm">{new Date(b.preferred_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    <p className="text-zinc-500 text-xs capitalize">{b.preferred_time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quotes */}
        <div>
          <h2 className="text-xs uppercase tracking-widest font-bold text-zinc-500 mb-4">{p.quotes}</h2>
          {quotes.length === 0 ? (
            <div className="border border-zinc-800 bg-zinc-900 p-8 text-center">
              <p className="text-zinc-500 text-sm mb-4">{p.noQuotes}</p>
              <Button href="/quote" variant="primary" size="md">{p.getQuote}</Button>
            </div>
          ) : (
            <div className="space-y-3">
              {quotes.map((q) => (
                <div key={q.id} className="border border-zinc-800 bg-zinc-900 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <p className="text-white font-bold text-sm capitalize">
                      {(q.cleaning_type ?? 'Standard').replace('_', ' ')} — {(q.home_size ?? '').replace('_', ' ')}
                    </p>
                    <p className="text-zinc-400 text-xs mt-0.5 capitalize">{q.frequency?.replace('_', ' ')}</p>
                  </div>
                  <div className="text-right">
                    {q.estimated_total && (
                      <p className="text-white font-bold text-lg">${q.estimated_total}</p>
                    )}
                    <p className="text-zinc-500 text-xs">{new Date(q.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="text-center mt-12">
          <Link href="/" className="text-zinc-600 text-xs hover:text-zinc-400 transition-colors uppercase tracking-widest">{p.back}</Link>
        </p>
      </Container>
    </section>
  );
}
