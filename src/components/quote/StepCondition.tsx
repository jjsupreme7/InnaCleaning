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
    <div>
      <h3 className="text-lg font-bold text-slate-800 mb-2">Current condition of your home?</h3>
      <p className="text-gray-500 text-sm mb-6">This helps us give you a more accurate estimate.</p>

      <div className="grid grid-cols-1 gap-3">
        {conditions.map((cond) => (
          <button
            key={cond.id}
            onClick={() => onChange(cond.id)}
            className={`p-4 border-2 text-left transition-all duration-300 hover:-translate-y-0.5 ${
              value === cond.id
                ? 'border-sky-600 bg-sky-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <span className="block text-sm font-bold text-slate-800">
              {CONDITION_LABELS[cond.id]}
            </span>
            <span className="block text-xs text-gray-400 mt-1">
              {cond.desc}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
