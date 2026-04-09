'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import type { Lead, LeadStatus } from '@/types';

const STATUSES: { key: LeadStatus; label: string; color: string }[] = [
  { key: 'new_lead', label: 'New Lead', color: 'bg-blue-600/20 text-blue-400' },
  { key: 'contacted', label: 'Contacted', color: 'bg-yellow-600/20 text-yellow-400' },
  { key: 'quote_sent', label: 'Quote Sent', color: 'bg-purple-600/20 text-purple-400' },
  { key: 'follow_up', label: 'Follow Up', color: 'bg-orange-600/20 text-orange-400' },
  { key: 'booked', label: 'Booked', color: 'bg-green-600/20 text-green-400' },
  { key: 'lost', label: 'Lost', color: 'bg-zinc-600/20 text-zinc-500' },
];

function StatusBadge({ status }: { status: LeadStatus }) {
  const s = STATUSES.find((s) => s.key === status);
  return (
    <span className={`inline-block px-2 py-0.5 text-[10px] uppercase tracking-widest font-bold ${s?.color ?? 'bg-zinc-800 text-zinc-400'}`}>
      {s?.label ?? status}
    </span>
  );
}

function timeAgo(date: string) {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'pipeline' | 'list'>('pipeline');

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);

    try {
      const res = await fetch(`/api/admin/leads?${params}`);
      const data = await res.json();
      if (data.error) setError(data.error);
      else {
        setLeads(data.leads);
        setCounts(data.counts);
        setError('');
      }
    } catch {
      setError('Failed to load leads.');
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const timeout = setTimeout(fetchLeads, 300);
    return () => clearTimeout(timeout);
  }, [fetchLeads]);

  const updateStatus = async (leadId: string, newStatus: LeadStatus) => {
    setLeads((prev) => prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l)));
    setCounts((prev) => {
      const old = leads.find((l) => l.id === leadId);
      if (!old) return prev;
      return {
        ...prev,
        [old.status]: Math.max(0, (prev[old.status] ?? 0) - 1),
        [newStatus]: (prev[newStatus] ?? 0) + 1,
      };
    });

    await fetch(`/api/admin/leads/${leadId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">CRM / Leads</h1>
          <p className="text-zinc-500 text-sm">Track and manage leads through your pipeline.</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-zinc-800 bg-zinc-950 text-white px-3 py-2 text-sm focus:border-red-600 focus:outline-none w-56"
          />
          <div className="flex border border-zinc-800 divide-x divide-zinc-800">
            {(['pipeline', 'list'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-2 text-xs uppercase tracking-widest font-bold transition-colors ${
                  view === v ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center h-64">
          <div className="w-6 h-6 border-2 border-zinc-700 border-t-red-600 rounded-full animate-spin" />
        </div>
      )}

      {error && !loading && <p className="text-red-400 text-sm">{error}</p>}

      {!loading && !error && view === 'pipeline' && (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {STATUSES.map((col) => {
            const colLeads = leads.filter((l) => l.status === col.key);
            return (
              <div key={col.key} className="min-w-[240px] flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs uppercase tracking-widest font-bold text-zinc-500">{col.label}</span>
                  <span className="text-xs font-bold text-zinc-600">({counts[col.key] ?? 0})</span>
                </div>
                <div className="space-y-2">
                  {colLeads.map((lead) => (
                    <div key={lead.id} className="bg-zinc-900 border border-zinc-800 p-4">
                      <Link href={`/admin/leads/${lead.id}`} className="block mb-2">
                        <p className="text-white font-bold text-sm hover:text-red-400 transition-colors">{lead.name}</p>
                        <p className="text-zinc-500 text-xs truncate">{lead.email}</p>
                      </Link>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-600">{lead.source}</span>
                        <select
                          value={lead.status}
                          onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                          className="bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs px-1.5 py-1 focus:outline-none focus:border-red-600 cursor-pointer"
                        >
                          {STATUSES.map((s) => (
                            <option key={s.key} value={s.key}>{s.label}</option>
                          ))}
                        </select>
                      </div>
                      <p className="text-zinc-700 text-[10px] mt-2">{timeAgo(lead.updated_at)}</p>
                    </div>
                  ))}
                  {colLeads.length === 0 && (
                    <p className="text-zinc-700 text-xs text-center py-8">No leads</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && !error && view === 'list' && (
        <div className="bg-zinc-900 border border-zinc-800">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left text-xs uppercase tracking-widest font-bold text-zinc-600 px-4 py-3">Name</th>
                <th className="text-left text-xs uppercase tracking-widest font-bold text-zinc-600 px-4 py-3">Email</th>
                <th className="text-left text-xs uppercase tracking-widest font-bold text-zinc-600 px-4 py-3">Phone</th>
                <th className="text-left text-xs uppercase tracking-widest font-bold text-zinc-600 px-4 py-3">Source</th>
                <th className="text-left text-xs uppercase tracking-widest font-bold text-zinc-600 px-4 py-3">Status</th>
                <th className="text-left text-xs uppercase tracking-widest font-bold text-zinc-600 px-4 py-3">Updated</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                  <td className="px-4 py-3">
                    <Link href={`/admin/leads/${lead.id}`} className="text-white text-sm font-medium hover:text-red-400 transition-colors">
                      {lead.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-zinc-400 text-sm">{lead.email}</td>
                  <td className="px-4 py-3 text-zinc-400 text-sm">{lead.phone || '—'}</td>
                  <td className="px-4 py-3">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-600">{lead.source}</span>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={lead.status}
                      onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                      className="bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs px-1.5 py-1 focus:outline-none focus:border-red-600 cursor-pointer"
                    >
                      {STATUSES.map((s) => (
                        <option key={s.key} value={s.key}>{s.label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-zinc-600 text-xs">{timeAgo(lead.updated_at)}</td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-zinc-500 text-sm py-12">No leads found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
