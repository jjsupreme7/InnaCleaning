'use client';

import { CleaningType } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface Props {
  value: CleaningType | null;
  onChange: (type: CleaningType) => void;
}

const typeIds: CleaningType[] = ['standard', 'deep', 'move_in_out', 'airbnb'];

export default function StepCleaningType({ value, onChange }: Props) {
  const { t } = useLanguage();
  const q = t.quote;

  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-2">{q.cleaningTypeHeading}</h3>
      <p className="text-zinc-500 text-sm mb-6">{q.cleaningTypeSubheading}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {typeIds.map((id, i) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`p-4 border-2 text-left transition-all duration-300 hover:-translate-y-0.5 ${
              value === id
                ? 'border-red-600 bg-red-950'
                : 'border-zinc-700 hover:border-zinc-600'
            }`}
          >
            <span className="block text-sm font-bold text-white">
              {q.typeLabels[id]}
            </span>
            <span className="block text-xs text-zinc-500 mt-1">
              {q.cleaningTypeDescs[i]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
