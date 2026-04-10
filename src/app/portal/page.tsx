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
  status: string | null;
  created_at: string;
}

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: 'rgba(245,158,11,0.15)', text: '#f59e0b', label: 'Pending' },
  confirmed: { bg: 'rgba(34,197,94,0.15)', text: '#22c55e', label: 'Confirmed' },
  completed: { bg: 'rgba(59,130,246,0.15)', text: '#3b82f6', label: 'Completed' },
  cancelled: { bg: 'rgba(239,68,68,0.15)', text: '#ef4444', label: 'Cancelled' },
};

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
      fetchData(session.user.email!);
    });
  }, [router]);

  const fetchData = async (email: string) => {
    const [{ data: b }, { data: q }] = await Promise.all([
      supabase.from('inna_bookings').select('id, service_type, preferred_date, preferred_time, address, notes, status, created_at').eq('email', email).order('created_at', { ascending: false }),
      supabase.from('inna_quotes').select('id, home_size, cleaning_type, frequency, estimated_total, created_at').eq('email', email).order('created_at', { ascending: false }),
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
      <section className="theme-transition py-16 md:py-24" style={{ background: 'var(--bg-base)' }}>
        <Container>
          <p className="text-center" style={{ color: 'var(--text-muted)' }}>{p.loading}</p>
        </Container>
      </section>
    );
  }

  return (
    <section className="theme-transition py-16 md:py-24" style={{ background: 'var(--bg-base)' }}>
      <Container>
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-2xl font-bold uppercase tracking-widest" style={{ color: 'var(--text-primary)' }}>{p.title}</h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{user?.email}</p>
          </div>
          <div className="flex gap-3">
            <Button href="/booking" variant="primary" size="sm">{p.newBooking}</Button>
            <Button onClick={handleLogout} variant="outline" size="sm">{p.logOut}</Button>
          </div>
        </div>

        {/* Bookings */}
        <div className="mb-12">
          <h2 className="text-xs uppercase tracking-widest font-bold mb-4" style={{ color: 'var(--text-muted)' }}>{p.bookings}</h2>
          {bookings.length === 0 ? (
            <div className="theme-transition border shadow-sm p-8 text-center" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--card-border)' }}>
              <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>{p.noBookings}</p>
              <Button href="/booking" variant="primary" size="md">{p.bookCleaning}</Button>
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.map((b) => (
                <div key={b.id} className="theme-transition border shadow-sm rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--card-border)' }}>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <p className="font-bold text-sm capitalize" style={{ color: 'var(--text-primary)' }}>{b.service_type.replace('_', ' ')}</p>
                      {(() => {
                        const status = b.status || 'pending';
                        const s = STATUS_STYLES[status] || STATUS_STYLES.pending;
                        return (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: s.bg, color: s.text }}>
                            {s.label}
                          </span>
                        );
                      })()}
                    </div>
                    <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{b.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{new Date(b.preferred_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    <p className="text-xs capitalize" style={{ color: 'var(--text-muted)' }}>{b.preferred_time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quotes */}
        <div>
          <h2 className="text-xs uppercase tracking-widest font-bold mb-4" style={{ color: 'var(--text-muted)' }}>{p.quotes}</h2>
          {quotes.length === 0 ? (
            <div className="theme-transition border shadow-sm p-8 text-center" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--card-border)' }}>
              <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>{p.noQuotes}</p>
              <Button href="/quote" variant="primary" size="md">{p.getQuote}</Button>
            </div>
          ) : (
            <div className="space-y-3">
              {quotes.map((q) => (
                <div key={q.id} className="theme-transition border shadow-sm p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--card-border)' }}>
                  <div>
                    <p className="font-bold text-sm capitalize" style={{ color: 'var(--text-primary)' }}>
                      {(q.cleaning_type ?? 'Standard').replace('_', ' ')} — {(q.home_size ?? '').replace('_', ' ')}
                    </p>
                    <p className="text-xs mt-0.5 capitalize" style={{ color: 'var(--text-secondary)' }}>{q.frequency?.replace('_', ' ')}</p>
                  </div>
                  <div className="text-right">
                    {q.estimated_total && (
                      <p className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>${q.estimated_total}</p>
                    )}
                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{new Date(q.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="text-center mt-12">
          <Link href="/" className="text-xs hover:text-red-400 transition-colors uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>{p.back}</Link>
        </p>
      </Container>
    </section>
  );
}
