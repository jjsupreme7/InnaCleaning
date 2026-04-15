'use client';

import { useState } from 'react';
import Image from 'next/image';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';
import BorderBeam from '@/components/ui/BorderBeam';

export default function ContactPage() {
  const { t } = useLanguage();
  const c = t.contact;

  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || c.errorDefault);
      } else {
        setSubmitted(true);
      }
    } catch {
      setError(c.errorNetwork);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    {/* Hero Banner */}
    <section className="relative h-[40vh] min-h-[320px] max-h-[480px] flex items-end overflow-hidden">
      <Image
        src="/images/clean-interior.jpg"
        alt="Clean home interior"
        fill
        className="object-cover object-center"
        priority
        quality={80}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

      <div className="relative z-10 w-full pb-10">
        <Container>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-600 mb-3">
            {c.title}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold text-white font-display">
            {c.subtitle}
          </h1>
        </Container>
      </div>
    </section>

    <section className="theme-transition py-20 md:py-28" style={{ background: 'var(--bg-base)' }}>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Info */}
          <div className="theme-transition border rounded-xl p-6 md:p-8 relative" style={{ borderColor: 'var(--card-border)' }}>
            <BorderBeam />
            <div className="absolute top-0 left-0 w-8 h-[2px] bg-red-500" />
            <div className="absolute top-0 left-0 w-[2px] h-8 bg-red-500" />

            <h3 className="text-sm uppercase tracking-widest font-bold mb-6" style={{ color: 'var(--text-muted)' }}>
              {c.infoHeading}
            </h3>

            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-widest font-bold mb-1" style={{ color: 'var(--text-muted)' }}>{c.phone}</p>
                <a href="tel:+12065551234" className="text-lg font-bold hover:text-red-400 transition-colors" style={{ color: 'var(--text-primary)' }}>
                  (206) 555-1234
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-bold mb-1" style={{ color: 'var(--text-muted)' }}>{c.email}</p>
                <a href="mailto:jjgcallen11@gmail.com" className="text-lg font-bold hover:text-red-400 transition-colors" style={{ color: 'var(--text-primary)' }}>
                  jjgcallen11@gmail.com
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-bold mb-1" style={{ color: 'var(--text-muted)' }}>{c.hours}</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{c.hoursWeekday}</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{c.hoursSunday}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-bold mb-1" style={{ color: 'var(--text-muted)' }}>{c.serviceArea}</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{c.serviceAreaText}</p>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="tel:+12065551234"
                className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 text-xs uppercase tracking-widest font-bold border-2 border-red-600 hover:bg-red-700 hover:border-red-700 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {c.callNow}
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="theme-transition border rounded-xl p-6 md:p-8 relative" style={{ borderColor: 'var(--card-border)' }}>
            <BorderBeam />
            <div className="absolute bottom-0 right-0 w-8 h-[2px] bg-red-500" />
            <div className="absolute bottom-0 right-0 w-[2px] h-8 bg-red-500" />
            {submitted ? (
              <div className="text-center py-12 border" style={{ borderColor: 'var(--card-border)', background: 'var(--card-bg)' }}>
                <div className="text-3xl mb-3 text-red-500">&#10003;</div>
                <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{c.messageSent}</h3>
                <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>{c.messageConfirm}</p>
                <Button onClick={() => { setSubmitted(false); setName(''); setEmail(''); setMessage(''); }} variant="outline" size="sm">
                  {c.sendAnother}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold mb-2" style={{ color: 'var(--text-muted)' }}>{c.name}</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border-2 px-4 py-3 text-sm focus:border-red-500 focus:outline-none transition-colors"
                    style={{ background: 'var(--input-bg)', borderColor: 'var(--input-border)', color: 'var(--text-primary)' }}
                    placeholder={c.namePlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold mb-2" style={{ color: 'var(--text-muted)' }}>{c.emailLabel}</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border-2 px-4 py-3 text-sm focus:border-red-500 focus:outline-none transition-colors"
                    style={{ background: 'var(--input-bg)', borderColor: 'var(--input-border)', color: 'var(--text-primary)' }}
                    placeholder={c.emailPlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold mb-2" style={{ color: 'var(--text-muted)' }}>{c.message}</label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-lg border-2 px-4 py-3 text-sm focus:border-red-500 focus:outline-none transition-colors resize-none"
                    style={{ background: 'var(--input-bg)', borderColor: 'var(--input-border)', color: 'var(--text-primary)' }}
                    placeholder={c.messagePlaceholder}
                  />
                </div>
                {error && <p className="text-red-400 text-sm">{error}</p>}
                <Button type="submit" variant="primary" size="lg" className="w-full text-center" disabled={loading}>
                  {loading ? c.sending : c.send}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
    </>
  );
}
