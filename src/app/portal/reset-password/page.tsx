'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Supabase automatically picks up the recovery token from the URL hash
    // and sets the session. We listen for the PASSWORD_RECOVERY event.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setReady(true);
      }
    });

    // Also check if there's already a session (user clicked link and session was set)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => router.push('/portal'), 2000);
    }
    setLoading(false);
  };

  return (
    <div className="theme-transition min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--section-alt)' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-xl font-bold uppercase tracking-[0.15em]" style={{ color: 'var(--text-primary)' }}>
            Inna Cleaning
          </Link>
        </div>

        <div className="rounded-xl border p-8" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--card-border)' }}>
          {success ? (
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-green-500 text-2xl">&#10003;</span>
              </div>
              <h1 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Password Updated</h1>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Redirecting to your portal...</p>
            </div>
          ) : (
            <>
              <h1 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Set New Password</h1>
              <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>Enter your new password below.</p>

              {!ready && (
                <p className="text-sm text-amber-500 mb-4">Verifying your reset link...</p>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="block text-xs uppercase tracking-widest font-bold" style={{ color: 'var(--text-secondary)' }}>
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border px-4 py-3 text-sm focus:border-red-500 focus:outline-none transition-colors"
                    style={{ background: 'var(--input-bg)', borderColor: 'var(--input-border)', color: 'var(--text-primary)' }}
                    placeholder="••••••••"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs uppercase tracking-widest font-bold" style={{ color: 'var(--text-secondary)' }}>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    required
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="w-full rounded-lg border px-4 py-3 text-sm focus:border-red-500 focus:outline-none transition-colors"
                    style={{ background: 'var(--input-bg)', borderColor: 'var(--input-border)', color: 'var(--text-primary)' }}
                    placeholder="••••••••"
                  />
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={loading || !ready}
                  className="w-full bg-red-600 hover:bg-red-700 text-white text-xs uppercase tracking-widest font-bold py-3.5 transition-colors disabled:opacity-50"
                >
                  {loading ? '...' : 'Update Password'}
                </button>
              </form>
            </>
          )}
        </div>

        <p className="text-center text-xs mt-6" style={{ color: 'var(--text-muted)' }}>
          <Link href="/portal/login" className="transition-colors hover:text-red-400">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
