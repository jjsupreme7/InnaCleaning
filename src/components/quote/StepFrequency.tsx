'use client';

import { Frequency } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface Props {
  value: Frequency | null;
  onChange: (frequency: Frequency) => void;
}

const frequencyIds: Frequency[] = ['one_time', 'weekly', 'biweekly', 'monthly'];

export default function StepFrequency({ value, onChange }: Props) {
  const { t } = useLanguage();
  const q = t.quote;

  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-2">{q.frequencyHeading}</h3>
      <p className="text-zinc-500 text-sm mb-6">{q.frequencySubheading}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {frequencyIds.map((id, i) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`p-4 border-2 text-left transition-all duration-300 hover:-translate-y-0.5 relative ${
              value === id
                ? 'border-red-600 bg-red-950'
                : 'border-zinc-700 hover:border-zinc-600'
            }`}
          >
            {id === 'weekly' && (
              <span className="absolute -top-2 right-3 bg-green-600 text-white text-[10px] uppercase tracking-widest font-bold px-2 py-0.5">
                {q.bestValue}
              </span>
            )}
            <span className="block text-sm font-bold text-white">
              {q.frequencyLabels[id]}
            </span>
            <span className="block text-xs text-zinc-500 mt-1">
              {q.frequencyDescs[i]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
