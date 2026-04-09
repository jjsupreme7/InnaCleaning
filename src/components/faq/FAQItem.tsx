'use client';

import { useState } from 'react';

interface Props {
  question: string;
  answer: string;
  index?: number;
}

export default function FAQItem({ question, answer, index }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-zinc-200 group">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-6 flex items-center gap-5 text-left"
      >
        {index !== undefined && (
          <span className="text-xs font-bold text-red-500/60 tracking-widest tabular-nums flex-shrink-0 w-6">
            {String(index).padStart(2, '0')}
          </span>
        )}
        <span className="text-base font-bold text-zinc-900 group-hover:text-red-400 transition-colors duration-200 flex-1">
          {question}
        </span>
        <span
          className={`w-8 h-8 rounded-full border border-zinc-300 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            open ? 'bg-red-600 border-red-600 rotate-45' : 'group-hover:border-zinc-400'
          }`}
        >
          <svg
            className={`w-3.5 h-3.5 transition-colors duration-300 ${open ? 'text-white' : 'text-zinc-600'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          open ? 'max-h-96 pb-6' : 'max-h-0'
        }`}
      >
        <p className="text-zinc-600 text-sm leading-relaxed pl-11">
          {answer}
        </p>
      </div>
    </div>
  );
}
