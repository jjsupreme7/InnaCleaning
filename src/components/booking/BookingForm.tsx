'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          address,
          service_type: serviceType,
          preferred_date: preferredDate,
          preferred_time: preferredTime,
          notes,
        }),
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

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4">&#10003;</div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">
          Booking Request Received!
        </h3>
        <p className="text-gray-500 mb-6">
          Thank you! I&apos;ll get back to you within a few hours to confirm your appointment.
        </p>
        <Button onClick={() => setSubmitted(false)} variant="outline" size="md">
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">
            Your Name
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-2 border-gray-200 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none transition-colors"
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
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border-2 border-gray-200 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none transition-colors"
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border-2 border-gray-200 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none transition-colors"
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
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border-2 border-gray-200 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none transition-colors"
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
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full border-2 border-gray-200 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none transition-colors bg-white"
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
            value={preferredDate}
            onChange={(e) => setPreferredDate(e.target.value)}
            className="w-full border-2 border-gray-200 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">
          Preferred Time
        </label>
        <select
          required
          value={preferredTime}
          onChange={(e) => setPreferredTime(e.target.value)}
          className="w-full border-2 border-gray-200 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none transition-colors bg-white"
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
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border-2 border-gray-200 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none transition-colors resize-none"
          placeholder="Any special requests or areas to focus on..."
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button type="submit" variant="primary" size="lg" className="w-full text-center" disabled={loading}>
        {loading ? 'Submitting…' : 'Request Booking'}
      </Button>
    </form>
  );
}
