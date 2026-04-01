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
    <div className="pt-8">
      <h3 className="font-serif text-4xl leading-none text-[var(--color-foreground)]">
        How often?
      </h3>
      <p className="mt-3 text-sm leading-7 text-[#67827b] md:text-base">
        Recurring cleanings come with a discount.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {frequencies.map((freq) => (
          <button
            key={freq.id}
            onClick={() => onChange(freq.id)}
            className={`relative rounded-[1.6rem] border p-5 text-left transition-all duration-300 hover:-translate-y-0.5 ${
              value === freq.id
                ? 'border-[#92c0b1] bg-[#edf5ee] shadow-[0_18px_40px_-26px_rgba(70,121,104,0.35)]'
                : 'border-[rgba(70,121,104,0.12)] bg-white/82 hover:border-[#b7d8cd] hover:bg-white'
            }`}
          >
            {freq.id === 'weekly' && (
              <span className="absolute right-4 top-4 rounded-full bg-[#467968] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                Best Value
              </span>
            )}
            <span className="block text-base font-semibold text-[var(--color-foreground)]">
              {FREQUENCY_LABELS[freq.id]}
            </span>
            <span className="mt-2 block text-sm leading-7 text-[#67827b]">
              {freq.desc}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
