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
      <h3 className="text-lg font-bold text-white mb-2">{q.contactHeading}</h3>
      <p className="text-zinc-500 text-sm mb-6">{q.contactSubheading}</p>

      <div className="space-y-4">
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-zinc-500 mb-2">{q.contactNameLabel}</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => onChangeName(e.target.value)}
            className="w-full border-2 border-zinc-700 bg-zinc-900 text-white px-4 py-3 text-sm focus:border-red-600 focus:outline-none transition-colors"
            placeholder={q.contactNamePlaceholder}
          />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-zinc-500 mb-2">{q.contactEmailLabel}</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => onChangeEmail(e.target.value)}
            className="w-full border-2 border-zinc-700 bg-zinc-900 text-white px-4 py-3 text-sm focus:border-red-600 focus:outline-none transition-colors"
            placeholder={q.contactEmailPlaceholder}
          />
        </div>
      </div>
    </div>
  );
}
