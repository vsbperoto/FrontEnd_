import React from 'react';
import { Mail, Phone } from 'lucide-react';
import QuickContactForm from '../components/QuickContactForm';
import { useLanguage } from '../contexts/LanguageContext';

export default function ContactSection() {
  const { language, translations } = useLanguage();

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#2c3831] via-[#3a4a3e] to-[#2c3831] relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-[#C65D00] to-[#E97451] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-[#87A96B] to-[#8B6F47] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-[#8B4789] to-[#C154C1] rounded-full blur-3xl opacity-30"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-5xl sm:text-6xl font-light mb-6 text-white leading-tight" style={{fontFamily: 'Playfair Display, serif'}}>
            {translations[language].ctaSection.title}
          </h2>
          <p className="text-xl sm:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            {translations[language].ctaSection.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Contact Info */}
          <div className="space-y-10">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl">
              <h3 className="text-2xl font-semibold mb-8 text-white" style={{fontFamily: 'Playfair Display, serif'}}>
                {translations[language].contactSection.directContact}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#C65D00] to-[#E97451] rounded-2xl flex items-center justify-center shadow-lg">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-3 text-white">{translations[language].contactSection.callNow}</h4>
                    <div className="space-y-2">
                      {translations[language].contactInfo.phone.split(', ').map((phone, index) => (
                        <div key={index}>
                          <a 
                            href={`tel:${phone}`}
                            className="text-white/90 hover:text-[#E97451] transition-colors duration-300 text-lg font-medium block hover:scale-105 transform transition-transform min-h-[48px] min-w-[48px] touch-manipulation py-2"
                          >
                            {phone}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#87A96B] to-[#8B6F47] rounded-2xl flex items-center justify-center shadow-lg">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-3 text-white">{translations[language].contactSection.sendEmail}</h4>
                    <a 
                      href="mailto:info@evermoreweddings.bg"
                      className="text-white/90 hover:text-[#87A96B] transition-colors duration-300 text-lg font-medium hover:scale-105 transform transition-transform inline-block min-h-[48px] min-w-[48px] touch-manipulation py-2"
                    >
                      info@evermoreweddings.bg
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#8B4789] to-[#C154C1] rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold mb-3 text-white">{translations[language].contactSection.followUs}</h4>
                    <div className="space-y-3">
                      <a 
                        href="https://www.facebook.com/evermoreweddings" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 text-white/90 hover:text-[#4267B2] transition-colors duration-300 group min-h-[48px] touch-manipulation py-2"
                      >
                        <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        <span className="font-medium">Facebook</span>
                      </a>
                      <a 
                        href="https://www.instagram.com/evermoreweddings" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 text-white/90 hover:text-[#E4405F] transition-colors duration-300 group min-h-[48px] touch-manipulation py-2"
                      >
                        <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        <span className="font-medium">Instagram</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Trust Indicators */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/10">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-white mb-1">∞</div>
                  <div className="text-white/70 text-sm">{translations[language].contactSection.weddings}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">5★</div>
                  <div className="text-white/70 text-sm">{translations[language].contactSection.rating}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white mb-1">10+</div>
                  <div className="text-white/70 text-sm">{translations[language].contactSection.yearsExperience}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Contact Form */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 border border-white/30">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold mb-3 text-[#2c3831]" style={{fontFamily: 'Playfair Display, serif'}}>
                {translations[language].contactSection.freeConsultation}
              </h3>
              <p className="text-[#2c3831]/70">{translations[language].contactSection.personalizedOffer}</p>
            </div>
            <QuickContactForm />
            
            {/* Form Benefits */}
            <div className="mt-8 pt-6 border-t border-[#2c3831]/10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-4 text-sm text-[#2c3831]/70">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#C65D00] rounded-full"></div>
                  <span>{translations[language].contactSection.responseTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#87A96B] rounded-full"></div>
                  <span>{translations[language].contactSection.consultation}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#8B4789] rounded-full"></div>
                  <span>{translations[language].contactSection.offer}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#C65D00] rounded-full"></div>
                  <span>{translations[language].contactSection.noHiddenFees}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}