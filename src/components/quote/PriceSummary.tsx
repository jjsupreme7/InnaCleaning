'use client';

import { PriceBreakdown } from '@/types';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';
import BorderBeam from '@/components/ui/BorderBeam';

interface Props {
  breakdown: PriceBreakdown | null;
  showBookButton: boolean;
}

export default function PriceSummary({ breakdown, showBookButton }: Props) {
  const { t } = useLanguage();
  const q = t.quote;

  if (!breakdown) {
    return (
      <div className="relative theme-transition border shadow-sm rounded-xl p-6 text-center" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--card-border)' }}>
        <BorderBeam />
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {q.priceSummaryEmpty}
        </p>
      </div>
    );
  }

  return (
    <div className="relative theme-transition border shadow-sm rounded-xl p-6" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--card-border)' }}>
      <BorderBeam />
      <h4 className="text-xs uppercase tracking-widest font-bold mb-4" style={{ color: 'var(--text-muted)' }}>
        {q.priceSummaryHeading}
      </h4>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between" style={{ color: 'var(--text-secondary)' }}>
          <span>{q.basePrice}</span>
          <span>${breakdown.basePrice}</span>
        </div>
        {breakdown.afterType !== breakdown.basePrice && (
          <div className="flex justify-between" style={{ color: 'var(--text-secondary)' }}>
            <span>{q.cleaningTypeLabel}</span>
            <span>${breakdown.afterType - breakdown.basePrice > 0 ? '+' : ''}${breakdown.afterType - breakdown.basePrice}</span>
          </div>
        )}
        {breakdown.afterCondition !== breakdown.afterType && (
          <div className="flex justify-between" style={{ color: 'var(--text-secondary)' }}>
            <span>{q.conditionLabel}</span>
            <span>+${breakdown.afterCondition - breakdown.afterType}</span>
          </div>
        )}
        {breakdown.addonsTotal > 0 && (
          <div className="flex justify-between" style={{ color: 'var(--text-secondary)' }}>
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

      <div className="border-t mt-4 pt-4" style={{ borderColor: 'var(--card-border)' }}>
        <div className="flex justify-between items-center">
          <span className="text-xs uppercase tracking-widest font-bold" style={{ color: 'var(--text-muted)' }}>
            {q.totalLabel}
          </span>
          <span className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
            ${breakdown.total}
          </span>
        </div>
        <p className="text-[11px] mt-2" style={{ color: 'var(--text-muted)' }}>
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
