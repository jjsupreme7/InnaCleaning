import { CleaningType } from '@/types';
import { CLEANING_TYPE_LABELS } from '@/data/pricing';

interface Props {
  value: CleaningType | null;
  onChange: (type: CleaningType) => void;
}

const types: { id: CleaningType; desc: string; icon: string }[] = [
  { id: 'standard', desc: 'Regular upkeep cleaning', icon: '✨' },
  { id: 'deep', desc: 'Intensive top-to-bottom cleaning', icon: '🧹' },
  { id: 'move_in_out', desc: 'Complete cleaning for moving', icon: '📦' },
  { id: 'airbnb', desc: 'Quick turnaround for rentals', icon: '🏠' },
];

export default function StepCleaningType({ value, onChange }: Props) {
  return (
    <div>
      <h3 className="text-lg font-bold text-slate-800 mb-2">What type of cleaning?</h3>
      <p className="text-gray-500 text-sm mb-6">Choose the service that fits your needs.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {types.map((type) => (
          <button
            key={type.id}
            onClick={() => onChange(type.id)}
            className={`p-5 border-2 text-left transition-all duration-300 rounded-sm hover:-translate-y-0.5 ${
              value === type.id
                ? 'border-sky-600 bg-sky-50 shadow-md shadow-sky-100'
                : 'border-gray-200 hover:border-sky-300 hover:bg-sky-50/50'
            }`}
          >
            <span className="text-xl mb-2 block">{type.icon}</span>
            <span className="block text-sm font-bold text-slate-800">
              {CLEANING_TYPE_LABELS[type.id]}
            </span>
            <span className="block text-xs text-gray-400 mt-1">
              {type.desc}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
