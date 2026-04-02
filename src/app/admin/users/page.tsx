'use client';

import { useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  provider: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/users')
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setUsers(d.users);
      })
      .catch(() => setError('Failed to load users.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">Portal Users</h1>
      <p className="text-zinc-500 text-sm mb-8">Everyone who has created a portal account.</p>

      {loading && (
        <div className="flex items-center justify-center h-40">
          <div className="w-6 h-6 border-2 border-zinc-700 border-t-red-600 rounded-full animate-spin" />
        </div>
      )}
      {error && <p className="text-red-400 text-sm">{error}</p>}
      {!loading && !error && users.length === 0 && (
        <p className="text-zinc-500 text-sm">No users yet.</p>
      )}
      {!loading && !error && users.length > 0 && (
        <div className="border border-zinc-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900">
                <th className="text-left px-4 py-3 text-xs uppercase tracking-widest font-bold text-zinc-500">Email</th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-widest font-bold text-zinc-500">Provider</th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-widest font-bold text-zinc-500">Signed Up</th>
                <th className="text-left px-4 py-3 text-xs uppercase tracking-widest font-bold text-zinc-500">Last Sign In</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u.id} className={i % 2 === 0 ? 'bg-zinc-950' : 'bg-zinc-900/50'}>
                  <td className="px-4 py-3 text-white">{u.email}</td>
                  <td className="px-4 py-3 text-zinc-400 capitalize">{u.provider}</td>
                  <td className="px-4 py-3 text-zinc-400">
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-zinc-400">
                    {u.last_sign_in_at ? new Date(u.last_sign_in_at).toLocaleDateString() : '—'}
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
