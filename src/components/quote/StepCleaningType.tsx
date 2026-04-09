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
      <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{q.cleaningTypeHeading}</h3>
      <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>{q.cleaningTypeSubheading}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {typeIds.map((id, i) => (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`p-4 rounded-lg border-2 text-left transition-all duration-300 hover:-translate-y-0.5 ${
              value === id
                ? 'border-red-500 bg-red-50'
                : ''
            }`}
            style={value !== id ? { borderColor: 'var(--input-border)' } : undefined}
          >
            <span className="block text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
              {q.typeLabels[id]}
            </span>
            <span className="block text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              {q.cleaningTypeDescs[i]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
