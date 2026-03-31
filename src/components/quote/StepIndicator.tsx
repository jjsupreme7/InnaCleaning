const steps = ['Size', 'Type', 'Condition', 'Add-ons', 'Frequency'];

export default function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center mb-10">
      {steps.map((label, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;

        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                  isCompleted
                    ? 'bg-red-600 border-red-600 text-white'
                    : isActive
                    ? 'border-red-600 text-red-500'
                    : 'border-zinc-700 text-zinc-500'
                }`}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              <span
                className={`mt-1 text-[10px] uppercase tracking-widest font-medium hidden sm:block ${
                  isActive ? 'text-red-500' : 'text-zinc-500'
                }`}
              >
                {label}
              </span>
            </div>

            {i < steps.length - 1 && (
              <div
                className={`w-8 sm:w-16 h-0.5 mx-1 ${
                  isCompleted ? 'bg-red-600' : 'bg-zinc-700'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
