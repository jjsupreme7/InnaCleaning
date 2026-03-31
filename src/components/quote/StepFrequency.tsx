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
      <h3 className="text-lg font-bold text-white mb-2">How often?</h3>
      <p className="text-zinc-500 text-sm mb-6">Recurring cleanings come with a discount.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {frequencies.map((freq) => (
          <button
            key={freq.id}
            onClick={() => onChange(freq.id)}
            className={`p-4 border-2 text-left transition-all duration-300 hover:-translate-y-0.5 relative ${
              value === freq.id
                ? 'border-red-600 bg-red-950'
                : 'border-zinc-700 hover:border-zinc-600'
            }`}
          >
            {freq.id === 'weekly' && (
              <span className="absolute -top-2 right-3 bg-green-600 text-white text-[10px] uppercase tracking-widest font-bold px-2 py-0.5">
                Best Value
              </span>
            )}
            <span className="block text-sm font-bold text-white">
              {FREQUENCY_LABELS[freq.id]}
            </span>
            <span className="block text-xs text-zinc-500 mt-1">
              {freq.desc}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
