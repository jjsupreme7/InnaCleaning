import { PriceBreakdown } from '@/types';
import Button from '@/components/ui/Button';

interface Props {
  breakdown: PriceBreakdown | null;
  showBookButton: boolean;
}

export default function PriceSummary({ breakdown, showBookButton }: Props) {
  if (!breakdown) {
    return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-sm border border-gray-200 p-7 text-center">
        <div className="text-3xl mb-3 opacity-30">💰</div>
        <p className="text-gray-400 text-sm">
          Select your home size to see pricing
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-sm border border-gray-200 p-7 shadow-sm">
      <h4 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-5">
        Your Estimate
      </h4>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Base price</span>
          <span className="font-medium">${breakdown.basePrice}</span>
        </div>
        {breakdown.afterType !== breakdown.basePrice && (
          <div className="flex justify-between text-gray-600">
            <span>Cleaning type</span>
            <span className="font-medium">${breakdown.afterType - breakdown.basePrice > 0 ? '+' : ''}${breakdown.afterType - breakdown.basePrice}</span>
          </div>
        )}
        {breakdown.afterCondition !== breakdown.afterType && (
          <div className="flex justify-between text-gray-600">
            <span>Condition</span>
            <span className="font-medium">+${breakdown.afterCondition - breakdown.afterType}</span>
          </div>
        )}
        {breakdown.addonsTotal > 0 && (
          <div className="flex justify-between text-gray-600">
            <span>Add-ons</span>
            <span className="font-medium">+${breakdown.addonsTotal}</span>
          </div>
        )}
        {breakdown.discount > 0 && (
          <div className="flex justify-between text-green-600 font-medium">
            <span>Discount</span>
            <span>-${breakdown.discount}</span>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 mt-5 pt-5">
        <div className="flex justify-between items-center">
          <span className="text-xs uppercase tracking-widest font-bold text-gray-400">
            Estimated Total
          </span>
          <span className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            ${breakdown.total}
          </span>
        </div>
        <p className="text-[11px] text-gray-400 mt-2">
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
