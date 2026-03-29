import { HomeSize } from '@/types';
import { HOME_SIZE_LABELS, BASE_PRICES } from '@/data/pricing';

interface Props {
  value: HomeSize | null;
  onChange: (size: HomeSize) => void;
}

const sizes: HomeSize[] = ['studio', '1bed', '2bed', '3bed', '4bed_plus'];

export default function StepHomeSize({ value, onChange }: Props) {
  return (
    <div>
      <h3 className="text-lg font-bold text-slate-800 mb-2">How big is your home?</h3>
      <p className="text-gray-500 text-sm mb-6">Select the size that best describes your space.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onChange(size)}
            className={`p-4 border-2 text-left transition-all duration-300 hover:-translate-y-0.5 ${
              value === size
                ? 'border-sky-600 bg-sky-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <span className="block text-sm font-bold text-slate-800">
              {HOME_SIZE_LABELS[size]}
            </span>
            <span className="block text-xs text-gray-400 mt-1">
              From ${BASE_PRICES[size]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
