import React, { useState } from 'react';
import FAQItem from '../components/FAQItem';
import { useLanguage } from '../contexts/LanguageContext';

export default function FAQSection() {
  const { language, translations } = useLanguage();

  const faqs = translations[language].faqSection.faqs;

  return (
    <section className="py-20 px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light mb-4 text-[#6B5B45]">{translations[language].faqSection.title}</h2>
          <p className="text-lg text-[#8B7355]">{translations[language].faqSection.subtitle}</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-[#8B7355] mb-6">
            {translations[language].faqSection.noAnswer}
          </p>
          <a
            href="#contact"
            className="bg-gradient-to-r from-[#C65D00] to-[#E97451] text-white px-8 py-3 rounded-full hover:shadow-lg transition"
          >
            {translations[language].faqSection.contactUs}
          </a>
        </div>
      </div>
    </section>
  );
}