'use client';

import { PriceBreakdown } from '@/types';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';

interface Props {
  breakdown: PriceBreakdown | null;
  showBookButton: boolean;
}

export default function PriceSummary({ breakdown, showBookButton }: Props) {
  const { t } = useLanguage();
  const q = t.quote;

  if (!breakdown) {
    return (
      <div className="bg-white border border-zinc-200 shadow-sm rounded-xl p-6 text-center">
        <p className="text-zinc-500 text-sm">
          {q.priceSummaryEmpty}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-zinc-200 shadow-sm rounded-xl p-6">
      <h4 className="text-xs uppercase tracking-widest font-bold text-zinc-500 mb-4">
        {q.priceSummaryHeading}
      </h4>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-zinc-600">
          <span>{q.basePrice}</span>
          <span>${breakdown.basePrice}</span>
        </div>
        {breakdown.afterType !== breakdown.basePrice && (
          <div className="flex justify-between text-zinc-600">
            <span>{q.cleaningTypeLabel}</span>
            <span>${breakdown.afterType - breakdown.basePrice > 0 ? '+' : ''}${breakdown.afterType - breakdown.basePrice}</span>
          </div>
        )}
        {breakdown.afterCondition !== breakdown.afterType && (
          <div className="flex justify-between text-zinc-600">
            <span>{q.conditionLabel}</span>
            <span>+${breakdown.afterCondition - breakdown.afterType}</span>
          </div>
        )}
        {breakdown.addonsTotal > 0 && (
          <div className="flex justify-between text-zinc-600">
            <span>{q.addonsLabel}</span>
            <span>+${breakdown.addonsTotal}</span>
          </div>
        )}
        {breakdown.discount > 0 && (
          <div className="flex justify-between text-green-400">
            <span>{q.discountLabel}</span>
            <span>-${breakdown.discount}</span>
          </div>
        )}
      </div>

      <div className="border-t border-zinc-200 mt-4 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-xs uppercase tracking-widest font-bold text-zinc-500">
            {q.totalLabel}
          </span>
          <span className="text-3xl font-bold text-zinc-900">
            ${breakdown.total}
          </span>
        </div>
        <p className="text-[11px] text-zinc-500 mt-2">
          {q.disclaimer}
        </p>
      </div>

      {showBookButton && (
        <div className="mt-6">
          <Button href="/booking" variant="primary" size="lg" className="w-full text-center">
            {q.bookCleaning}
          </Button>
        </div>
      )}
    </div>
  );
}
