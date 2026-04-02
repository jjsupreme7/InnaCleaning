'use client';

import { useEffect, useState } from 'react';

interface Contact {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/contacts')
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setContacts(d.contacts);
      })
      .catch(() => setError('Failed to load messages.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">Messages</h1>
      <p className="text-zinc-500 text-sm mb-8">All contact messages submitted through the site.</p>

      {loading && (
        <div className="flex items-center justify-center h-40">
          <div className="w-6 h-6 border-2 border-zinc-700 border-t-red-600 rounded-full animate-spin" />
        </div>
      )}
      {error && <p className="text-red-400 text-sm">{error}</p>}
      {!loading && !error && contacts.length === 0 && (
        <p className="text-zinc-500 text-sm">No messages yet.</p>
      )}
      {!loading && !error && contacts.length > 0 && (
        <div className="space-y-4">
          {contacts.map((c) => (
            <div key={c.id} className="bg-zinc-900 border border-zinc-800 p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-white font-bold">{c.name}</p>
                  <a
                    href={`mailto:${c.email}`}
                    className="text-zinc-400 text-sm hover:text-white transition-colors"
                  >
                    {c.email}
                  </a>
                </div>
                <p className="text-zinc-600 text-xs shrink-0 ml-4">
                  {new Date(c.created_at).toLocaleDateString()}
                </p>
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">{c.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
