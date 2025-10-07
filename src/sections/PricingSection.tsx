import React from 'react';
import { CheckCircle, FileText, HardDrive, Users, Star, Crown, Zap, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function PricingSection() {
  const { language, translations } = useLanguage();

  return (
    <section id="packages" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#faf8f3] to-[#f5e6d3] relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-[#C65D00] to-[#E97451] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-[#87A96B] to-[#8B6F47] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-gradient-to-br from-[#8B4789] to-[#C154C1] rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light mb-4 sm:mb-6 text-[#2c3831]" style={{fontFamily: 'Playfair Display, serif'}}>
            {translations[language].packages.title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#2c3831]/70 max-w-2xl mx-auto leading-relaxed mb-8">
            {translations[language].packages.subtitle}
          </p>
        </div>
        
        {/* Main Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {/* Wedding Package 1 */}
          <div className="group bg-white rounded-3xl shadow-xl p-6 sm:p-8 border-2 border-[#e5d5c8] hover:border-[#C65D00] hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#C65D00]/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            
            <div className="text-center mb-6 relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-[#C65D00] to-[#E97451] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-[#2c3831]" style={{fontFamily: 'Playfair Display, serif'}}>
                Сватбен Пакет 1
              </h3>
              <div className="text-4xl sm:text-5xl font-bold text-[#c9705f] mb-2">
                1174 <span className="text-lg font-normal">лв</span>
              </div>
              <div className="text-base font-medium text-[#2c3831]/60 bg-[#f5e6d3] px-3 py-1 rounded-full inline-block">
                (600€)
              </div>
            </div>
            
            <ul className="space-y-3 mb-8 text-[#2c3831]">
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#7c9885] mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{translations[language].packages.packages[0].features[0]}</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#7c9885] mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{translations[language].packages.packages[0].features[1]}</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#7c9885] mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{translations[language].packages.packages[0].features[2]}</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#7c9885] mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{translations[language].packages.packages[0].features[4]}</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#7c9885] mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{translations[language].packages.packages[0].features[6]}</span>
              </li>
            </ul>
            
            <a 
              href="#contact"
              className="w-full bg-gradient-to-r from-[#7c9885] to-[#6a8470] text-white py-4 px-6 rounded-2xl hover:shadow-xl transition-all duration-300 font-semibold text-lg group-hover:scale-105 block text-center cursor-pointer min-h-[48px] touch-manipulation"
            >
              {translations[language].pricingSection.selectPackage}
            </a>
          </div>

          {/* Wedding Package 2 */}
          <div className="group bg-white rounded-3xl shadow-xl p-6 sm:p-8 border-2 border-[#e5d5c8] hover:border-[#C65D00] hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#87A96B]/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            
            <div className="text-center mb-6 relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-[#87A96B] to-[#8B6F47] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-[#2c3831]" style={{fontFamily: 'Playfair Display, serif'}}>
                Сватбен Пакет 2
              </h3>
              <div className="text-4xl sm:text-5xl font-bold text-[#c9705f] mb-2">
                1369 <span className="text-lg font-normal">лв</span>
              </div>
              <div className="text-base font-medium text-[#2c3831]/60 bg-[#f5e6d3] px-3 py-1 rounded-full inline-block">
                (700€)
              </div>
            </div>
            
            <ul className="space-y-3 mb-8 text-[#2c3831]">
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#7c9885] mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{translations[language].packages.packages[1].features[0]}</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#7c9885] mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{translations[language].packages.packages[1].features[1]}</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#7c9885] mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{translations[language].packages.packages[1].features[2]}</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#7c9885] mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{translations[language].packages.packages[1].features[4]}</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#7c9885] mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{translations[language].packages.packages[1].features[6]}</span>
              </li>
            </ul>
            
            <a 
              href="#contact"
              className="w-full bg-gradient-to-r from-[#7c9885] to-[#6a8470] text-white py-4 px-6 rounded-2xl hover:shadow-xl transition-all duration-300 font-semibold text-lg group-hover:scale-105 block text-center cursor-pointer min-h-[48px] touch-manipulation"
            >
              {translations[language].pricingSection.selectPackage}
            </a>
          </div>

          {/* Wedding Package 3 */}
          <div className="group bg-white rounded-3xl shadow-xl p-6 sm:p-8 border-2 border-[#e5d5c8] hover:border-[#C65D00] hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#8B4789]/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            
            <div className="text-center mb-6 relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-[#8B4789] to-[#C154C1] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-[#2c3831]" style={{fontFamily: 'Playfair Display, serif'}}>
                Сватбен Пакет 3
              </h3>
              <div className="text-4xl sm:text-5xl font-bold text-[#c9705f] mb-2">
                1467 <span className="text-lg font-normal">лв</span>
              </div>
              <div className="text-base font-medium text-[#2c3831]/60 bg-[#f5e6d3] px-3 py-1 rounded-full inline-block">
                (750€)
              </div>
            </div>
            
            <ul className="space-y-3 mb-8 text-[#2c3831]">
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#7c9885] mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{translations[language].packages.packages[2].features[0]}</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#7c9885] mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{translations[language].packages.packages[2].features[1]}</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#7c9885] mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{translations[language].packages.packages[2].features[4]}</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#7c9885] mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{translations[language].packages.packages[2].features[7]}</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#7c9885] mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{translations[language].packages.packages[2].features[8]}</span>
              </li>
            </ul>
            
            <a 
              href="#contact"
              className="w-full bg-gradient-to-r from-[#7c9885] to-[#6a8470] text-white py-4 px-6 rounded-2xl hover:shadow-xl transition-all duration-300 font-semibold text-lg group-hover:scale-105 block text-center cursor-pointer min-h-[48px] touch-manipulation"
            >
              {translations[language].pricingSection.selectPackage}
            </a>
          </div>

          {/* Wedding Package 4 */}
          <div className="group bg-white rounded-3xl shadow-xl p-6 sm:p-8 border-2 border-[#e5d5c8] hover:border-[#C65D00] hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#C65D00]/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            
            <div className="text-center mb-6 relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-[#C65D00] to-[#E97451] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-[#2c3831]" style={{fontFamily: 'Playfair Display, serif'}}>
                Сватбен Пакет 4
              </h3>
              <div className="text-4xl sm:text-5xl font-bold text-[#c9705f] mb-2">
                1897 <span className="text-lg font-normal">лв</span>
              </div>
              <div className="text-base font-medium text-[#2c3831]/60 bg-[#f5e6d3] px-3 py-1 rounded-full inline-block">
                (970€)
              </div>
            </div>
            
            <ul className="space-y-3 mb-8 text-[#2c3831]">
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#7c9885] mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{translations[language].packages.packages[3].features[0]}</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#7c9885] mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{translations[language].packages.packages[3].features[1]}</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#7c9885] mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{translations[language].packages.packages[3].features[2]}</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#7c9885] mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{translations[language].packages.packages[3].features[4]}</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#7c9885] mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{translations[language].packages.packages[3].features[7]}</span>
              </li>
            </ul>
            
            <a 
              href="#contact"
              className="w-full bg-gradient-to-r from-[#7c9885] to-[#6a8470] text-white py-4 px-6 rounded-2xl hover:shadow-xl transition-all duration-300 font-semibold text-lg group-hover:scale-105 block text-center cursor-pointer min-h-[48px] touch-manipulation"
            >
              {translations[language].pricingSection.selectPackage}
            </a>
          </div>

          {/* Video Package */}
          <div className="group bg-white rounded-3xl shadow-xl p-6 sm:p-8 border-2 border-[#e5d5c8] hover:border-[#C65D00] hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#87A96B]/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            
            <div className="text-center mb-6 relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-[#87A96B] to-[#8B6F47] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-[#2c3831]" style={{fontFamily: 'Playfair Display, serif'}}>
                Видео Пакет
              </h3>
              <div className="text-4xl sm:text-5xl font-bold text-[#c9705f] mb-2">
                1369 <span className="text-lg font-normal">лв</span>
              </div>
              <div className="text-base font-medium text-[#2c3831]/60 bg-[#f5e6d3] px-3 py-1 rounded-full inline-block">
                (700€)
              </div>
            </div>
            
            <ul className="space-y-3 mb-8 text-[#2c3831]">
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#7c9885] mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{translations[language].packages.packages[4].features[0]}</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#7c9885] mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{translations[language].packages.packages[4].features[2]}</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#7c9885] mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{translations[language].packages.packages[4].features[3]}</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#7c9885] mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{translations[language].packages.packages[4].features[5]}</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-[#7c9885] mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{translations[language].packages.packages[4].features[6]}</span>
              </li>
            </ul>
            
            <a 
              href="#contact"
              className="w-full bg-gradient-to-r from-[#7c9885] to-[#6a8470] text-white py-4 px-6 rounded-2xl hover:shadow-xl transition-all duration-300 font-semibold text-lg group-hover:scale-105 block text-center cursor-pointer min-h-[48px] touch-manipulation"
            >
              {translations[language].pricingSection.selectPackage}
            </a>
          </div>
        </div>

        {/* HERO COMBO PACKAGE - Full Width Spotlight */}
        <div className="relative mb-16">
          {/* Spotlight Background Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#c9705f]/20 via-[#e97451]/30 to-[#c9705f]/20 rounded-3xl blur-xl transform scale-110"></div>
          
          <div className="relative bg-gradient-to-br from-[#2c3831] via-[#3a4a3e] to-[#2c3831] rounded-3xl shadow-2xl overflow-hidden border-4 border-[#c9705f] transform hover:scale-105 transition-all duration-500 group">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-[#C65D00] to-[#E97451] rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-br from-[#87A96B] to-[#8B6F47] rounded-full blur-2xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-[#8B4789] to-[#C154C1] rounded-full blur-3xl opacity-30 animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10 p-8 sm:p-12">
              <div className="max-w-3xl mx-auto text-center">
                {/* Left Side - Content */}
                <div className="text-center">
                  <div className="flex items-center justify-center lg:justify-start space-x-4 mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#c9705f] to-[#e97451] rounded-3xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2" style={{fontFamily: 'Playfair Display, serif'}}>
                        Комбо Пакет
                      </h3>
                      <p className="text-white/80 text-lg">Фотография + Видеография</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <div className="text-6xl sm:text-7xl font-bold text-[#e97451] mb-2">
                      2738 <span className="text-2xl font-normal text-white">лв</span>
                    </div>
                    <div className="text-xl font-medium text-white/80 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full inline-block">
                      (1400€)
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                      <div className="text-2xl font-bold text-[#e97451] mb-1">2</div>
                      <div className="text-white/80 text-sm">Професионалисти</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                      <div className="text-2xl font-bold text-[#e97451] mb-1">12</div>
                      <div className="text-white/80 text-sm">Часа покритие</div>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {translations[language].packages.packages[5].features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-6 h-6 text-[#e97451] mt-0.5 flex-shrink-0" />
                        <span className="text-white leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a 
                    href="#contact"
                    className="inline-block bg-gradient-to-r from-[#e97451] to-[#c9705f] text-white py-4 px-8 rounded-2xl hover:shadow-2xl transition-all duration-300 font-bold text-xl group-hover:scale-105 cursor-pointer min-h-[48px] touch-manipulation"
                  >
                    {translations[language].pricingSection.selectPackage}
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
        
        {/* Why Choose Us Section */}
        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 sm:p-12 max-w-5xl mx-auto border border-[#e5d5c8]">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-8 text-[#2c3831]" style={{fontFamily: 'Playfair Display, serif'}}>
              {translations[language].pricingSection.whyChooseUs}
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-[#7c9885] to-[#6a8470] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <FileText className="w-10 h-10 text-white" />
                </div>
                <h4 className="font-bold text-[#2c3831] text-lg mb-2">{translations[language].pricingSection.officialContract}</h4>
                <p className="text-sm leading-relaxed">{translations[language].pricingSection.contractDescription}</p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-[#c9705f] to-[#e97451] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-[#2c3831] text-lg mb-2">{translations[language].pricingSection.personalApproach}</h4>
                <p className="text-sm leading-relaxed">{translations[language].pricingSection.personalDescription}</p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-[#87A96B] to-[#8B6F47] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h4 className="font-bold text-[#2c3831] text-lg mb-2">{translations[language].pricingSection.emotionalCapture}</h4>
                <p className="text-sm leading-relaxed">{translations[language].pricingSection.emotionalDescription}</p>
              </div>
            </div>

            {/* Additional Trust Elements */}
            <div className="mt-12 pt-8 border-t border-[#e5d5c8]">
              <div className="flex flex-wrap justify-center items-center gap-8 text-[#2c3831]/60">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-[#7c9885]" />
                  <span className="text-sm font-medium">{translations[language].pricingSection.insurance}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-[#c9705f]" />
                  <span className="text-sm font-medium">{translations[language].pricingSection.rating}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-[#8B4789]" />
                  <span className="text-sm font-medium">{translations[language].pricingSection.experience}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}