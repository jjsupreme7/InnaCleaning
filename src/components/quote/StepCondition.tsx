'use client';

import { Condition } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface Props {
  value: Condition | null;
  onChange: (condition: Condition) => void;
}

const conditionIds: Condition[] = ['light', 'medium', 'heavy'];

export default function StepCondition({ value, onChange }: Props) {
  const { t } = useLanguage();
  const q = t.quote;

  return (
    <div>
      <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{q.conditionHeading}</h3>
      <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>{q.conditionSubheading}</p>

      <div className="grid grid-cols-1 gap-3">
        {conditionIds.map((id, i) => (
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
              {q.conditionLabels[id]}
            </span>
            <span className="block text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              {q.conditionDescs[i]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
