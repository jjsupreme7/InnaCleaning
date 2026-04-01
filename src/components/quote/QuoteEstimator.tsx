'use client';

import { useState } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
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
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1.25fr_0.75fr]">
      <div className="panel-card scroll-fade-up p-6 md:p-8">
        <StepIndicator currentStep={state.step} />

        <div className="min-h-[320px]">
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

        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-[rgba(70,121,104,0.12)] pt-6 sm:flex-row">
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
                size="md"
                disabled={!canProceed()}
              >
                Next
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Button>
            ) : (
              <Button onClick={reset} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4" strokeWidth={1.8} />
                Start Over
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="scroll-fade-up">
        <div className="xl:sticky xl:top-28">
          <PriceSummary
            breakdown={breakdown}
            showBookButton={state.step === 5 && state.frequency !== null}
          />
        </div>
      </div>
    </div>
  );
}
