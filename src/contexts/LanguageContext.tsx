// src/contexts/LanguageContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language, Translation } from '../lib/i18n';
import { getTranslations } from '../lib/i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;

  idIdioma: number;
  setIdIdioma: (id: number) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Idioma UI por defecto: español
  const [language, setLanguage] = useState<Language>('es');
  const [t, setT] = useState<Translation>(getTranslations('es'));

  // idIdioma para backend
  const [idIdioma, setIdIdioma] = useState<number>(() => {
    const saved = localStorage.getItem('ididioma');
    const n = saved ? Number(saved) : NaN;
    return Number.isFinite(n) && n > 0 ? n : 1; // 1 = ES
  });

  // Cargar idioma desde localStorage — NO desde navegador
  useEffect(() => {
    const savedLanguage = localStorage.getItem('passatge-language') as Language | null;

    if (savedLanguage && ['es', 'en'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
      setT(getTranslations(savedLanguage));

      const savedIdIdioma = savedLanguage === 'es' ? 1 : 2;
      setIdIdioma(savedIdIdioma);
    } else {
      // Si no hay idioma guardado → español por defecto
      setLanguage('es');
      setT(getTranslations('es'));
      setIdIdioma(1);
    }
  }, []);

  const handleSetLanguage = (newLang: Language) => {
    setLanguage(newLang);
    setT(getTranslations(newLang));
    localStorage.setItem('passatge-language', newLang);

    const newIdIdioma = newLang === 'es' ? 1 : 2;
    setIdIdioma(newIdIdioma);
  };

  useEffect(() => {
    localStorage.setItem('ididioma', String(idIdioma));
  }, [idIdioma]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        t,
        idIdioma,
        setIdIdioma,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
