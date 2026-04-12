'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';

export default function BookingForm({ onSubmitChange }: { onSubmitChange?: (submitted: boolean) => void }) {
  const { t } = useLanguage();
  const b = t.booking;
  const searchParams = useSearchParams();

  const [submitted, setSubmittedState] = useState(false);
  const setSubmitted = (val: boolean) => {
    setSubmittedState(val);
    onSubmitChange?.(val);
  };
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
  const [referralCode, setReferralCode] = useState('');

  // Prefill referral code from ?ref= query param
  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) setReferralCode(ref.toUpperCase());
  }, [searchParams]);

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
          referral_code: referralCode.trim() || undefined,
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
        <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{b.received}</h3>
        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>{b.receivedMsg}</p>
        <Button onClick={() => { setSubmitted(false); setName(''); setPhone(''); setEmail(''); setAddress(''); setServiceType(''); setPreferredDate(''); setPreferredTime(''); setNotes(''); setReferralCode(''); }} variant="outline" size="md">
          {b.submitAnother}
        </Button>
      </div>
    );
  }

  const inputStyle = { background: 'var(--input-bg)', borderColor: 'var(--input-border)', color: 'var(--text-primary)' };
  const labelStyle = { color: 'var(--text-muted)' };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold mb-2" style={labelStyle}>{b.name}</label>
          <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border-2 px-4 py-3 text-sm focus:border-red-500 focus:outline-none transition-colors"
            style={inputStyle}
            placeholder={b.namePlaceholder} />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold mb-2" style={labelStyle}>{b.phone}</label>
          <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border-2 px-4 py-3 text-sm focus:border-red-500 focus:outline-none transition-colors"
            style={inputStyle}
            placeholder={b.phonePlaceholder} />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest font-bold mb-2" style={labelStyle}>{b.email}</label>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border-2 px-4 py-3 text-sm focus:border-red-500 focus:outline-none transition-colors"
          style={inputStyle}
          placeholder={b.emailPlaceholder} />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest font-bold mb-2" style={labelStyle}>{b.address}</label>
        <input type="text" required value={address} onChange={(e) => setAddress(e.target.value)}
          className="w-full rounded-lg border-2 px-4 py-3 text-sm focus:border-red-500 focus:outline-none transition-colors"
          style={inputStyle}
          placeholder={b.addressPlaceholder} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold mb-2" style={labelStyle}>{b.serviceType}</label>
          <select required value={serviceType} onChange={(e) => setServiceType(e.target.value)}
            className="w-full rounded-lg border-2 px-4 py-3 text-sm focus:border-red-500 focus:outline-none transition-colors"
            style={inputStyle}>
            <option value="">{b.selectService}</option>
            <option value="standard">{b.standard}</option>
            <option value="deep">{b.deep}</option>
            <option value="move">{b.moveInOut}</option>
            <option value="airbnb">{b.airbnb}</option>
          </select>
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold mb-2" style={labelStyle}>{b.preferredDate}</label>
          <input type="date" required value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)}
            className="w-full rounded-lg border-2 px-4 py-3 text-sm focus:border-red-500 focus:outline-none transition-colors"
            style={inputStyle} />
        </div>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest font-bold mb-2" style={labelStyle}>{b.preferredTime}</label>
        <select required value={preferredTime} onChange={(e) => setPreferredTime(e.target.value)}
          className="w-full rounded-lg border-2 px-4 py-3 text-sm focus:border-red-500 focus:outline-none transition-colors"
          style={inputStyle}>
          <option value="">{b.selectTime}</option>
          <option value="morning">{b.morning}</option>
          <option value="afternoon">{b.afternoon}</option>
          <option value="evening">{b.evening}</option>
        </select>
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest font-bold mb-2" style={labelStyle}>{b.notes}</label>
        <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)}
          className="w-full rounded-lg border-2 px-4 py-3 text-sm focus:border-red-500 focus:outline-none transition-colors resize-none"
          style={inputStyle}
          placeholder={b.notesPlaceholder} />
      </div>

      <div>
        <label className="block text-xs uppercase tracking-widest font-bold mb-2" style={labelStyle}>Referral Code (optional)</label>
        <input type="text" value={referralCode} onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
          className="w-full rounded-lg border-2 px-4 py-3 text-sm focus:border-red-500 focus:outline-none transition-colors font-mono tracking-wider"
          style={inputStyle}
          placeholder="e.g. SARAH4271" />
        <p className="text-xs mt-1.5" style={{ color: 'var(--text-faint)' }}>Have a code from a friend? Enter it for 12% off.</p>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}
      <Button type="submit" variant="primary" size="lg" className="w-full text-center" disabled={loading}>
        {loading ? b.submitting : b.submit}
      </Button>
    </form>
  );
}
