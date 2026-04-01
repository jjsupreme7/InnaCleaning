'use client';

import { useState } from 'react';
import { Check, Clock3, Mail, MapPin, Phone, Send } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="section-shell">
      <Container>
        <div className="mb-12 max-w-3xl">
          <span className="eyebrow scroll-fade-up">
            <Send className="h-3.5 w-3.5" strokeWidth={2} />
            Get in Touch
          </span>
          <h1 className="scroll-fade-up mt-6 font-serif text-5xl leading-[0.95] text-[var(--color-foreground)] md:text-6xl">
            I&apos;d love to hear from you.
          </h1>
          <p className="scroll-fade-up mt-6 text-base leading-8 text-[#617d76] md:text-lg">
            Ask a question, request more details, or let me know what kind of
            cleaning support you need.
          </p>
        </div>

        <div className="grid max-w-5xl gap-8 md:grid-cols-[0.9fr_1.1fr]">
          <div className="scroll-fade-up space-y-4">
            <div className="soft-card p-6">
              <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#748f88]">
                Contact Information
              </h3>

              <div className="mt-6 space-y-6">
                <div>
                  <p className="field-label">Phone</p>
                  <a
                    href="tel:+12065551234"
                    className="flex items-center gap-3 text-lg font-semibold text-[var(--color-foreground)] transition-colors hover:text-[#467968]"
                  >
                    <Phone className="h-5 w-5 text-[#467968]" strokeWidth={1.8} />
                    (206) 555-1234
                  </a>
                </div>

                <div>
                  <p className="field-label">Email</p>
                  <a
                    href="mailto:inna@innacleaning.com"
                    className="flex items-center gap-3 text-lg font-semibold text-[var(--color-foreground)] transition-colors hover:text-[#467968]"
                  >
                    <Mail className="h-5 w-5 text-[#467968]" strokeWidth={1.8} />
                    inna@innacleaning.com
                  </a>
                </div>

                <div>
                  <p className="field-label">Hours</p>
                  <div className="space-y-2 text-sm text-[#617d76]">
                    <p className="flex items-center gap-3">
                      <Clock3 className="h-4 w-4 text-[#467968]" strokeWidth={1.8} />
                      Monday – Saturday: 8am – 7pm
                    </p>
                    <p className="pl-7">Sunday: Closed</p>
                  </div>
                </div>

                <div>
                  <p className="field-label">Service Area</p>
                  <p className="flex items-start gap-3 text-sm leading-7 text-[#617d76]">
                    <MapPin className="mt-1 h-4 w-4 flex-shrink-0 text-[#467968]" strokeWidth={1.8} />
                    Seattle, Bellevue, Tacoma & surrounding cities
                  </p>
                </div>
              </div>
            </div>

            <div className="soft-card p-6">
              <a
                href="tel:+12065551234"
                className="inline-flex items-center gap-2 rounded-full border border-[#467968] bg-[#467968] px-6 py-3.5 text-sm font-semibold tracking-[0.08em] text-white shadow-[0_18px_40px_-22px_rgba(27,69,56,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#3a6659]"
              >
                <Phone className="h-4 w-4" strokeWidth={1.8} />
                Call Now
              </a>
            </div>
          </div>

          <div className="panel-card scroll-fade-up p-6 md:p-8">
            {submitted ? (
              <div className="py-10 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#dff0ea] text-[#467968]">
                  <Check className="h-8 w-8" strokeWidth={2.4} />
                </div>
                <h3 className="mt-6 font-serif text-4xl text-[var(--color-foreground)]">
                  Message Sent!
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#67827b]">
                  I&apos;ll get back to you as soon as possible.
                </p>
                <div className="mt-8">
                  <Button onClick={() => setSubmitted(false)} variant="outline" size="sm">
                    Send Another
                  </Button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="space-y-5"
              >
                <div>
                  <label className="field-label">Name</label>
                  <input
                    type="text"
                    required
                    className="field-input"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="field-label">Email</label>
                  <input
                    type="email"
                    required
                    className="field-input"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="field-label">Message</label>
                  <textarea
                    rows={5}
                    required
                    className="field-input resize-none"
                    placeholder="How can I help you?"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  <Send className="h-4 w-4" strokeWidth={1.8} />
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
