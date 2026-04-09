'use client';

import { useState } from 'react';
import { QuoteState } from '@/types';
import { useQuoteCalculator } from '@/hooks/useQuoteCalculator';
import { useLanguage } from '@/contexts/LanguageContext';
import StepIndicator from './StepIndicator';
import StepHomeSize from './StepHomeSize';
import StepCleaningType from './StepCleaningType';
import StepCondition from './StepCondition';
import StepAddons from './StepAddons';
import StepFrequency from './StepFrequency';
import StepContact from './StepContact';
import PriceSummary from './PriceSummary';
import Button from '@/components/ui/Button';

const initialState: QuoteState = {
  step: 1,
  homeSize: null,
  cleaningType: null,
  condition: null,
  addons: { fridge: false, oven: false, windows: false, laundry: false, petHair: false },
  frequency: null,
  name: '',
  email: '',
};

export default function QuoteEstimator() {
  const { t } = useLanguage();
  const q = t.quote;

  const [state, setState] = useState<QuoteState>(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const breakdown = useQuoteCalculator(state);

  const canProceed = () => {
    switch (state.step) {
      case 1: return state.homeSize !== null;
      case 2: return state.cleaningType !== null;
      case 3: return state.condition !== null;
      case 4: return true;
      case 5: return state.frequency !== null;
      case 6: return state.name.trim() !== '' && state.email.trim() !== '';
      default: return false;
    }
  };

  const nextStep = () => {
    if (state.step < 6 && canProceed()) {
      setState((s) => ({ ...s, step: s.step + 1 }));
    }
  };

  const prevStep = () => {
    if (state.step > 1) setState((s) => ({ ...s, step: s.step - 1 }));
  };

  const handleSubmit = async () => {
    if (!canProceed()) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: state.name,
          email: state.email,
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
        setError(data.error || 'Something went wrong.');
      } else {
        setSubmitted(true);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4 text-red-500">&#10003;</div>
        <h3 className="text-2xl font-bold text-zinc-900 mb-3">{q.savedHeading}</h3>
        <p className="text-zinc-600 mb-2">
          {q.savedThanks.replace('{name}', state.name)}{' '}
          <span className="text-zinc-900 font-bold">${breakdown?.total}</span>.
        </p>
        <p className="text-zinc-500 text-sm mb-8">
          {q.savedInTouch.replace('{email}', state.email)}
        </p>
        <div className="flex gap-4 justify-center">
          <Button href="/booking" variant="primary" size="lg">{q.bookNow}</Button>
          <Button onClick={() => { setSubmitted(false); setState(initialState); }} variant="outline" size="lg">{q.startOver}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <StepIndicator currentStep={state.step} />

        <div className="min-h-[300px]">
          {state.step === 1 && <StepHomeSize value={state.homeSize} onChange={(homeSize) => setState((s) => ({ ...s, homeSize }))} />}
          {state.step === 2 && <StepCleaningType value={state.cleaningType} onChange={(cleaningType) => setState((s) => ({ ...s, cleaningType }))} />}
          {state.step === 3 && <StepCondition value={state.condition} onChange={(condition) => setState((s) => ({ ...s, condition }))} />}
          {state.step === 4 && <StepAddons value={state.addons} onChange={(addons) => setState((s) => ({ ...s, addons }))} />}
          {state.step === 5 && <StepFrequency value={state.frequency} onChange={(frequency) => setState((s) => ({ ...s, frequency }))} />}
          {state.step === 6 && (
            <StepContact
              name={state.name}
              email={state.email}
              onChangeName={(name) => setState((s) => ({ ...s, name }))}
              onChangeEmail={(email) => setState((s) => ({ ...s, email }))}
            />
          )}
        </div>

        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

        <div className="flex justify-between mt-8">
          <div>
            {state.step > 1 && <Button onClick={prevStep} variant="outline" size="md">{q.back}</Button>}
          </div>
          <div>
            {state.step < 6 ? (
              <Button onClick={nextStep} variant="primary" size="md" disabled={!canProceed()}>{q.next}</Button>
            ) : (
              <Button onClick={handleSubmit} variant="primary" size="md" disabled={!canProceed() || loading}>
                {loading ? q.saving : q.getQuote}
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="lg:sticky lg:top-24">
          <PriceSummary breakdown={breakdown} showBookButton={false} />
        </div>
      </div>
    </div>
  );
}
