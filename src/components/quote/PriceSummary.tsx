import { PriceBreakdown } from '@/types';
import Button from '@/components/ui/Button';
import { CalendarDays, Sparkles } from 'lucide-react';

interface Props {
  breakdown: PriceBreakdown | null;
  showBookButton: boolean;
}

export default function PriceSummary({ breakdown, showBookButton }: Props) {
  if (!breakdown) {
    return (
      <div className="panel-card p-6 text-center">
        <p className="text-sm leading-7 text-[#7b938d]">
          Select your home size to see pricing
        </p>
      </div>
    );
  }

  return (
    <div className="panel-card p-6 md:p-7">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#dff0ea] text-[#467968]">
          <Sparkles className="h-5 w-5" strokeWidth={1.8} />
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.22em] text-[#748f88]">
        Your Estimate
          </h4>
          <p className="mt-1 text-sm text-[#617d76]">Live pricing breakdown</p>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between rounded-2xl bg-white/78 px-4 py-3 text-[#5d7871]">
          <span>Base price</span>
          <span>${breakdown.basePrice}</span>
        </div>
        {breakdown.afterType !== breakdown.basePrice && (
          <div className="flex justify-between rounded-2xl bg-white/78 px-4 py-3 text-[#5d7871]">
            <span>Cleaning type</span>
            <span>${breakdown.afterType - breakdown.basePrice > 0 ? '+' : ''}${breakdown.afterType - breakdown.basePrice}</span>
          </div>
        )}
        {breakdown.afterCondition !== breakdown.afterType && (
          <div className="flex justify-between rounded-2xl bg-white/78 px-4 py-3 text-[#5d7871]">
            <span>Condition</span>
            <span>+${breakdown.afterCondition - breakdown.afterType}</span>
          </div>
        )}
        {breakdown.addonsTotal > 0 && (
          <div className="flex justify-between rounded-2xl bg-white/78 px-4 py-3 text-[#5d7871]">
            <span>Add-ons</span>
            <span>+${breakdown.addonsTotal}</span>
          </div>
        )}
        {breakdown.discount > 0 && (
          <div className="flex justify-between rounded-2xl bg-[#edf5ee] px-4 py-3 text-[#467968]">
            <span>Discount</span>
            <span>-${breakdown.discount}</span>
          </div>
        )}
      </div>

      <div className="mt-6 border-t border-[rgba(70,121,104,0.12)] pt-5">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#748f88]">
            Estimated Total
          </span>
          <span className="font-serif text-4xl text-[var(--color-foreground)]">
            ${breakdown.total}
          </span>
        </div>
        <p className="mt-2 text-[11px] text-[#879d97]">
          Final price may vary after inspection. No obligation.
        </p>
      </div>

      {showBookButton && (
        <div className="mt-6">
          <Button href="/booking" size="lg" className="w-full">
            <CalendarDays className="h-4 w-4" strokeWidth={1.8} />
            Book This Cleaning
          </Button>
        </div>
      )}
    </div>
  );
}
