'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function PortalLoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      router.push('/portal');
    }
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setError(error.message);
    } else {
      setSuccess('Check your email to confirm your account, then log in.');
    }
    setLoading(false);
  };

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="max-w-md mx-auto">
          <div className="text-center mb-10">
            <Link href="/" className="text-2xl font-bold uppercase tracking-[0.1em] text-white">
              Inna Cleaning
            </Link>
            <p className="text-zinc-500 text-sm mt-2">Customer Portal</p>
          </div>

          {/* Tab switcher */}
          <div className="flex border border-zinc-800 mb-8">
            <button
              onClick={() => { setTab('login'); setError(''); setSuccess(''); }}
              className={`flex-1 py-3 text-xs uppercase tracking-widest font-bold transition-colors ${
                tab === 'login' ? 'bg-red-600 text-white' : 'text-zinc-500 hover:text-white'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => { setTab('signup'); setError(''); setSuccess(''); }}
              className={`flex-1 py-3 text-xs uppercase tracking-widest font-bold transition-colors ${
                tab === 'signup' ? 'bg-red-600 text-white' : 'text-zinc-500 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={tab === 'login' ? handleLogin : handleSignup} className="space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-zinc-500 mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 border-zinc-700 bg-zinc-900 text-white px-4 py-3 text-sm focus:border-red-600 focus:outline-none transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-zinc-500 mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-2 border-zinc-700 bg-zinc-900 text-white px-4 py-3 text-sm focus:border-red-600 focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}
            {success && <p className="text-green-400 text-sm">{success}</p>}

            <Button type="submit" variant="primary" size="lg" className="w-full text-center" disabled={loading}>
              {loading ? '…' : tab === 'login' ? 'Log In' : 'Create Account'}
            </Button>
          </form>

          <p className="text-center text-zinc-600 text-xs mt-6">
            <Link href="/" className="hover:text-zinc-400 transition-colors">← Back to site</Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
