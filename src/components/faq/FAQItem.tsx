'use client';

import { useState } from 'react';

interface Props {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-5 flex items-center justify-between text-left group hover:text-sky-600 transition-colors"
      >
        <span className="text-sm font-bold text-slate-800 pr-4 group-hover:text-sky-600 transition-colors">{question}</span>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
          open ? 'bg-sky-600 rotate-180' : 'bg-gray-100 group-hover:bg-sky-100'
        }`}>
          <svg
            className={`w-3.5 h-3.5 transition-colors duration-300 ${open ? 'text-white' : 'text-gray-400 group-hover:text-sky-600'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96 pb-5' : 'max-h-0'
        }`}
      >
        <p className="text-gray-600 text-sm leading-relaxed pl-0.5">{answer}</p>
      </div>
    </div>
  );
}
