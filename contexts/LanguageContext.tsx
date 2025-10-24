
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Translation, getTranslations } from '../lib/i18n';

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
    // Cargar idioma del localStorage
    const savedLanguage = localStorage.getItem('passatge-language') as Language;
    if (savedLanguage && ['es', 'en', 'va'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
      setT(getTranslations(savedLanguage));
    } else {
      // Detectar idioma del navegador
      const browserLang = navigator.language.toLowerCase();
      let detectedLang: Language = 'es';
      
      if (browserLang.includes('en')) {
        detectedLang = 'en';
      } else if (browserLang.includes('ca') || browserLang.includes('val')) {
        detectedLang = 'va';
      }
      
      setLanguage(detectedLang);
      setT(getTranslations(detectedLang));
    }
  }, []);

  const handleSetLanguage = (newLang: Language) => {
    setLanguage(newLang);
    setT(getTranslations(newLang));
    localStorage.setItem('passatge-language', newLang);
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
