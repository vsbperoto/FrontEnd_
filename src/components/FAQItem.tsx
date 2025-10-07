import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

export default function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-[#e5d4c1] rounded-2xl bg-white hover:bg-[#faf8f3] transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#7c9885] focus:ring-opacity-50 rounded-2xl min-h-[48px] touch-manipulation"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${question.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <h3 className="text-base sm:text-lg font-semibold text-[#2c3831] pr-4">
          {question}
        </h3>
        <div className="flex-shrink-0">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#7c9885] transform transition-transform duration-300" />
          ) : (
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-[#7c9885] transform transition-transform duration-300" />
          )}
        </div>
      </button>
      
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div 
          className="px-4 sm:px-6 pb-4 sm:pb-5"
          id={`faq-answer-${question.replace(/\s+/g, '-').toLowerCase()}`}
        >
          <div className="border-t border-[#e5d4c1] pt-4">
            <p className="text-[#2c3831]/70 leading-relaxed text-sm sm:text-base">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}