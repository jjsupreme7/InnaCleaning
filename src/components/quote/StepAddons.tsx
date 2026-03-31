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
    <div>
      <h3 className="text-lg font-bold text-white mb-2">Any add-ons?</h3>
      <p className="text-zinc-500 text-sm mb-6">Optional extras to customize your cleaning.</p>

      <div className="grid grid-cols-1 gap-3">
        {addonKeys.map((key) => (
          <button
            key={key}
            onClick={() => toggle(key)}
            className={`p-4 border-2 text-left transition-all duration-300 flex items-center justify-between ${
              value[key]
                ? 'border-red-600 bg-red-950'
                : 'border-zinc-700 hover:border-zinc-600'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 border-2 flex items-center justify-center transition-all ${
                  value[key] ? 'bg-red-600 border-red-600' : 'border-zinc-600'
                }`}
              >
                {value[key] && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-sm font-bold text-white">
                {ADDON_LABELS[key]}
              </span>
            </div>
            <span className="text-sm text-red-500 font-bold">
              +${ADDON_PRICES[key]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
