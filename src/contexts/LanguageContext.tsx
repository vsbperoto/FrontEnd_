import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { bgTranslations, enTranslations, type TranslationContent } from '../translations';

interface LanguageContextType {
  language: 'bg' | 'en';
  toggleLanguage: () => void;
  translations: {
    bg: TranslationContent;
    en: TranslationContent;
  };
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<'bg' | 'en'>('bg');

  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang && (savedLang === 'bg' || savedLang === 'en')) {
      setLanguage(savedLang as 'bg' | 'en');
    }
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'bg' ? 'en' : 'bg';
    setLanguage(newLang);
    localStorage.setItem('language', newLang);
  };
  
  const translations = {
    bg: bgTranslations,
    en: enTranslations
  };
  
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};