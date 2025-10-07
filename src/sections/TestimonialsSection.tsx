import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function TestimonialsSection() {
  const { language, translations } = useLanguage();

  return (
    <section id="testimonials" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6 text-[#2c3831]" style={{fontFamily: 'Playfair Display, serif'}}>
            {translations[language].testimonials.title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#2c3831]/70 max-w-2xl mx-auto leading-relaxed">
            {translations[language].testimonials.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {translations[language].testimonials.reviews.map((review, index) => (
            <div key={index} className={`bg-[#faf8f3] rounded-2xl shadow-lg p-6 sm:p-8 border border-[#e5d5c8] hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${index === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
              {/* Star Rating */}
              <div className="flex justify-center mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-[#c9705f] fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              {/* Quote */}
              <blockquote className="text-center mb-6">
                <p className="text-[#2c3831] italic text-base sm:text-lg leading-relaxed">
                  "{review.text}"
                </p>
              </blockquote>
              
              {/* Client Info */}
              <div className="text-center">
                <p className="font-semibold text-[#2c3831] mb-1">{review.name}</p>
                <p className="text-[#2c3831]/60 text-sm">{review.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}