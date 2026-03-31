'use client';

import { useState } from 'react';

interface Props {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-zinc-800">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className="text-sm font-bold text-white pr-4">{question}</span>
        <svg
          className={`w-4 h-4 text-zinc-500 transition-transform duration-300 flex-shrink-0 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96 pb-5' : 'max-h-0'
        }`}
      >
        <p className="text-zinc-400 text-sm leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}
