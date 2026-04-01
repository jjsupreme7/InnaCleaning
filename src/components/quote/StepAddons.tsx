import { Check } from 'lucide-react';
import { Addons } from '@/types';
import { ADDON_PRICES, ADDON_LABELS } from '@/data/pricing';

interface Props {
  value: Addons;
  onChange: (addons: Addons) => void;
}

const addonKeys = Object.keys(ADDON_PRICES) as (keyof Addons)[];

export default function StepAddons({ value, onChange }: Props) {
  const toggle = (key: keyof Addons) => {
    onChange({ ...value, [key]: !value[key] });
  };

  return (
    <div className="pt-8">
      <h3 className="font-serif text-4xl leading-none text-[var(--color-foreground)]">
        Any add-ons?
      </h3>
      <p className="mt-3 text-sm leading-7 text-[#67827b] md:text-base">
        Optional extras to customize your cleaning.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4">
        {addonKeys.map((key) => (
          <button
            key={key}
            onClick={() => toggle(key)}
            className={`flex items-center justify-between rounded-[1.6rem] border p-5 text-left transition-all duration-300 ${
              value[key]
                ? 'border-[#92c0b1] bg-[#edf5ee] shadow-[0_18px_40px_-26px_rgba(70,121,104,0.35)]'
                : 'border-[rgba(70,121,104,0.12)] bg-white/82 hover:border-[#b7d8cd] hover:bg-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full border transition-all ${
                  value[key] ? 'border-[#467968] bg-[#467968]' : 'border-[#c9d7d2]'
                }`}
              >
                {value[key] && (
                  <Check className="h-3.5 w-3.5 text-white" strokeWidth={2.8} />
                )}
              </div>
              <span className="text-base font-semibold text-[var(--color-foreground)]">
                {ADDON_LABELS[key]}
              </span>
            </div>
            <span className="text-sm font-semibold uppercase tracking-[0.12em] text-[#467968]">
              +${ADDON_PRICES[key]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
