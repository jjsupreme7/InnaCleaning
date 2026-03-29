import { useMemo } from 'react';
import { QuoteState, PriceBreakdown } from '@/types';
import {
  BASE_PRICES,
  TYPE_MULTIPLIERS,
  CONDITION_MULTIPLIERS,
  ADDON_PRICES,
  FREQUENCY_DISCOUNTS,
} from '@/data/pricing';

export function useQuoteCalculator(state: QuoteState): PriceBreakdown | null {
  return useMemo(() => {
    if (!state.homeSize) return null;

    const basePrice = BASE_PRICES[state.homeSize];

    const typeMultiplier = state.cleaningType
      ? TYPE_MULTIPLIERS[state.cleaningType]
      : 1;
    const afterType = basePrice * typeMultiplier;

    const conditionMultiplier = state.condition
      ? CONDITION_MULTIPLIERS[state.condition]
      : 1;
    const afterCondition = afterType * conditionMultiplier;

    const addonsTotal = Object.entries(state.addons).reduce(
      (sum, [key, selected]) => {
        if (selected) {
          return sum + ADDON_PRICES[key as keyof typeof ADDON_PRICES];
        }
        return sum;
      },
      0
    );

    const subtotal = afterCondition + addonsTotal;

    const discountRate = state.frequency
      ? FREQUENCY_DISCOUNTS[state.frequency]
      : 0;
    const discount = Math.round(subtotal * discountRate);
    const total = subtotal - discount;

    return {
      basePrice,
      afterType: Math.round(afterType),
      afterCondition: Math.round(afterCondition),
      addonsTotal,
      subtotal: Math.round(subtotal),
      discount,
      total: Math.round(total),
    };
  }, [state]);
}
