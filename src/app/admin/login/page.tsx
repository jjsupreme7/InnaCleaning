'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed.');
        setLoading(false);
        return;
      }

      router.push('/admin');
    } catch {
      setError('Something went wrong.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-red-600 mb-2">Inna Cleaning</p>
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 border border-zinc-800 p-8 space-y-5"
        >
          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-widest font-bold text-zinc-400">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-zinc-700 bg-zinc-950 text-white px-4 py-3 text-sm focus:border-red-600 focus:outline-none transition-colors"
              placeholder="admin@example.com"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs uppercase tracking-widest font-bold text-zinc-400">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-zinc-700 bg-zinc-950 text-white px-4 py-3 text-sm focus:border-red-600 focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white text-xs uppercase tracking-widest font-bold py-3.5 transition-colors disabled:opacity-50"
          >
            {loading ? '…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
