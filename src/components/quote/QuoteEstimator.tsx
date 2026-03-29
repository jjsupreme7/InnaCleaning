'use client';

import { useState } from 'react';
import { QuoteState } from '@/types';
import { useQuoteCalculator } from '@/hooks/useQuoteCalculator';
import StepIndicator from './StepIndicator';
import StepHomeSize from './StepHomeSize';
import StepCleaningType from './StepCleaningType';
import StepCondition from './StepCondition';
import StepAddons from './StepAddons';
import StepFrequency from './StepFrequency';
import PriceSummary from './PriceSummary';
import Button from '@/components/ui/Button';

const initialState: QuoteState = {
  step: 1,
  homeSize: null,
  cleaningType: null,
  condition: null,
  addons: {
    fridge: false,
    oven: false,
    windows: false,
    laundry: false,
    petHair: false,
  },
  frequency: null,
};

export default function QuoteEstimator() {
  const [state, setState] = useState<QuoteState>(initialState);
  const breakdown = useQuoteCalculator(state);

  const canProceed = () => {
    switch (state.step) {
      case 1: return state.homeSize !== null;
      case 2: return state.cleaningType !== null;
      case 3: return state.condition !== null;
      case 4: return true; // add-ons are optional
      case 5: return state.frequency !== null;
      default: return false;
    }
  };

  const nextStep = () => {
    if (state.step < 5 && canProceed()) {
      setState((s) => ({ ...s, step: s.step + 1 }));
    }
  };

  const prevStep = () => {
    if (state.step > 1) {
      setState((s) => ({ ...s, step: s.step - 1 }));
    }
  };

  const reset = () => setState(initialState);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <StepIndicator currentStep={state.step} />

        <div className="min-h-[300px]">
          {state.step === 1 && (
            <StepHomeSize
              value={state.homeSize}
              onChange={(homeSize) => setState((s) => ({ ...s, homeSize }))}
            />
          )}
          {state.step === 2 && (
            <StepCleaningType
              value={state.cleaningType}
              onChange={(cleaningType) => setState((s) => ({ ...s, cleaningType }))}
            />
          )}
          {state.step === 3 && (
            <StepCondition
              value={state.condition}
              onChange={(condition) => setState((s) => ({ ...s, condition }))}
            />
          )}
          {state.step === 4 && (
            <StepAddons
              value={state.addons}
              onChange={(addons) => setState((s) => ({ ...s, addons }))}
            />
          )}
          {state.step === 5 && (
            <StepFrequency
              value={state.frequency}
              onChange={(frequency) => setState((s) => ({ ...s, frequency }))}
            />
          )}
        </div>

        <div className="flex justify-between mt-8">
          <div>
            {state.step > 1 && (
              <Button onClick={prevStep} variant="outline" size="md">
                Back
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            {state.step < 5 ? (
              <Button
                onClick={nextStep}
                variant="primary"
                size="md"
                disabled={!canProceed()}
              >
                Next
              </Button>
            ) : (
              <Button onClick={reset} variant="outline" size="sm">
                Start Over
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="lg:sticky lg:top-24">
          <PriceSummary
            breakdown={breakdown}
            showBookButton={state.step === 5 && state.frequency !== null}
          />
        </div>
      </div>
    </div>
  );
}
