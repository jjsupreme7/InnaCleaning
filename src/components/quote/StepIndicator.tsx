import {
  CalendarDays,
  Check,
  House,
  Plus,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

const steps: { label: string; icon: LucideIcon }[] = [
  { label: 'Size', icon: House },
  { label: 'Type', icon: Sparkles },
  { label: 'Condition', icon: ShieldCheck },
  { label: 'Add-ons', icon: Plus },
  { label: 'Frequency', icon: CalendarDays },
];

export default function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="grid grid-cols-5 gap-2 md:gap-3">
      {steps.map(({ label, icon: Icon }, i) => {
        const stepNum = i + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;

        return (
          <div
            key={label}
            className={`rounded-[1.4rem] border px-2 py-3 text-center transition-all duration-300 md:px-3 ${
              isCompleted
                ? 'border-[#467968] bg-[#467968] text-white shadow-[0_18px_34px_-22px_rgba(70,121,104,0.9)]'
                : isActive
                ? 'border-[#92c0b1] bg-[#edf5ee] text-[#467968]'
                : 'border-[rgba(70,121,104,0.12)] bg-white/72 text-[#92a7a1]'
            }`}
          >
            <div className="flex items-center justify-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/12">
                {isCompleted ? (
                  <Check className="h-4 w-4" strokeWidth={2.6} />
                ) : (
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                )}
              </div>
            </div>
            <span
              className={`mt-2 block text-[10px] font-semibold uppercase tracking-[0.18em] ${
                isCompleted || isActive ? 'text-current' : 'text-[#91a6a0]'
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
