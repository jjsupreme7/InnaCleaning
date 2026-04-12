'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';
import BorderBeam from '@/components/ui/BorderBeam';

interface CleaningReport {
  id: string;
  booking_id: string;
  completed_tasks: string[];
  photos: string[];
  notes: string | null;
  completed_at: string;
}

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
  const [reports, setReports] = useState<Record<string, CleaningReport>>({});
  const [expandedReport, setExpandedReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const handleChangePassword = async () => {
    setPasswordError('');
    setPasswordSuccess('');
    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }
    setPasswordLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      setPasswordError(error.message);
    } else {
      setPasswordSuccess('Password updated successfully.');
      setNewPassword('');
      setConfirmPassword('');
    }
    setPasswordLoading(false);
  };

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

    // Fetch reports for any completed bookings
    const completedIds = (b ?? []).filter((row) => row.status === 'completed').map((row) => row.id);
    if (completedIds.length > 0) {
      const { data: r } = await supabase
        .from('inna_cleaning_reports')
        .select('id, booking_id, completed_tasks, photos, notes, completed_at')
        .in('booking_id', completedIds);
      const byBookingId: Record<string, CleaningReport> = {};
      (r ?? []).forEach((report) => {
        byBookingId[report.booking_id] = report;
      });
      setReports(byBookingId);
    }

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
            <div className="relative theme-transition border shadow-sm rounded-xl p-8 text-center" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--card-border)' }}>
              <BorderBeam />
              <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>{p.noBookings}</p>
              <Button href="/booking" variant="primary" size="md">{p.bookCleaning}</Button>
            </div>
          ) : (
            <div className="space-y-3">
              {bookings.map((b) => {
                const report = reports[b.id];
                const isExpanded = expandedReport === b.id;
                return (
                  <div key={b.id} className="relative theme-transition border shadow-sm rounded-xl overflow-hidden" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--card-border)' }}>
                    <BorderBeam />
                    <div className="relative p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
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
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{new Date(b.preferred_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                          <p className="text-xs capitalize" style={{ color: 'var(--text-muted)' }}>{b.preferred_time}</p>
                        </div>
                        {report && (
                          <button
                            type="button"
                            onClick={() => setExpandedReport(isExpanded ? null : b.id)}
                            className="text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors"
                          >
                            {isExpanded ? 'Hide Report' : 'View Report'}
                          </button>
                        )}
                      </div>
                    </div>
                    {report && isExpanded && (
                      <div className="relative border-t px-5 py-5" style={{ borderColor: 'var(--card-border)', background: 'var(--bg-subtle)' }}>
                        <p className="text-xs uppercase tracking-widest font-bold mb-3" style={{ color: 'var(--text-muted)' }}>
                          Completed {new Date(report.completed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                        {report.completed_tasks.length > 0 && (
                          <div className="mb-4">
                            <p className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: 'var(--text-muted)' }}>What was done</p>
                            <ul className="space-y-1.5">
                              {report.completed_tasks.map((task) => (
                                <li key={task} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                                  <svg className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  {task}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {report.photos.length > 0 && (
                          <div className="mb-4">
                            <p className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: 'var(--text-muted)' }}>Photos</p>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                              {report.photos.map((url) => (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <a key={url} href={url} target="_blank" rel="noreferrer" className="block aspect-square overflow-hidden rounded-lg border" style={{ borderColor: 'var(--card-border)' }}>
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img src={url} alt="Cleaning photo" className="w-full h-full object-cover hover:scale-105 transition-transform" loading="lazy" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                        {report.notes && (
                          <div>
                            <p className="text-xs uppercase tracking-widest font-bold mb-2" style={{ color: 'var(--text-muted)' }}>Notes from Inna</p>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{report.notes}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quotes */}
        <div>
          <h2 className="text-xs uppercase tracking-widest font-bold mb-4" style={{ color: 'var(--text-muted)' }}>{p.quotes}</h2>
          {quotes.length === 0 ? (
            <div className="relative theme-transition border shadow-sm rounded-xl p-8 text-center" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--card-border)' }}>
              <BorderBeam />
              <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>{p.noQuotes}</p>
              <Button href="/quote" variant="primary" size="md">{p.getQuote}</Button>
            </div>
          ) : (
            <div className="space-y-3">
              {quotes.map((q) => (
                <div key={q.id} className="relative theme-transition border shadow-sm rounded-xl p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--card-border)' }}>
                  <BorderBeam />
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

        {/* Change Password */}
        <div className="mt-12">
          <h2 className="text-xs uppercase tracking-widest font-bold mb-4" style={{ color: 'var(--text-muted)' }}>Change Password</h2>
          <div className="relative theme-transition border shadow-sm rounded-xl p-6" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--card-border)' }}>
            <BorderBeam />
            <div className="grid gap-4 sm:grid-cols-2 max-w-lg">
              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-widest font-bold" style={{ color: 'var(--text-secondary)' }}>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-lg border px-4 py-3 text-sm focus:border-red-500 focus:outline-none transition-colors"
                  style={{ background: 'var(--input-bg)', borderColor: 'var(--input-border)', color: 'var(--text-primary)' }}
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-widest font-bold" style={{ color: 'var(--text-secondary)' }}>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-lg border px-4 py-3 text-sm focus:border-red-500 focus:outline-none transition-colors"
                  style={{ background: 'var(--input-bg)', borderColor: 'var(--input-border)', color: 'var(--text-primary)' }}
                  placeholder="••••••••"
                />
              </div>
            </div>
            {passwordError && <p className="text-red-400 text-sm mt-3">{passwordError}</p>}
            {passwordSuccess && <p className="text-green-400 text-sm mt-3">{passwordSuccess}</p>}
            <div className="mt-4">
              <button
                onClick={handleChangePassword}
                disabled={passwordLoading}
                className="bg-red-600 hover:bg-red-700 text-white text-xs uppercase tracking-widest font-bold px-6 py-3 transition-colors disabled:opacity-50"
              >
                {passwordLoading ? '...' : 'Update Password'}
              </button>
            </div>
          </div>
        </div>

        <p className="text-center mt-12">
          <Link href="/" className="text-xs hover:text-red-400 transition-colors uppercase tracking-widest" style={{ color: 'var(--text-secondary)' }}>{p.back}</Link>
        </p>
      </Container>
    </section>
  );
}
