'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { BookingStatus } from '@/types';

const BOOKING_STATUSES: { key: BookingStatus; label: string; color: string }[] = [
  { key: 'pending', label: 'Pending', color: 'bg-yellow-600/20 text-yellow-400' },
  { key: 'confirmed', label: 'Confirmed', color: 'bg-blue-600/20 text-blue-400' },
  { key: 'completed', label: 'Completed', color: 'bg-green-600/20 text-green-400' },
  { key: 'canceled', label: 'Canceled', color: 'bg-zinc-600/20 text-zinc-500' },
];

interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  service_type: string;
  preferred_date: string;
  preferred_time: string;
  notes: string | null;
  status: BookingStatus;
  lead_id: string | null;
  created_at: string;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/bookings')
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setBookings(d.bookings);
      })
      .catch(() => setError('Failed to load bookings.'))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (bookingId: string, status: BookingStatus) => {
    setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status } : b)));
    await fetch(`/api/admin/bookings/${bookingId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">Bookings</h1>
      <p className="text-zinc-500 text-sm mb-8">All booking requests submitted through the site.</p>

      {loading && (
        <div className="flex items-center justify-center h-40">
          <div className="w-6 h-6 border-2 border-zinc-700 border-t-red-600 rounded-full animate-spin" />
        </div>
      )}
      {error && <p className="text-red-400 text-sm">{error}</p>}
      {!loading && !error && bookings.length === 0 && (
        <p className="text-zinc-500 text-sm">No bookings yet.</p>
      )}
      {!loading && !error && bookings.length > 0 && (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b.id} className="bg-zinc-900 border border-zinc-800 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  {b.lead_id ? (
                    <Link href={`/admin/leads/${b.lead_id}`} className="text-white font-bold hover:text-red-400 transition-colors">
                      {b.name}
                    </Link>
                  ) : (
                    <p className="text-white font-bold">{b.name}</p>
                  )}
                  <p className="text-zinc-400 text-sm">{b.email} · {b.phone}</p>
                </div>
                <div className="flex items-center gap-3">
                  <select
                    value={b.status}
                    onChange={(e) => updateStatus(b.id, e.target.value as BookingStatus)}
                    className="bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs px-2 py-1 focus:outline-none focus:border-red-600 cursor-pointer"
                  >
                    {BOOKING_STATUSES.map((s) => (
                      <option key={s.key} value={s.key}>{s.label}</option>
                    ))}
                  </select>
                  <p className="text-zinc-600 text-xs">{new Date(b.created_at).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold text-zinc-600 mb-0.5">Service</p>
                  <p className="text-zinc-300">{b.service_type}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold text-zinc-600 mb-0.5">Date</p>
                  <p className="text-zinc-300">{b.preferred_date}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold text-zinc-600 mb-0.5">Time</p>
                  <p className="text-zinc-300">{b.preferred_time}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold text-zinc-600 mb-0.5">Address</p>
                  <p className="text-zinc-300 truncate">{b.address}</p>
                </div>
              </div>
              {b.notes && (
                <div className="mt-3 pt-3 border-t border-zinc-800">
                  <p className="text-xs uppercase tracking-widest font-bold text-zinc-600 mb-0.5">Notes</p>
                  <p className="text-zinc-400 text-sm">{b.notes}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
