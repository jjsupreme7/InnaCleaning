import ServiceIcon from '@/components/ui/ServiceIcon';
import { CleaningType } from '@/types';
import { CLEANING_TYPE_LABELS } from '@/data/pricing';

interface Props {
  value: CleaningType | null;
  onChange: (type: CleaningType) => void;
}

const types: {
  id: CleaningType;
  desc: string;
  icon: 'sparkles' | 'spray' | 'package' | 'home';
}[] = [
  { id: 'standard', desc: 'Regular upkeep cleaning', icon: 'sparkles' },
  { id: 'deep', desc: 'Intensive top-to-bottom cleaning', icon: 'spray' },
  { id: 'move_in_out', desc: 'Complete cleaning for moving', icon: 'package' },
  { id: 'airbnb', desc: 'Quick turnaround for rentals', icon: 'home' },
];

export default function StepCleaningType({ value, onChange }: Props) {
  return (
    <div className="pt-8">
      <h3 className="font-serif text-4xl leading-none text-[var(--color-foreground)]">
        What type of cleaning?
      </h3>
      <p className="mt-3 text-sm leading-7 text-[#67827b] md:text-base">
        Choose the service that fits your needs.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {types.map((type) => (
          <button
            key={type.id}
            onClick={() => onChange(type.id)}
            className={`rounded-[1.6rem] border p-5 text-left transition-all duration-300 hover:-translate-y-0.5 ${
              value === type.id
                ? 'border-[#92c0b1] bg-[#edf5ee] shadow-[0_18px_40px_-26px_rgba(70,121,104,0.35)]'
                : 'border-[rgba(70,121,104,0.12)] bg-white/82 hover:border-[#b7d8cd] hover:bg-white'
            }`}
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef5f2] text-[#467968]">
              <ServiceIcon icon={type.icon} className="h-5 w-5" />
            </div>
            <span className="mt-4 block text-base font-semibold text-[var(--color-foreground)]">
              {CLEANING_TYPE_LABELS[type.id]}
            </span>
            <span className="mt-2 block text-sm leading-7 text-[#67827b]">
              {type.desc}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
