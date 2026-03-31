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

  // Step 6 lead capture
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadLoading, setLeadLoading] = useState(false);
  const [leadError, setLeadError] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const canProceed = () => {
    switch (state.step) {
      case 1: return state.homeSize !== null;
      case 2: return state.cleaningType !== null;
      case 3: return state.condition !== null;
      case 4: return true;
      case 5: return state.frequency !== null;
      default: return false;
    }
  };

  const nextStep = () => {
    if (state.step < 6 && canProceed()) {
      setState((s) => ({ ...s, step: s.step + 1 }));
    }
  };

  const prevStep = () => {
    if (state.step > 1) {
      setState((s) => ({ ...s, step: s.step - 1 }));
    }
  };

  const reset = () => {
    setState(initialState);
    setLeadName('');
    setLeadEmail('');
    setLeadError('');
    setLeadSubmitted(false);
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeadLoading(true);
    setLeadError('');

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadName,
          email: leadEmail,
          home_size: state.homeSize,
          cleaning_type: state.cleaningType,
          condition: state.condition,
          addons: state.addons,
          frequency: state.frequency,
          estimated_total: breakdown?.total ?? null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLeadError(data.error || 'Something went wrong. Please try again.');
      } else {
        setLeadSubmitted(true);
      }
    } catch {
      setLeadError('Network error. Please try again.');
    } finally {
      setLeadLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <StepIndicator currentStep={Math.min(state.step, 5)} />

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
          {state.step === 6 && (
            <div>
              {leadSubmitted ? (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">&#10003;</div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Quote Sent!</h3>
                  <p className="text-gray-500 mb-6">
                    Inna will follow up within 24 hours to confirm your appointment.
                  </p>
                  <Button onClick={reset} variant="outline" size="md">
                    Start Over
                  </Button>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">Almost done!</h3>
                  <p className="text-gray-500 text-sm mb-6">Where should we send your quote?</p>
                  <form onSubmit={handleQuoteSubmit} className="space-y-4 max-w-sm">
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        className="w-full border-2 border-gray-200 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none transition-colors"
                        placeholder="Jane Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        className="w-full border-2 border-gray-200 px-4 py-3 text-sm focus:border-sky-600 focus:outline-none transition-colors"
                        placeholder="jane@email.com"
                      />
                    </div>
                    {leadError && <p className="text-red-500 text-sm">{leadError}</p>}
                    <Button type="submit" variant="primary" size="md" disabled={leadLoading}>
                      {leadLoading ? 'Sending…' : 'Send My Quote'}
                    </Button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between mt-8">
          <div>
            {state.step > 1 && !leadSubmitted && (
              <Button onClick={prevStep} variant="outline" size="md">
                Back
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            {state.step < 5 && (
              <Button
                onClick={nextStep}
                variant="primary"
                size="md"
                disabled={!canProceed()}
              >
                Next
              </Button>
            )}
            {state.step === 5 && (
              <Button
                onClick={nextStep}
                variant="primary"
                size="md"
                disabled={!canProceed()}
              >
                Get My Quote
              </Button>
            )}
            {state.step === 6 && leadSubmitted && (
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
            showBookButton={state.step >= 5 && state.frequency !== null && !leadSubmitted}
          />
        </div>
      </div>
    </div>
  );
}
