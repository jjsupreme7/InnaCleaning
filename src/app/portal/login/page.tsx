'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

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
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-xl font-bold uppercase tracking-[0.15em] text-white">
            Inna Cleaning
          </Link>
        </div>

        {/* Card */}
        <div className="overflow-hidden border border-zinc-800 grid md:grid-cols-2">
          {/* Form side */}
          <div className="bg-zinc-950 p-8 md:p-10">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-white">
                {tab === 'login' ? 'Welcome back' : 'Create account'}
              </h1>
              <p className="text-zinc-500 text-sm mt-1">
                {tab === 'login' ? 'Log in to your customer portal' : 'Sign up for a free account'}
              </p>
            </div>

            {/* Tab switcher */}
            <div className="flex border border-zinc-800 mb-7">
              <button
                onClick={() => { setTab('login'); setError(''); setSuccess(''); }}
                className={`flex-1 py-2.5 text-xs uppercase tracking-widest font-bold transition-colors ${
                  tab === 'login' ? 'bg-red-600 text-white' : 'text-zinc-500 hover:text-white'
                }`}
              >
                Log In
              </button>
              <button
                onClick={() => { setTab('signup'); setError(''); setSuccess(''); }}
                className={`flex-1 py-2.5 text-xs uppercase tracking-widest font-bold transition-colors ${
                  tab === 'signup' ? 'bg-red-600 text-white' : 'text-zinc-500 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={tab === 'login' ? handleLogin : handleSignup} className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-widest font-bold text-zinc-400">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-zinc-700 bg-zinc-900 text-white px-4 py-3 text-sm focus:border-red-600 focus:outline-none transition-colors placeholder:text-zinc-600"
                  placeholder="your@email.com"
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs uppercase tracking-widest font-bold text-zinc-400">
                    Password
                  </label>
                  {tab === 'login' && (
                    <a href="#" className="text-xs text-zinc-500 hover:text-white transition-colors">
                      Forgot password?
                    </a>
                  )}
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-zinc-700 bg-zinc-900 text-white px-4 py-3 text-sm focus:border-red-600 focus:outline-none transition-colors placeholder:text-zinc-600"
                  placeholder="••••••••"
                />
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}
              {success && <p className="text-green-400 text-sm">{success}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white text-xs uppercase tracking-widest font-bold py-3.5 transition-colors disabled:opacity-50"
              >
                {loading ? '…' : tab === 'login' ? 'Log In' : 'Create Account'}
              </button>
            </form>

            <p className="text-center text-xs text-zinc-600 mt-8">
              <Link href="/" className="hover:text-zinc-400 transition-colors">
                ← Back to site
              </Link>
            </p>
          </div>

          {/* Image side */}
          <div className="relative hidden md:block">
            <Image
              src="/images/mansion.jpg"
              alt="Luxury home"
              fill
              className="object-cover"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <p className="text-white font-bold text-lg leading-snug">
                &ldquo;My home has never looked this good.&rdquo;
              </p>
              <p className="text-white/60 text-sm mt-2">— Sarah M., Bellevue</p>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-zinc-700 mt-6">
          By logging in, you agree to our{' '}
          <a href="#" className="underline underline-offset-2 hover:text-zinc-500 transition-colors">Terms of Service</a>{' '}
          and{' '}
          <a href="#" className="underline underline-offset-2 hover:text-zinc-500 transition-colors">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
