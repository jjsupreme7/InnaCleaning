'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="text-center py-16 bg-gradient-to-br from-sky-50 to-white rounded-sm border border-sky-100">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">
          Booking Request Received!
        </h3>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          Thank you! I&apos;ll get back to you within a few hours to confirm your appointment.
        </p>
        <Button onClick={() => setSubmitted(false)} variant="outline" size="md">
          Submit Another Request
        </Button>
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
          <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">
            Your Name
          </label>
          <input
            type="text"
            required
            className="w-full border-2 border-gray-200 rounded-sm px-4 py-3 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all bg-white"
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            required
            className="w-full border-2 border-gray-200 rounded-sm px-4 py-3 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all bg-white"
            placeholder="(206) 555-1234"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">
          Email
        </label>
        <input
          type="email"
          required
          className="w-full border-2 border-gray-200 rounded-sm px-4 py-3 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all bg-white"
          placeholder="jane@email.com"
        />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">
          Address
        </label>
        <input
          type="text"
          required
          className="w-full border-2 border-gray-200 rounded-sm px-4 py-3 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all bg-white"
          placeholder="123 Main St, Seattle, WA"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">
            Service Type
          </label>
          <select
            required
            className="w-full border-2 border-gray-200 rounded-sm px-4 py-3 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all bg-white"
          >
            <option value="">Select a service</option>
            <option value="standard">Standard Cleaning</option>
            <option value="deep">Deep Cleaning</option>
            <option value="move">Move-In / Move-Out</option>
            <option value="airbnb">Airbnb / Short-Term Rental</option>
          </select>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">
            Preferred Date
          </label>
          <input
            type="date"
            required
            className="w-full border-2 border-gray-200 rounded-sm px-4 py-3 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all bg-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">
          Preferred Time
        </label>
        <select
          required
          className="w-full border-2 border-gray-200 rounded-sm px-4 py-3 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all bg-white"
        >
          <option value="">Select a time</option>
          <option value="morning">Morning (8am - 12pm)</option>
          <option value="afternoon">Afternoon (12pm - 4pm)</option>
          <option value="evening">Evening (4pm - 7pm)</option>
        </select>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">
          Special Notes (Optional)
        </label>
        <textarea
          rows={3}
          className="w-full border-2 border-gray-200 rounded-sm px-4 py-3 text-sm focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/10 transition-all resize-none bg-white"
          placeholder="Any special requests or areas to focus on..."
        />
      </div>

      <Button type="submit" variant="primary" size="lg" className="w-full text-center">
        Request Booking
      </Button>
    </form>
  );
}
