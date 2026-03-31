import { PriceBreakdown } from '@/types';
import Button from '@/components/ui/Button';

interface Props {
  breakdown: PriceBreakdown | null;
  showBookButton: boolean;
}

export default function PriceSummary({ breakdown, showBookButton }: Props) {
  if (!breakdown) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 p-6 text-center">
        <p className="text-zinc-500 text-sm">
          Select your home size to see pricing
        </p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6">
      <h4 className="text-xs uppercase tracking-widest font-bold text-zinc-500 mb-4">
        Your Estimate
      </h4>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-zinc-400">
          <span>Base price</span>
          <span>${breakdown.basePrice}</span>
        </div>
        {breakdown.afterType !== breakdown.basePrice && (
          <div className="flex justify-between text-zinc-400">
            <span>Cleaning type</span>
            <span>${breakdown.afterType - breakdown.basePrice > 0 ? '+' : ''}${breakdown.afterType - breakdown.basePrice}</span>
          </div>
        )}
        {breakdown.afterCondition !== breakdown.afterType && (
          <div className="flex justify-between text-zinc-400">
            <span>Condition</span>
            <span>+${breakdown.afterCondition - breakdown.afterType}</span>
          </div>
        )}
        {breakdown.addonsTotal > 0 && (
          <div className="flex justify-between text-zinc-400">
            <span>Add-ons</span>
            <span>+${breakdown.addonsTotal}</span>
          </div>
        )}
        {breakdown.discount > 0 && (
          <div className="flex justify-between text-green-400">
            <span>Discount</span>
            <span>-${breakdown.discount}</span>
          </div>
        )}
      </div>

      <div className="border-t border-zinc-800 mt-4 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-xs uppercase tracking-widest font-bold text-zinc-500">
            Estimated Total
          </span>
          <span className="text-3xl font-bold text-white">
            ${breakdown.total}
          </span>
        </div>
        <p className="text-[11px] text-zinc-500 mt-2">
          Final price may vary after inspection. No obligation.
        </p>
      </div>

      {showBookButton && (
        <div className="mt-6">
          <Button href="/booking" variant="primary" size="lg" className="w-full text-center">
            Book This Cleaning
          </Button>
        </div>
      )}
    </div>
  );
}
