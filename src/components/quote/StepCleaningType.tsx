import { CleaningType } from '@/types';
import { CLEANING_TYPE_LABELS } from '@/data/pricing';

interface Props {
  value: CleaningType | null;
  onChange: (type: CleaningType) => void;
}

const types: { id: CleaningType; desc: string }[] = [
  { id: 'standard', desc: 'Regular upkeep cleaning' },
  { id: 'deep', desc: 'Intensive top-to-bottom cleaning' },
  { id: 'move_in_out', desc: 'Complete cleaning for moving' },
  { id: 'airbnb', desc: 'Quick turnaround for rentals' },
];

export default function StepCleaningType({ value, onChange }: Props) {
  return (
    <div>
      <h3 className="text-lg font-bold text-white mb-2">What type of cleaning?</h3>
      <p className="text-zinc-500 text-sm mb-6">Choose the service that fits your needs.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {types.map((type) => (
          <button
            key={type.id}
            onClick={() => onChange(type.id)}
            className={`p-4 border-2 text-left transition-all duration-300 hover:-translate-y-0.5 ${
              value === type.id
                ? 'border-red-600 bg-red-950'
                : 'border-zinc-700 hover:border-zinc-600'
            }`}
          >
            <span className="block text-sm font-bold text-white">
              {CLEANING_TYPE_LABELS[type.id]}
            </span>
            <span className="block text-xs text-zinc-500 mt-1">
              {type.desc}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
