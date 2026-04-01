import { HomeSize } from '@/types';
import { HOME_SIZE_LABELS, BASE_PRICES } from '@/data/pricing';

interface Props {
  value: HomeSize | null;
  onChange: (size: HomeSize) => void;
}

const sizes: HomeSize[] = ['studio', '1bed', '2bed', '3bed', '4bed_plus'];

export default function StepHomeSize({ value, onChange }: Props) {
  return (
    <div className="pt-8">
      <h3 className="font-serif text-4xl leading-none text-[var(--color-foreground)]">
        How big is your home?
      </h3>
      <p className="mt-3 text-sm leading-7 text-[#67827b] md:text-base">
        Select the size that best describes your space.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onChange(size)}
            className={`rounded-[1.6rem] border p-5 text-left transition-all duration-300 hover:-translate-y-0.5 ${
              value === size
                ? 'border-[#92c0b1] bg-[#edf5ee] shadow-[0_18px_40px_-26px_rgba(70,121,104,0.35)]'
                : 'border-[rgba(70,121,104,0.12)] bg-white/82 hover:border-[#b7d8cd] hover:bg-white'
            }`}
          >
            <span className="block text-base font-semibold text-[var(--color-foreground)]">
              {HOME_SIZE_LABELS[size]}
            </span>
            <span className="mt-2 block text-sm text-[#67827b]">
              From ${BASE_PRICES[size]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
