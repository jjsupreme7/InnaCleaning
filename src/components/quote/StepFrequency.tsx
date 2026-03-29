import { Frequency } from '@/types';
import { FREQUENCY_LABELS } from '@/data/pricing';

interface Props {
  value: Frequency | null;
  onChange: (frequency: Frequency) => void;
}

const frequencies: { id: Frequency; desc: string }[] = [
  { id: 'one_time', desc: 'Single cleaning session' },
  { id: 'weekly', desc: 'Save 10% with weekly cleanings' },
  { id: 'biweekly', desc: 'Save 5% with bi-weekly cleanings' },
  { id: 'monthly', desc: 'Once a month cleaning' },
];

export default function StepFrequency({ value, onChange }: Props) {
  return (
    <div>
      <h3 className="text-lg font-bold text-slate-800 mb-2">How often?</h3>
      <p className="text-gray-500 text-sm mb-6">Recurring cleanings come with a discount.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {frequencies.map((freq) => (
          <button
            key={freq.id}
            onClick={() => onChange(freq.id)}
            className={`p-4 border-2 text-left transition-all duration-300 hover:-translate-y-0.5 relative ${
              value === freq.id
                ? 'border-sky-600 bg-sky-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            {freq.id === 'weekly' && (
              <span className="absolute -top-2 right-3 bg-green-500 text-white text-[10px] uppercase tracking-widest font-bold px-2 py-0.5">
                Best Value
              </span>
            )}
            <span className="block text-sm font-bold text-slate-800">
              {FREQUENCY_LABELS[freq.id]}
            </span>
            <span className="block text-xs text-gray-400 mt-1">
              {freq.desc}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
