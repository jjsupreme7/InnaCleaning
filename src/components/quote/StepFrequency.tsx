import { Frequency } from '@/types';
import { FREQUENCY_LABELS } from '@/data/pricing';

interface Props {
  value: Frequency | null;
  onChange: (frequency: Frequency) => void;
}

const frequencies: { id: Frequency; desc: string; icon: string }[] = [
  { id: 'one_time', desc: 'Single cleaning session', icon: '1️⃣' },
  { id: 'weekly', desc: 'Save 10% with weekly cleanings', icon: '📅' },
  { id: 'biweekly', desc: 'Save 5% with bi-weekly cleanings', icon: '🗓️' },
  { id: 'monthly', desc: 'Once a month cleaning', icon: '📆' },
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
            className={`p-5 border-2 text-left transition-all duration-300 rounded-sm hover:-translate-y-0.5 relative ${
              value === freq.id
                ? 'border-sky-600 bg-sky-50 shadow-md shadow-sky-100'
                : 'border-gray-200 hover:border-sky-300 hover:bg-sky-50/50'
            }`}
          >
            {freq.id === 'weekly' && (
              <span className="absolute -top-2.5 right-3 bg-green-500 text-white text-[10px] uppercase tracking-widest font-bold px-2.5 py-0.5 rounded-sm shadow-sm">
                Best Value
              </span>
            )}
            <span className="text-xl mb-2 block">{freq.icon}</span>
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
