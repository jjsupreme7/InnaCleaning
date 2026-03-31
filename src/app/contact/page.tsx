'use client';

import { useState } from 'react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';

export default function ContactPage() {
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
        setError(data.error || 'Something went wrong. Please try again.');
      } else {
        setSubmitted(true);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Get in Touch"
          subtitle="I'd love to hear from you"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Info */}
          <div>
            <h3 className="text-sm uppercase tracking-widest font-bold text-gray-400 mb-6">
              Contact Information
            </h3>

            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">Phone</p>
                <a
                  href="tel:+12065551234"
                  className="text-lg font-bold text-slate-800 hover:text-sky-600 transition-colors"
                >
                  (206) 555-1234
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">Email</p>
                <a
                  href="mailto:inna@innacleaning.com"
                  className="text-lg font-bold text-slate-800 hover:text-sky-600 transition-colors"
                >
                  inna@innacleaning.com
                </a>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">Hours</p>
                <p className="text-gray-600 text-sm">Monday – Saturday: 8am – 7pm</p>
                <p className="text-gray-600 text-sm">Sunday: Closed</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">Service Area</p>
                <p className="text-gray-600 text-sm">Seattle, Bellevue, Tacoma & surrounding cities</p>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="tel:+12065551234"
                className="inline-flex items-center gap-2 bg-sky-600 text-white px-6 py-3 text-xs uppercase tracking-widest font-bold border-2 border-sky-600 hover:bg-sky-700 hover:border-sky-700 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            {submitted ? (
              <div className="text-center py-12 border border-gray-200 bg-gray-50">
                <div className="text-3xl mb-3">&#10003;</div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Message Sent!</h3>
                <p className="text-gray-500 text-sm mb-4">I&apos;ll get back to you as soon as possible.</p>
                <Button onClick={() => { setSubmitted(false); setName(''); setEmail(''); setMessage(''); }} variant="outline" size="sm">
                  Send Another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border-2 border-gray-200 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border-2 border-gray-200 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Message</label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border-2 border-gray-200 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none transition-colors resize-none"
                    placeholder="How can I help you?"
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit" variant="primary" size="lg" className="w-full text-center" disabled={loading}>
                  {loading ? 'Sending…' : 'Send Message'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
