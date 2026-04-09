'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Stats {
  contacts: number;
  bookings: number;
  quotes: number;
  users: number;
  leads: number;
}

function StatCard({
  href,
  label,
  value,
  sub,
}: {
  href: string;
  label: string;
  value: number | string;
  sub?: string;
}) {
  return (
    <Link
      href={href}
      className="block bg-zinc-900 border border-zinc-800 p-6 hover:border-zinc-600 transition-colors"
    >
      <p className="text-xs uppercase tracking-widest font-bold text-zinc-500 mb-2">{label}</p>
      <p className="text-4xl font-bold text-white">{value}</p>
      {sub && <p className="text-xs text-zinc-600 mt-1">{sub}</p>}
    </Link>
  );
}

export default function AdminOverview() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setStats(d);
      })
      .catch(() => setError('Failed to load stats.'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-zinc-700 border-t-red-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-400 text-sm">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">Overview</h1>
      <p className="text-zinc-500 text-sm mb-8">All activity across your site.</p>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard href="/admin/leads" label="Leads" value={stats?.leads ?? 0} sub="in pipeline" />
        <StatCard href="/admin/users" label="Portal Users" value={stats?.users ?? 0} sub="signed up" />
        <StatCard href="/admin/bookings" label="Bookings" value={stats?.bookings ?? 0} sub="submitted" />
        <StatCard href="/admin/quotes" label="Quotes" value={stats?.quotes ?? 0} sub="requested" />
        <StatCard href="/admin/contacts" label="Messages" value={stats?.contacts ?? 0} sub="received" />
      </div>
    </div>
  );
}
