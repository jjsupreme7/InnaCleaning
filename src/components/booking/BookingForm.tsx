'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';

export default function BookingForm() {
  const { t } = useLanguage();
  const b = t.booking;

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
          name, phone, email, address,
          service_type: serviceType,
          preferred_date: preferredDate,
          preferred_time: preferredTime,
          notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || b.errorDefault);
      } else {
        setSubmitted(true);
      }
    } catch {
      setError(b.errorNetwork);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-4 text-red-500">&#10003;</div>
        <h3 className="text-xl font-bold text-zinc-900 mb-2">{b.received}</h3>
        <p className="text-zinc-600 mb-6">{b.receivedMsg}</p>
        <Button onClick={() => { setSubmitted(false); setName(''); setPhone(''); setEmail(''); setAddress(''); setServiceType(''); setPreferredDate(''); setPreferredTime(''); setNotes(''); }} variant="outline" size="md">
          {b.submitAnother}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-zinc-500 mb-2">{b.name}</label>
          <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border-2 border-zinc-300 bg-white text-zinc-900 px-4 py-3 text-sm focus:border-red-500 focus:outline-none transition-colors"
            placeholder={b.namePlaceholder} />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-zinc-500 mb-2">{b.phone}</label>
          <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border-2 border-zinc-300 bg-white text-zinc-900 px-4 py-3 text-sm focus:border-red-500 focus:outline-none transition-colors"
            placeholder={b.phonePlaceholder} />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest font-bold text-zinc-500 mb-2">{b.email}</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border-2 border-zinc-300 bg-white text-zinc-900 px-4 py-3 text-sm focus:border-red-500 focus:outline-none transition-colors"
          placeholder={b.emailPlaceholder} />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest font-bold text-zinc-500 mb-2">{b.address}</label>
        <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)}
          className="w-full rounded-lg border-2 border-zinc-300 bg-white text-zinc-900 px-4 py-3 text-sm focus:border-red-500 focus:outline-none transition-colors"
          placeholder={b.addressPlaceholder} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-zinc-500 mb-2">{b.serviceType}</label>
          <select required value={serviceType} onChange={(e) => setServiceType(e.target.value)}
            className="w-full rounded-lg border-2 border-zinc-300 bg-white text-zinc-900 px-4 py-3 text-sm focus:border-red-500 focus:outline-none transition-colors">
            <option value="">{b.selectService}</option>
            <option value="standard">{b.standard}</option>
            <option value="deep">{b.deep}</option>
            <option value="move">{b.moveInOut}</option>
            <option value="airbnb">{b.airbnb}</option>
          </select>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-zinc-500 mb-2">{b.preferredDate}</label>
          <input type="date" required value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)}
            className="w-full rounded-lg border-2 border-zinc-300 bg-white text-zinc-900 px-4 py-3 text-sm focus:border-red-500 focus:outline-none transition-colors" />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest font-bold text-zinc-500 mb-2">{b.preferredTime}</label>
        <select required value={preferredTime} onChange={(e) => setPreferredTime(e.target.value)}
          className="w-full rounded-lg border-2 border-zinc-300 bg-white text-zinc-900 px-4 py-3 text-sm focus:border-red-500 focus:outline-none transition-colors">
          <option value="">{b.selectTime}</option>
          <option value="morning">{b.morning}</option>
          <option value="afternoon">{b.afternoon}</option>
          <option value="evening">{b.evening}</option>
        </select>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest font-bold text-zinc-500 mb-2">{b.notes}</label>
        <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)}
          className="w-full rounded-lg border-2 border-zinc-300 bg-white text-zinc-900 px-4 py-3 text-sm focus:border-red-500 focus:outline-none transition-colors resize-none"
          placeholder={b.notesPlaceholder} />
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}
      <Button type="submit" variant="primary" size="lg" className="w-full text-center" disabled={loading}>
        {loading ? b.submitting : b.submit}
      </Button>
    </form>
  );
}
