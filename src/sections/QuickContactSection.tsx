import React from 'react';
import QuickContactForm from '../components/QuickContactForm';

export default function QuickContactSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#faf8f3] to-[#f5e6d3]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6 text-[#2c3831]" style={{fontFamily: 'Playfair Display, serif'}}>
            Готови сте за вашия специален ден?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#2c3831]/70 max-w-2xl mx-auto leading-relaxed">
            Свържете се с нас за безплатна консултация
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 max-w-2xl mx-auto">
          <QuickContactForm />
        </div>
      </div>
    </section>
  );
}