'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="py-8 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#dff0ea] text-[#467968]">
          <Check className="h-8 w-8" strokeWidth={2.4} />
        </div>
        <h3 className="mt-6 font-serif text-4xl text-[var(--color-foreground)]">
          Booking Request Received!
        </h3>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#67827b]">
          Thank you! I&apos;ll get back to you within a few hours to confirm your appointment.
        </p>
        <div className="mt-8">
          <Button onClick={() => setSubmitted(false)} variant="outline" size="md">
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="field-label">
            Your Name
          </label>
          <input
            type="text"
            required
            className="field-input"
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label className="field-label">
            Phone Number
          </label>
          <input
            type="tel"
            required
            className="field-input"
            placeholder="(206) 555-1234"
          />
        </div>
      </div>

      <div>
        <label className="field-label">
          Email
        </label>
        <input
          type="email"
          required
          className="field-input"
          placeholder="jane@email.com"
        />
      </div>

      <div>
        <label className="field-label">
          Address
        </label>
        <input
          type="text"
          required
          className="field-input"
          placeholder="123 Main St, Seattle, WA"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="field-label">
            Service Type
          </label>
          <select
            required
            className="field-input"
          >
            <option value="">Select a service</option>
            <option value="standard">Standard Cleaning</option>
            <option value="deep">Deep Cleaning</option>
            <option value="move">Move-In / Move-Out</option>
            <option value="airbnb">Airbnb / Short-Term Rental</option>
          </select>
        </div>
        <div>
          <label className="field-label">
            Preferred Date
          </label>
          <input
            type="date"
            required
            className="field-input"
          />
        </div>
      </div>

      <div>
        <label className="field-label">
          Preferred Time
        </label>
        <select
          required
          className="field-input"
        >
          <option value="">Select a time</option>
          <option value="morning">Morning (8am - 12pm)</option>
          <option value="afternoon">Afternoon (12pm - 4pm)</option>
          <option value="evening">Evening (4pm - 7pm)</option>
        </select>
      </div>

      <div>
        <label className="field-label">
          Special Notes (Optional)
        </label>
        <textarea
          rows={3}
          className="field-input resize-none"
          placeholder="Any special requests or areas to focus on..."
        />
      </div>

      <Button type="submit" size="lg" className="w-full">
        Request Booking
      </Button>
    </form>
  );
}
