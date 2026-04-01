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
      <h3 className="text-lg font-bold text-white mb-2">{q.homeSizeHeading}</h3>
      <p className="text-zinc-500 text-sm mb-6">{q.homeSizeSubheading}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onChange(size)}
            className={`p-4 border-2 text-left transition-all duration-300 hover:-translate-y-0.5 ${
              value === size
                ? 'border-red-600 bg-red-950'
                : 'border-zinc-700 hover:border-zinc-600'
            }`}
          >
            <span className="block text-sm font-bold text-white">
              {q.sizeLabels[size]}
            </span>
            <span className="block text-xs text-zinc-500 mt-1">
              {q.from}{BASE_PRICES[size]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
