'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Props {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`soft-card mb-4 overflow-hidden ${open ? 'bg-white' : ''}`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="pr-4 text-base font-semibold text-[var(--color-foreground)]">
          {question}
        </span>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 text-[#7d968f] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          strokeWidth={1.8}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96 px-6 pb-6' : 'max-h-0'
        }`}
      >
        <p className="text-sm leading-7 text-[#5d7871]">{answer}</p>
      </div>
    </div>
  );
}
