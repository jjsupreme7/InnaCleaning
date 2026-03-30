'use client';

import { useState } from 'react';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading
          title="Get in Touch"
          subtitle="I'd love to hear from you"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 max-w-4xl mx-auto">
          {/* Contact Info */}
          <div>
            <h3 className="text-sm uppercase tracking-widest font-bold text-gray-400 mb-6 flex items-center gap-2">
              <span className="w-5 h-px bg-sky-500" />
              Contact Information
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4.5 h-4.5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">Phone</p>
                  <a
                    href="tel:+12065551234"
                    className="text-lg font-bold text-slate-800 hover:text-sky-600 transition-colors"
                  >
                    (206) 555-1234
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4.5 h-4.5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
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
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4.5 h-4.5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">Hours</p>
                  <p className="text-gray-600 text-sm">Monday – Saturday: 8am – 7pm</p>
                  <p className="text-gray-600 text-sm">Sunday: Closed</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4.5 h-4.5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">Service Area</p>
                  <p className="text-gray-600 text-sm">Seattle, Bellevue, Tacoma & surrounding cities</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="tel:+12065551234"
                className="inline-flex items-center gap-2 bg-sky-600 text-white px-6 py-3 text-xs uppercase tracking-widest font-bold border-2 border-sky-600 rounded-sm hover:bg-sky-700 hover:border-sky-700 shadow-md shadow-sky-600/20 hover:shadow-lg transition-all duration-300"
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
              <div className="text-center py-14 border border-sky-100 bg-gradient-to-br from-sky-50 to-white rounded-sm">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Message Sent!</h3>
                <p className="text-gray-500 text-sm mb-6">I&apos;ll get back to you as soon as possible.</p>
                <Button onClick={() => setSubmitted(false)} variant="outline" size="sm">
                  Send Another
                </Button>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="space-y-5"
              >
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full border-2 border-gray-200 rounded-sm px-4 py-3 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all bg-white"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full border-2 border-gray-200 rounded-sm px-4 py-3 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all bg-white"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Message</label>
                  <textarea
                    rows={5}
                    required
                    className="w-full border-2 border-gray-200 rounded-sm px-4 py-3 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all resize-none bg-white"
                    placeholder="How can I help you?"
                  />
                </div>
                <Button type="submit" variant="primary" size="lg" className="w-full text-center">
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
