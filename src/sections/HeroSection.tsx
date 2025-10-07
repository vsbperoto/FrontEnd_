import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);
  const { language, translations } = useLanguage();

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Background with parallax effect */}
      <div className="absolute inset-0 transform scale-110">
        <img
          srcSet="https://res.cloudinary.com/djrsrxkls/image/upload/w_1024,q_auto,f_auto/wedding_gallery/hero-image.jpg 1024w,
                  https://res.cloudinary.com/djrsrxkls/image/upload/w_1920,q_auto,f_auto/wedding_gallery/hero-image.jpg 1920w"
          sizes="100vw"
          src="https://res.cloudinary.com/djrsrxkls/image/upload/w_1920,q_auto,f_auto/wedding_gallery/hero-image.jpg"
          alt="Elegant wedding ceremony setup with beautiful floral arrangements and romantic lighting"
          className="w-full h-full object-cover object-center transform transition-transform duration-1000 ease-out"
          loading="eager"
          style={{
            transform: `translateY(${typeof window !== 'undefined' ? window.scrollY * 0.5 : 0}px) scale(1.1)`
          }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl">
          {/* Main Heading with fade-in animation */}
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-4 sm:mb-6 text-white leading-tight transition-all duration-1000 transform ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{fontFamily: 'Playfair Display, serif'}}>
            {translations[language].hero.title}
          </h1>
          
          {/* Subheading with delayed fade-in */}
          <p className={`text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-12 text-white/90 font-light leading-relaxed transition-all duration-1000 delay-300 transform ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {translations[language].hero.subtitle}
          </p>
          
          {/* CTA Buttons with staggered fade-in */}
          <div className={`flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center transition-all duration-1000 delay-500 transform ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {/* Primary CTA Button */}
            <a 
              href="#packages" 
              className="bg-[#C19A6B] text-white px-8 py-4 rounded-[50px] hover:bg-[#A87F50] hover:shadow-xl transition-all duration-300 ease-in-out flex items-center justify-center space-x-2 font-bold text-lg group min-h-[48px] min-w-[48px] touch-manipulation"
              style={{fontFamily: 'Playfair Display, serif', padding: '14px 32px'}}
            >
              <span>{translations[language].hero.cta}</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            {/* Secondary CTA Button */}
            <a 
              href="#contact" 
              className="border-2 border-[#C19A6B] bg-transparent text-[#C19A6B] px-8 py-4 rounded-[50px] hover:bg-[#C19A6B] hover:text-white transition-all duration-300 ease-in-out font-bold text-lg min-h-[48px] min-w-[48px] touch-manipulation"
              style={{fontFamily: 'Playfair Display, serif', padding: '14px 32px'}}
            >
              {translations[language].hero.secondaryCta}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}