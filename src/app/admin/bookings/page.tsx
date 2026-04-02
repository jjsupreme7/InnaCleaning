'use client';

import { useEffect, useState } from 'react';

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
                  <p className="text-white font-bold">{b.name}</p>
                  <p className="text-zinc-400 text-sm">{b.email} · {b.phone}</p>
                </div>
                <p className="text-zinc-600 text-xs">{new Date(b.created_at).toLocaleDateString()}</p>
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
