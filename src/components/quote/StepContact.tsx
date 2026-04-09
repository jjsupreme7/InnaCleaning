'use client';

import { useLanguage } from '@/contexts/LanguageContext';

interface Props {
  name: string;
  email: string;
  onChangeName: (v: string) => void;
  onChangeEmail: (v: string) => void;
}

export default function StepContact({ name, email, onChangeName, onChangeEmail }: Props) {
  const { t } = useLanguage();
  const q = t.quote;

  return (
    <div>
      <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{q.contactHeading}</h3>
      <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>{q.contactSubheading}</p>

      <div className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold mb-2" style={{ color: 'var(--text-muted)' }}>{q.contactNameLabel}</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => onChangeName(e.target.value)}
            className="w-full rounded-lg border-2 px-4 py-3 text-sm focus:border-red-500 focus:outline-none transition-colors"
            style={{ background: 'var(--input-bg)', borderColor: 'var(--input-border)', color: 'var(--text-primary)' }}
            placeholder={q.contactNamePlaceholder}
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold mb-2" style={{ color: 'var(--text-muted)' }}>{q.contactEmailLabel}</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => onChangeEmail(e.target.value)}
            className="w-full rounded-lg border-2 px-4 py-3 text-sm focus:border-red-500 focus:outline-none transition-colors"
            style={{ background: 'var(--input-bg)', borderColor: 'var(--input-border)', color: 'var(--text-primary)' }}
            placeholder={q.contactEmailPlaceholder}
          />
        </div>
      </div>
    </div>
  );
}
