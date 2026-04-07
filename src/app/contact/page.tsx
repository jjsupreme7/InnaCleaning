'use client';

import { useState } from 'react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';

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
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading title={c.title} subtitle={c.subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Info */}
          <div className="border border-zinc-700/50 rounded-sm p-6 md:p-8 relative">
            <div className="absolute top-0 left-0 w-8 h-[2px] bg-red-500" />
            <div className="absolute top-0 left-0 w-[2px] h-8 bg-red-500" />

            <h3 className="text-sm uppercase tracking-widest font-bold text-zinc-500 mb-6">
              {c.infoHeading}
            </h3>

            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-zinc-500 mb-1">{c.phone}</p>
                <a href="tel:+12065551234" className="text-lg font-bold text-white hover:text-red-400 transition-colors">
                  (206) 555-1234
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-zinc-500 mb-1">{c.email}</p>
                <a href="mailto:inna@innacleaning.com" className="text-lg font-bold text-white hover:text-red-400 transition-colors">
                  inna@innacleaning.com
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-zinc-500 mb-1">{c.hours}</p>
                <p className="text-zinc-400 text-sm">{c.hoursWeekday}</p>
                <p className="text-zinc-400 text-sm">{c.hoursSunday}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-zinc-500 mb-1">{c.serviceArea}</p>
                <p className="text-zinc-400 text-sm">{c.serviceAreaText}</p>
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
          <div className="border border-zinc-700/50 rounded-sm p-6 md:p-8 relative">
            <div className="absolute bottom-0 right-0 w-8 h-[2px] bg-red-500" />
            <div className="absolute bottom-0 right-0 w-[2px] h-8 bg-red-500" />
            {submitted ? (
              <div className="text-center py-12 border border-zinc-800 bg-zinc-900">
                <div className="text-3xl mb-3 text-red-500">&#10003;</div>
                <h3 className="text-lg font-bold text-white mb-2">{c.messageSent}</h3>
                <p className="text-zinc-400 text-sm mb-4">{c.messageConfirm}</p>
                <Button onClick={() => { setSubmitted(false); setName(''); setEmail(''); setMessage(''); }} variant="outline" size="sm">
                  {c.sendAnother}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-zinc-500 mb-2">{c.name}</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-2 border-zinc-700 bg-zinc-900 text-white px-4 py-3 text-sm focus:border-red-600 focus:outline-none transition-colors"
                    placeholder={c.namePlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-zinc-500 mb-2">{c.emailLabel}</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-2 border-zinc-700 bg-zinc-900 text-white px-4 py-3 text-sm focus:border-red-600 focus:outline-none transition-colors"
                    placeholder={c.emailPlaceholder}
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-zinc-500 mb-2">{c.message}</label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border-2 border-zinc-700 bg-zinc-900 text-white px-4 py-3 text-sm focus:border-red-600 focus:outline-none transition-colors resize-none"
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
  );
}
