'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import type { Lead, LeadNote, LeadStatus, NoteType } from '@/types';

const STATUSES: { key: LeadStatus; label: string; color: string }[] = [
  { key: 'new_lead', label: 'New Lead', color: 'bg-blue-600/20 text-blue-400 border-blue-600/30' },
  { key: 'contacted', label: 'Contacted', color: 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30' },
  { key: 'quote_sent', label: 'Quote Sent', color: 'bg-purple-600/20 text-purple-400 border-purple-600/30' },
  { key: 'follow_up', label: 'Follow Up', color: 'bg-orange-600/20 text-orange-400 border-orange-600/30' },
  { key: 'booked', label: 'Booked', color: 'bg-green-600/20 text-green-400 border-green-600/30' },
  { key: 'lost', label: 'Lost', color: 'bg-zinc-600/20 text-zinc-500 border-zinc-600/30' },
];

interface Booking {
  id: string;
  service_type: string;
  preferred_date: string;
  preferred_time: string;
  address: string;
  status: string;
  notes: string | null;
  created_at: string;
}

interface Quote {
  id: string;
  cleaning_type: string;
  home_size: string;
  frequency: string;
  estimated_total: number | null;
  created_at: string;
}

interface Contact {
  id: string;
  message: string;
  created_at: string;
}

type TimelineItem =
  | { type: 'booking'; data: Booking; created_at: string }
  | { type: 'quote'; data: Quote; created_at: string }
  | { type: 'contact'; data: Contact; created_at: string }
  | { type: 'note'; data: LeadNote; created_at: string };

export default function LeadDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [lead, setLead] = useState<Lead | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [notes, setNotes] = useState<LeadNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [noteContent, setNoteContent] = useState('');
  const [noteType, setNoteType] = useState<NoteType>('note');
  const [saving, setSaving] = useState(false);

  const [newTag, setNewTag] = useState('');

  const fetchLead = async () => {
    try {
      const res = await fetch(`/api/admin/leads/${id}`);
      const data = await res.json();
      if (data.error) setError(data.error);
      else {
        setLead(data.lead);
        setBookings(data.bookings);
        setQuotes(data.quotes);
        setContacts(data.contacts);
        setNotes(data.notes);
      }
    } catch {
      setError('Failed to load lead.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLead(); }, [id]);

  const updateStatus = async (status: LeadStatus) => {
    if (!lead) return;
    setLead({ ...lead, status });
    await fetch(`/api/admin/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
  };

  const addNote = async () => {
    if (!noteContent.trim()) return;
    setSaving(true);
    const res = await fetch(`/api/admin/leads/${id}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: noteContent, type: noteType }),
    });
    const data = await res.json();
    if (data.note) {
      setNotes([data.note, ...notes]);
      setNoteContent('');
    }
    setSaving(false);
  };

  const addTag = async () => {
    if (!newTag.trim() || !lead) return;
    const tags = [...lead.tags, newTag.trim()];
    setLead({ ...lead, tags });
    setNewTag('');
    await fetch(`/api/admin/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tags }),
    });
  };

  const removeTag = async (tag: string) => {
    if (!lead) return;
    const tags = lead.tags.filter((t) => t !== tag);
    setLead({ ...lead, tags });
    await fetch(`/api/admin/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tags }),
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-zinc-700 border-t-red-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !lead) {
    return <p className="text-red-400 text-sm">{error || 'Lead not found.'}</p>;
  }

  const timeline: TimelineItem[] = [
    ...bookings.map((b) => ({ type: 'booking' as const, data: b, created_at: b.created_at })),
    ...quotes.map((q) => ({ type: 'quote' as const, data: q, created_at: q.created_at })),
    ...contacts.map((c) => ({ type: 'contact' as const, data: c, created_at: c.created_at })),
    ...notes.map((n) => ({ type: 'note' as const, data: n, created_at: n.created_at })),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return (
    <div>
      <Link href="/admin/leads" className="text-zinc-500 hover:text-white text-sm transition-colors mb-4 inline-block">
        &larr; Back to Leads
      </Link>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact info */}
          <div className="bg-zinc-900 border border-zinc-800 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-white">{lead.name}</h1>
                <a href={`mailto:${lead.email}`} className="text-zinc-400 text-sm hover:text-white transition-colors">{lead.email}</a>
                {lead.phone && <p className="text-zinc-500 text-sm mt-1">{lead.phone}</p>}
                {lead.address && <p className="text-zinc-500 text-sm">{lead.address}</p>}
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-600">{lead.source}</span>
            </div>
            <p className="text-zinc-700 text-xs">
              Created {new Date(lead.created_at).toLocaleDateString()}
            </p>
          </div>

          {/* Status controls */}
          <div className="bg-zinc-900 border border-zinc-800 p-4">
            <p className="text-xs uppercase tracking-widest font-bold text-zinc-500 mb-3">Pipeline Stage</p>
            <div className="flex flex-wrap gap-2">
              {STATUSES.map((s) => (
                <button
                  key={s.key}
                  onClick={() => updateStatus(s.key)}
                  className={`px-3 py-1.5 text-xs uppercase tracking-widest font-bold border transition-colors ${
                    lead.status === s.key
                      ? `${s.color} border-current`
                      : 'bg-zinc-800/50 text-zinc-500 border-zinc-800 hover:text-white hover:border-zinc-600'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Activity timeline */}
          <div className="bg-zinc-900 border border-zinc-800 p-6">
            <p className="text-xs uppercase tracking-widest font-bold text-zinc-500 mb-4">Activity Timeline</p>
            {timeline.length === 0 && <p className="text-zinc-500 text-sm">No activity yet.</p>}
            <div className="space-y-4">
              {timeline.map((item, i) => (
                <div key={i} className="border-l-2 border-zinc-800 pl-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] uppercase tracking-widest font-bold ${
                      item.type === 'booking' ? 'text-blue-400' :
                      item.type === 'quote' ? 'text-purple-400' :
                      item.type === 'contact' ? 'text-yellow-400' :
                      'text-zinc-500'
                    }`}>
                      {item.type}
                    </span>
                    <span className="text-zinc-700 text-xs">
                      {new Date(item.created_at).toLocaleDateString()} {new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  {item.type === 'booking' && (
                    <div className="text-sm">
                      <p className="text-zinc-300">{item.data.service_type} cleaning — {item.data.preferred_date}</p>
                      <p className="text-zinc-500 text-xs">{item.data.address}</p>
                      {item.data.status && (
                        <span className="inline-block mt-1 px-2 py-0.5 text-[10px] uppercase tracking-widest font-bold bg-zinc-800 text-zinc-400">
                          {item.data.status}
                        </span>
                      )}
                    </div>
                  )}
                  {item.type === 'quote' && (
                    <div className="text-sm">
                      <p className="text-zinc-300">
                        {item.data.cleaning_type} — {item.data.home_size}
                        {item.data.estimated_total && ` — $${item.data.estimated_total}`}
                      </p>
                      <p className="text-zinc-500 text-xs">{item.data.frequency}</p>
                    </div>
                  )}
                  {item.type === 'contact' && (
                    <p className="text-zinc-300 text-sm whitespace-pre-wrap">{item.data.message}</p>
                  )}
                  {item.type === 'note' && (
                    <div>
                      <span className="text-zinc-600 text-xs">[{item.data.type}]</span>
                      <p className="text-zinc-300 text-sm whitespace-pre-wrap">{item.data.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Add note */}
          <div className="bg-zinc-900 border border-zinc-800 p-6">
            <p className="text-xs uppercase tracking-widest font-bold text-zinc-500 mb-3">Add Note</p>
            <textarea
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
              placeholder="Write a note..."
              rows={3}
              className="w-full border border-zinc-700 bg-zinc-950 text-white px-3 py-2 text-sm focus:border-red-600 focus:outline-none resize-none mb-3"
            />
            <div className="flex items-center gap-2">
              <select
                value={noteType}
                onChange={(e) => setNoteType(e.target.value as NoteType)}
                className="bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs px-2 py-1.5 focus:outline-none focus:border-red-600"
              >
                <option value="note">Note</option>
                <option value="call">Call</option>
                <option value="email">Email</option>
              </select>
              <button
                onClick={addNote}
                disabled={saving || !noteContent.trim()}
                className="bg-red-600 hover:bg-red-700 text-white text-xs uppercase tracking-widest font-bold px-4 py-1.5 transition-colors disabled:opacity-50"
              >
                {saving ? '...' : 'Add'}
              </button>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-zinc-900 border border-zinc-800 p-6">
            <p className="text-xs uppercase tracking-widest font-bold text-zinc-500 mb-3">Tags</p>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {lead.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 bg-zinc-800 text-zinc-300 text-xs px-2 py-1">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="text-zinc-600 hover:text-white transition-colors">&times;</button>
                </span>
              ))}
              {lead.tags.length === 0 && <p className="text-zinc-600 text-xs">No tags</p>}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTag()}
                placeholder="Add tag..."
                className="flex-1 border border-zinc-700 bg-zinc-950 text-white px-2 py-1 text-xs focus:border-red-600 focus:outline-none"
              />
              <button
                onClick={addTag}
                disabled={!newTag.trim()}
                className="text-xs text-zinc-500 hover:text-white transition-colors disabled:opacity-30"
              >
                Add
              </button>
            </div>
          </div>

          {/* Quick stats */}
          <div className="bg-zinc-900 border border-zinc-800 p-6">
            <p className="text-xs uppercase tracking-widest font-bold text-zinc-500 mb-3">Summary</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Bookings</span>
                <span className="text-white font-bold">{bookings.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Quotes</span>
                <span className="text-white font-bold">{quotes.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Messages</span>
                <span className="text-white font-bold">{contacts.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Notes</span>
                <span className="text-white font-bold">{notes.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
