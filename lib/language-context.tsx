
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, getTranslations, Translation } from './i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');
  const [t, setT] = useState<Translation>(getTranslations('es'));

  useEffect(() => {
    // Get language from localStorage or browser
    const savedLanguage = localStorage.getItem('language') as Language;
    const browserLanguage = navigator.language.split('-')[0];
    
    let defaultLanguage: Language = 'es';
    if (savedLanguage && ['es', 'en', 'va'].includes(savedLanguage)) {
      defaultLanguage = savedLanguage;
    } else if (browserLanguage === 'en') {
      defaultLanguage = 'en';
    } else if (browserLanguage === 'ca' || browserLanguage === 'val') {
      defaultLanguage = 'va';
    }

    setLanguage(defaultLanguage);
    setT(getTranslations(defaultLanguage));
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    setT(getTranslations(lang));
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
