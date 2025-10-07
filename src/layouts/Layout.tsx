import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, translations } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle smooth scrolling to sections when hash changes
  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.substring(1); // Remove the '#' prefix
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Small delay to ensure DOM is ready
    }
    // Close mobile menu when navigating
    setIsMobileMenuOpen(false);
  }, [location.hash]);

  // Close mobile menu on window resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Navigation links array for reusability
  const navLinks = [
    { href: '/#home', label: translations[language].nav.home },
    { href: '/#packages', label: translations[language].nav.packages },
    { href: '/#testimonials', label: translations[language].nav.testimonials },
    { href: '/blog', label: translations[language].nav.blog },
    { href: '/#contact', label: translations[language].nav.contact },
    { href: '/client-gallery', label: translations[language].nav.gallery }
  ];

  return (
    <div className="min-h-screen bg-[#faf8f3]">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out ${
        scrolled 
          ? 'py-3 bg-[rgba(24,24,24,0.75)] backdrop-blur-[10px] shadow-lg' 
          : 'py-4 bg-black/30'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className={`text-xl sm:text-2xl font-light tracking-wide transition-colors duration-300 ${
            scrolled ? 'text-white' : 'text-white'
          }`} style={{fontFamily: 'Playfair Display, serif', textShadow: '0 1px 3px rgba(0,0,0,0.5)'}}>
            Evermore Weddings
          </h1>
          
          <ul className={`hidden lg:flex items-center space-x-6 xl:space-x-8 text-sm font-medium`}>
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link 
                  to={link.href} 
                  className={`relative transition-all duration-300 ease-in-out group ${
                    scrolled ? 'text-white' : 'text-[#F8F4E3]'
                  }`}
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '18px',
                    fontWeight: '600',
                    letterSpacing: '0.5px',
                    textShadow: scrolled ? 'none' : '0 1px 3px rgba(0,0,0,0.4)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C19A6B] group-hover:w-full transition-all duration-300 ease-out"></span>
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Mobile menu button and Language toggle */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden w-12 h-12 bg-black/20 backdrop-blur-sm border-2 border-[#C19A6B]/50 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#C19A6B]/20 min-h-[48px] min-w-[48px] touch-manipulation"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5 text-[#F8F4E3]" />
            </button>

            {/* Language toggle */}
            <div className="flex items-center rounded-full border-2 border-[#C19A6B]/50 transition-all duration-300 bg-black/20 backdrop-blur-sm">
            <button 
              onClick={toggleLanguage}
              className={`font-bold rounded-full px-4 py-3 transition-all duration-300 ease-in-out flex items-center justify-center min-h-[48px] min-w-[48px] touch-manipulation ${
                language === 'bg' 
                  ? 'bg-gradient-to-r from-[#C19A6B] to-[#E6BE8A] text-white shadow-md' 
                  : 'bg-transparent text-[#F8F4E3] hover:bg-white/10'
              }`}
              style={{
                fontSize: '16px', 
                textShadow: scrolled ? 'none' : '0 1px 3px rgba(0,0,0,0.5)'
              }}
            >
              БГ
            </button>
            <span className="mx-1 text-white/20 transition-colors duration-300">|</span>
            <button 
              onClick={toggleLanguage}
              className={`font-bold rounded-full px-4 py-3 transition-all duration-300 ease-in-out flex items-center justify-center min-h-[48px] min-w-[48px] touch-manipulation ${
                language === 'en' 
                  ? 'bg-gradient-to-r from-[#C19A6B] to-[#E6BE8A] text-white shadow-md' 
                  : 'bg-transparent text-[#F8F4E3] hover:bg-white/10'
              }`}
              style={{
                fontSize: '16px', 
                textShadow: scrolled ? 'none' : '0 1px 3px rgba(0,0,0,0.5)'
              }}
            >
              EN
            </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="absolute inset-0 bg-black/90 backdrop-blur-md">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#C19A6B]/30">
            <h2 className="text-2xl font-light text-[#C19A6B] tracking-[0.2em]" style={{fontFamily: 'Playfair Display, serif'}}>
              EVERMORE
            </h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-12 h-12 bg-[#C19A6B]/20 backdrop-blur-sm border border-[#C19A6B]/50 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#C19A6B]/30 min-h-[48px] min-w-[48px] touch-manipulation"
              aria-label="Close mobile menu"
            >
              <X className="w-5 h-5 text-[#F8F4E3]" />
            </button>
          </div>

          {/* Mobile Menu Navigation */}
          <nav className="flex-1 flex flex-col items-center justify-center px-6">
            <ul className="flex flex-col items-center space-y-8">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-2xl font-medium text-[#F8F4E3] hover:text-[#C19A6B] transition-colors duration-300 relative group"
                    style={{
                      fontFamily: 'Playfair Display, serif',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#C19A6B] group-hover:w-full transition-all duration-300 ease-out"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Footer */}
          <div className="p-6 border-t border-[#C19A6B]/30 text-center">
            <p className="text-[#F8F4E3]/80 text-sm mb-2">{translations[language].contactSection.directContact}</p>
            <div className="space-y-1">
              {translations[language].contactInfo.phone.split(', ').map((phone, index) => (
                <div key={index}>
                  <a 
                    href={`tel:${phone}`}
                    className="text-[#C19A6B] font-medium hover:text-[#E6BE8A] transition-colors duration-300 block min-h-[48px] min-w-[48px] touch-manipulation py-2"
                  >
                    {phone}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {children}

      {/* Footer */}
      <footer className="bg-[#2c3831] text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-xl sm:text-2xl font-light mb-4 tracking-[0.2em]" style={{fontFamily: 'Playfair Display, serif'}}>
            EVERMORE WEDDINGS
          </h3>
          
          <div className="border-t border-[#c9705f]/30 pt-6 mt-6">
            <p className="text-[#faf8f3]/60 text-sm">
              {translations[language].footer.copyright}
            </p>
            <p className="text-[#faf8f3]/50 text-xs mt-2">
              Designed by <span className="text-[#c9705f] font-medium">Peroto Digital</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}