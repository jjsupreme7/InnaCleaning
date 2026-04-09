'use client';

import { HomeSize } from '@/types';
import { BASE_PRICES } from '@/data/pricing';
import { useLanguage } from '@/contexts/LanguageContext';

interface Props {
  value: HomeSize | null;
  onChange: (size: HomeSize) => void;
}

const sizes: HomeSize[] = ['studio', '1bed', '2bed', '3bed', '4bed_plus'];

export default function StepHomeSize({ value, onChange }: Props) {
  const { t } = useLanguage();
  const q = t.quote;

  return (
    <div>
      <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{q.homeSizeHeading}</h3>
      <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>{q.homeSizeSubheading}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onChange(size)}
            className={`p-4 rounded-lg border-2 text-left transition-all duration-300 hover:-translate-y-0.5 ${
              value === size
                ? 'border-red-500 bg-red-50'
                : ''
            }`}
            style={value !== size ? { borderColor: 'var(--input-border)' } : undefined}
          >
            <span className="block text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
              {q.sizeLabels[size]}
            </span>
            <span className="block text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              {q.from}{BASE_PRICES[size]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
