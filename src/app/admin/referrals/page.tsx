'use client';

import { useEffect, useState } from 'react';
import { Copy, Plus, X, Loader2, Check } from 'lucide-react';

interface LeadRef {
  name: string;
  email: string;
}

interface ReferralCode {
  id: string;
  code: string;
  lead_id: string;
  discount_percent: number;
  max_uses: number;
  uses_count: number;
  active: boolean;
  notes: string | null;
  created_at: string;
  inna_leads: LeadRef | null;
}

interface LeadSearchResult {
  id: string;
  name: string;
  email: string;
}

export default function AdminReferralsPage() {
  const [codes, setCodes] = useState<ReferralCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const loadCodes = async () => {
    try {
      const res = await fetch('/api/admin/referral-codes');
      const data = await res.json();
      if (data.error) setError(data.error);
      else setCodes(data.codes || []);
    } catch {
      setError('Failed to load referral codes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCodes();
  }, []);

  const toggleActive = async (codeId: string, active: boolean) => {
    const prev = codes;
    setCodes((cur) => cur.map((c) => (c.id === codeId ? { ...c, active } : c)));
    try {
      const res = await fetch(`/api/admin/referral-codes/${codeId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setCodes(prev);
    }
  };

  const copyShareLink = (code: string) => {
    const url = `${window.location.origin}/booking?ref=${code}`;
    navigator.clipboard.writeText(url);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Referral Codes</h1>
          <p className="text-zinc-500 text-sm">
            Create codes for customers to share. Each code gives 12% off and allows up to 4 uses.
            When a code hits 4 uses, the referrer earns 15% off their next 4 bookings.
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Code
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="w-6 h-6 text-red-500 animate-spin" />
        </div>
      )}
      {error && <p className="text-red-400 text-sm">{error}</p>}
      {!loading && !error && codes.length === 0 && (
        <p className="text-zinc-500 text-sm">No referral codes yet. Create one to get started.</p>
      )}

      {!loading && !error && codes.length > 0 && (
        <div className="space-y-3">
          {codes.map((c) => (
            <div key={c.id} className="bg-zinc-900 border border-zinc-800 p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <code className="text-lg font-bold text-white tracking-wider">{c.code}</code>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${
                        c.active ? 'bg-green-600/20 text-green-400' : 'bg-zinc-800 text-zinc-500'
                      }`}
                    >
                      {c.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400">
                    For <span className="text-white">{c.inna_leads?.name ?? 'Unknown'}</span>
                    {c.inna_leads?.email && <> · {c.inna_leads.email}</>}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => copyShareLink(c.code)}
                    className="inline-flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-bold uppercase tracking-wider px-3 py-1.5 transition-colors"
                  >
                    {copiedCode === c.code ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Link
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => toggleActive(c.id, !c.active)}
                    className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white px-3 py-1.5 transition-colors"
                  >
                    {c.active ? 'Deactivate' : 'Reactivate'}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-zinc-800">
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold text-zinc-600 mb-0.5">Discount</p>
                  <p className="text-zinc-300 text-sm">{c.discount_percent}% off</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold text-zinc-600 mb-0.5">Uses</p>
                  <p className="text-zinc-300 text-sm">{c.uses_count} / {c.max_uses}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold text-zinc-600 mb-0.5">Created</p>
                  <p className="text-zinc-300 text-sm">{new Date(c.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showCreate && (
        <CreateCodeModal
          onClose={() => setShowCreate(false)}
          onCreated={() => {
            setShowCreate(false);
            loadCodes();
          }}
        />
      )}
    </div>
  );
}

function CreateCodeModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<LeadSearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [selectedLead, setSelectedLead] = useState<LeadSearchResult | null>(null);
  const [customCode, setCustomCode] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      return;
    }
    const handle = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(`/api/admin/leads?search=${encodeURIComponent(search)}`);
        const data = await res.json();
        setResults((data.leads ?? []).slice(0, 8));
      } finally {
        setSearching(false);
      }
    }, 250);
    return () => clearTimeout(handle);
  }, [search]);

  const handleCreate = async () => {
    if (!selectedLead) {
      setError('Pick a customer first.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/admin/referral-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lead_id: selectedLead.id,
          code: customCode.trim() || undefined,
          notes: notes.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to create code.');
        return;
      }
      onCreated();
    } catch {
      setError('Failed to create code.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-zinc-900 border border-zinc-800 max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white">New Referral Code</h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <label className="block text-xs uppercase tracking-widest font-bold text-zinc-500 mb-2">
          Customer
        </label>
        {selectedLead ? (
          <div className="flex items-center justify-between bg-zinc-950 border border-zinc-800 px-3 py-2 mb-4">
            <div>
              <p className="text-sm text-white">{selectedLead.name}</p>
              <p className="text-xs text-zinc-500">{selectedLead.email}</p>
            </div>
            <button
              onClick={() => setSelectedLead(null)}
              className="text-xs text-zinc-500 hover:text-white"
            >
              Change
            </button>
          </div>
        ) : (
          <>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email…"
              className="w-full bg-zinc-950 border border-zinc-800 text-zinc-300 text-sm px-3 py-2 focus:outline-none focus:border-red-600 mb-2"
            />
            {searching && <p className="text-xs text-zinc-500 mb-2">Searching…</p>}
            {results.length > 0 && (
              <div className="border border-zinc-800 max-h-48 overflow-y-auto mb-4">
                {results.map((lead) => (
                  <button
                    key={lead.id}
                    onClick={() => {
                      setSelectedLead(lead);
                      setSearch('');
                      setResults([]);
                    }}
                    className="w-full text-left px-3 py-2 border-b border-zinc-800 last:border-b-0 hover:bg-zinc-800 transition-colors"
                  >
                    <p className="text-sm text-white">{lead.name}</p>
                    <p className="text-xs text-zinc-500">{lead.email}</p>
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        <label className="block text-xs uppercase tracking-widest font-bold text-zinc-500 mb-2">
          Code (optional — auto-generated if blank)
        </label>
        <input
          type="text"
          value={customCode}
          onChange={(e) => setCustomCode(e.target.value.toUpperCase())}
          placeholder="e.g. SARAH2026"
          className="w-full bg-zinc-950 border border-zinc-800 text-zinc-300 text-sm px-3 py-2 focus:outline-none focus:border-red-600 mb-4 font-mono"
        />

        <label className="block text-xs uppercase tracking-widest font-bold text-zinc-500 mb-2">
          Notes (optional)
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          className="w-full bg-zinc-950 border border-zinc-800 text-zinc-300 text-sm px-3 py-2 focus:outline-none focus:border-red-600 mb-4 resize-none"
        />

        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

        <button
          onClick={handleCreate}
          disabled={saving || !selectedLead}
          className="w-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-widest py-3 transition-colors disabled:opacity-50"
        >
          {saving ? 'Creating…' : 'Create Code'}
        </button>
      </div>
    </div>
  );
}
