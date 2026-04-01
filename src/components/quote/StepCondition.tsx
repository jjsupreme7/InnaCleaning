import { Condition } from '@/types';
import { CONDITION_LABELS } from '@/data/pricing';

interface Props {
  value: Condition | null;
  onChange: (condition: Condition) => void;
}

const conditions: { id: Condition; desc: string }[] = [
  { id: 'light', desc: 'Home is regularly maintained' },
  { id: 'medium', desc: 'Some areas need extra attention' },
  { id: 'heavy', desc: 'Hasn\'t been cleaned in a while' },
];

export default function StepCondition({ value, onChange }: Props) {
  return (
    <div className="pt-8">
      <h3 className="font-serif text-4xl leading-none text-[var(--color-foreground)]">
        Current condition of your home?
      </h3>
      <p className="mt-3 text-sm leading-7 text-[#67827b] md:text-base">
        This helps us give you a more accurate estimate.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4">
        {conditions.map((cond) => (
          <button
            key={cond.id}
            onClick={() => onChange(cond.id)}
            className={`rounded-[1.6rem] border p-5 text-left transition-all duration-300 hover:-translate-y-0.5 ${
              value === cond.id
                ? 'border-[#92c0b1] bg-[#edf5ee] shadow-[0_18px_40px_-26px_rgba(70,121,104,0.35)]'
                : 'border-[rgba(70,121,104,0.12)] bg-white/82 hover:border-[#b7d8cd] hover:bg-white'
            }`}
          >
            <span className="block text-base font-semibold text-[var(--color-foreground)]">
              {CONDITION_LABELS[cond.id]}
            </span>
            <span className="mt-2 block text-sm leading-7 text-[#67827b]">
              {cond.desc}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
