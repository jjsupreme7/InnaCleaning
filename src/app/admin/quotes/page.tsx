'use client';

import { useEffect, useState } from 'react';

interface Quote {
  id: string;
  name: string;
  email: string;
  home_size: string;
  cleaning_type: string;
  condition: string;
  addons: string | null;
  frequency: string;
  estimated_total: number | null;
  created_at: string;
}

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/quotes')
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setQuotes(d.quotes);
      })
      .catch(() => setError('Failed to load quotes.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">Quotes</h1>
      <p className="text-zinc-500 text-sm mb-8">All quote requests submitted through the site.</p>

      {loading && (
        <div className="flex items-center justify-center h-40">
          <div className="w-6 h-6 border-2 border-zinc-700 border-t-red-600 rounded-full animate-spin" />
        </div>
      )}
      {error && <p className="text-red-400 text-sm">{error}</p>}
      {!loading && !error && quotes.length === 0 && (
        <p className="text-zinc-500 text-sm">No quotes yet.</p>
      )}
      {!loading && !error && quotes.length > 0 && (
        <div className="border border-zinc-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900">
                <th className="text-left px-4 py-3 text-xs uppercase tracking-widest font-bold text-zinc-500">Name</th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-widest font-bold text-zinc-500">Email</th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-widest font-bold text-zinc-500">Home Size</th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-widest font-bold text-zinc-500">Type</th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-widest font-bold text-zinc-500">Frequency</th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-widest font-bold text-zinc-500">Estimate</th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-widest font-bold text-zinc-500">Date</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q, i) => (
                <tr key={q.id} className={i % 2 === 0 ? 'bg-zinc-950' : 'bg-zinc-900/50'}>
                  <td className="px-4 py-3 text-white">{q.name}</td>
                  <td className="px-4 py-3 text-zinc-400">{q.email}</td>
                  <td className="px-4 py-3 text-zinc-400">{q.home_size}</td>
                  <td className="px-4 py-3 text-zinc-400">{q.cleaning_type}</td>
                  <td className="px-4 py-3 text-zinc-400">{q.frequency}</td>
                  <td className="px-4 py-3 text-zinc-300 font-medium">
                    {q.estimated_total != null ? `$${q.estimated_total}` : '—'}
                  </td>
                  <td className="px-4 py-3 text-zinc-400">
                    {new Date(q.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
