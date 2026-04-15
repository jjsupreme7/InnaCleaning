'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { findServiceAreaByZip } from '@/data/serviceAreas';
import { useLanguage } from '@/contexts/LanguageContext';

type Status =
  | { kind: 'idle' }
  | { kind: 'invalid' }
  | { kind: 'covered'; city: string }
  | { kind: 'uncovered' };

export default function ZipChecker() {
  const { t } = useLanguage();
  const [zip, setZip] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = zip.trim();
    if (!/^\d{5}$/.test(trimmed)) {
      setStatus({ kind: 'invalid' });
      return;
    }
    const match = findServiceAreaByZip(trimmed);
    setStatus(match ? { kind: 'covered', city: match.city } : { kind: 'uncovered' });
  };

  const handleChange = (value: string) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 5);
    setZip(digitsOnly);
    if (status.kind !== 'idle') setStatus({ kind: 'idle' });
  };

  return (
    <div className="mx-auto w-full max-w-xl">
      <form
        onSubmit={handleSubmit}
        className="theme-transition flex flex-col sm:flex-row gap-3 rounded-2xl border p-3 shadow-sm"
        style={{ borderColor: 'var(--card-border)', background: 'var(--card-bg)' }}
        aria-label={t.areas.checker.label}
      >
        <label htmlFor="zip-checker-input" className="sr-only">
          {t.areas.checker.label}
        </label>
        <input
          id="zip-checker-input"
          type="text"
          inputMode="numeric"
          autoComplete="postal-code"
          pattern="\d{5}"
          maxLength={5}
          value={zip}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={t.areas.checker.placeholder}
          className="theme-transition flex-1 rounded-xl bg-transparent px-5 py-3 text-base outline-none placeholder:opacity-60"
          style={{ color: 'var(--text-primary)' }}
          aria-describedby="zip-checker-result"
        />
        <button
          type="submit"
          disabled={zip.length !== 5}
          className="rounded-xl bg-red-600 px-6 py-3 text-sm uppercase tracking-widest font-bold text-white transition-all duration-300 hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {t.areas.checker.button}
        </button>
      </form>

      <div
        id="zip-checker-result"
        role="status"
        aria-live="polite"
        className="mt-4 min-h-[3rem] text-center"
      >
        {status.kind === 'invalid' && (
          <p className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
            {t.areas.checker.invalid}
          </p>
        )}
        {status.kind === 'covered' && (
          <div className="inline-flex flex-col items-center gap-2 rounded-xl border border-green-600/40 bg-green-600/10 px-5 py-3">
            <p className="text-sm font-bold text-green-700 dark:text-green-400">
              {t.areas.checker.covered.replace('{city}', status.city)}
            </p>
            <Link
              href="/quote"
              className="text-xs uppercase tracking-widest font-bold text-red-600 hover:text-red-700 underline underline-offset-4"
            >
              {t.areas.checker.coveredCta}
            </Link>
          </div>
        )}
        {status.kind === 'uncovered' && (
          <div className="inline-flex flex-col items-center gap-2 rounded-xl border border-amber-600/40 bg-amber-600/10 px-5 py-3">
            <p className="text-sm font-bold text-amber-700 dark:text-amber-400">
              {t.areas.checker.uncovered}
            </p>
            <Link
              href="/contact"
              className="text-xs uppercase tracking-widest font-bold text-red-600 hover:text-red-700 underline underline-offset-4"
            >
              {t.areas.checker.uncoveredCta}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
