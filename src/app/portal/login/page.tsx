'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PortalLoginPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const l = t.login;

  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<'google' | 'apple' | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

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
      setSuccess(l.confirmEmail);
    }
    setLoading(false);
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address first.');
      return;
    }
    setResetLoading(true);
    setError('');
    setSuccess('');
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/portal`,
    });
    if (error) {
      setError(error.message);
    } else {
      setSuccess('Password reset link sent — check your email.');
    }
    setResetLoading(false);
  };

  const handleOAuth = async (provider: 'google' | 'apple') => {
    setOauthLoading(provider);
    setError('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/portal`,
      },
    });
    if (error) {
      setError(error.message);
      setOauthLoading(null);
    }
    // On success, Supabase redirects the browser — no further action needed.
  };

  return (
    <div className="theme-transition min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--section-alt)' }}>
      <div className="w-full max-w-4xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="text-xl font-bold uppercase tracking-[0.15em]" style={{ color: 'var(--text-primary)' }}>
            Inna Cleaning
          </Link>
        </div>

        {/* Card */}
        <div className="overflow-hidden rounded-xl border grid md:grid-cols-2" style={{ borderColor: 'var(--card-border)' }}>
          {/* Form side */}
          <div className="theme-transition p-8 md:p-10" style={{ background: 'var(--bg-elevated)' }}>
            <div className="mb-8">
              <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                {tab === 'login' ? l.welcomeBack : l.createAccount}
              </h1>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                {tab === 'login' ? l.loginSubtitle : l.signupSubtitle}
              </p>
            </div>

            {/* Tab switcher */}
            <div className="flex border mb-7" style={{ borderColor: 'var(--card-border)' }}>
              <button
                onClick={() => { setTab('login'); setError(''); setSuccess(''); }}
                className={`flex-1 py-2.5 text-xs uppercase tracking-widest font-bold transition-colors ${
                  tab === 'login' ? 'bg-red-600 text-white' : ''
                }`}
                style={tab !== 'login' ? { color: 'var(--text-muted)' } : undefined}
              >
                {l.logIn}
              </button>
              <button
                onClick={() => { setTab('signup'); setError(''); setSuccess(''); }}
                className={`flex-1 py-2.5 text-xs uppercase tracking-widest font-bold transition-colors ${
                  tab === 'signup' ? 'bg-red-600 text-white' : ''
                }`}
                style={tab !== 'signup' ? { color: 'var(--text-muted)' } : undefined}
              >
                {l.signUp}
              </button>
            </div>

            {/* OAuth buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => handleOAuth('google')}
                disabled={oauthLoading !== null}
                className="flex items-center justify-center gap-2.5 border text-sm font-medium py-3 px-4 transition-colors disabled:opacity-50"
                style={{ borderColor: 'var(--card-border)', background: 'var(--card-bg)', color: 'var(--text-primary)' }}
              >
                {oauthLoading === 'google' ? (
                  <span className="text-xs">…</span>
                ) : (
                  <>
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span>Google</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => handleOAuth('apple')}
                disabled={oauthLoading !== null}
                className="flex items-center justify-center gap-2.5 border text-sm font-medium py-3 px-4 transition-colors disabled:opacity-50"
                style={{ borderColor: 'var(--card-border)', background: 'var(--card-bg)', color: 'var(--text-primary)' }}
              >
                {oauthLoading === 'apple' ? (
                  <span className="text-xs">…</span>
                ) : (
                  <>
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/>
                    </svg>
                    <span>Apple</span>
                  </>
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="relative text-center mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" style={{ borderColor: 'var(--card-border)' }} />
              </div>
              <span className="relative px-3 text-xs uppercase tracking-widest" style={{ background: 'var(--bg-elevated)', color: 'var(--text-secondary)' }}>
                {l.continueEmail}
              </span>
            </div>

            <form onSubmit={tab === 'login' ? handleLogin : handleSignup} className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-widest font-bold" style={{ color: 'var(--text-secondary)' }}>
                  {l.emailLabel}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border px-4 py-3 text-sm focus:border-red-500 focus:outline-none transition-colors"
                  style={{ background: 'var(--input-bg)', borderColor: 'var(--input-border)', color: 'var(--text-primary)' }}
                  placeholder={l.emailPlaceholder}
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs uppercase tracking-widest font-bold" style={{ color: 'var(--text-secondary)' }}>
                    {l.passwordLabel}
                  </label>
                  {tab === 'login' && (
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      disabled={resetLoading}
                      className="text-xs transition-colors hover:text-red-400 disabled:opacity-50"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {resetLoading ? '…' : l.forgotPassword}
                    </button>
                  )}
                </div>
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

              {error && <p className="text-red-400 text-sm">{error}</p>}
              {success && <p className="text-green-400 text-sm">{success}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white text-xs uppercase tracking-widest font-bold py-3.5 transition-colors disabled:opacity-50"
              >
                {loading ? '…' : tab === 'login' ? l.logInBtn : l.createAccountBtn}
              </button>
            </form>

            <p className="text-center text-xs mt-8" style={{ color: 'var(--text-secondary)' }}>
              <Link href="/" className="transition-colors hover:text-red-400">
                {l.back}
              </Link>
            </p>
          </div>

          {/* Image side */}
          <div className="relative hidden md:block">
            <Image
              src="/images/clean-interior.jpg"
              alt="Luxury home"
              fill
              className="object-cover"
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <p className="text-white font-bold text-lg leading-snug">
                {l.testimonial}
              </p>
              <p className="text-white/60 text-sm mt-2">{l.testimonialAuthor}</p>
            </div>
          </div>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: 'var(--text-muted)' }}>
          {l.termsText}{' '}
          <a href="#" className="underline underline-offset-2 transition-colors">{l.termsLink}</a>{' '}
          {l.and}{' '}
          <a href="#" className="underline underline-offset-2 transition-colors">{l.privacyLink}</a>.
        </p>
      </div>
    </div>
  );
}
