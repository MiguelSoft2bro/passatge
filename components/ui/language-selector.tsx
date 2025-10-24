
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Languages, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Language } from '@/lib/i18n';

const languageNames = {
  es: 'Español',
  en: 'English', 
  va: 'Valencià'
};

const languageFlags = {
  es: '🇪🇸',
  en: '🇬🇧',
  va: '🇪🇸'
};

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg glass hover:bg-amber-500/10 transition-all duration-300"
      >
        <Languages className="w-4 h-4 text-amber-400" />
        <span className="text-amber-400 font-medium">
          {languageFlags[language]} {languageNames[language]}
        </span>
        <ChevronDown className={`w-4 h-4 text-amber-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-2 py-2 glass rounded-lg border border-amber-500/20 min-w-full whitespace-nowrap z-50"
          >
            {Object.entries(languageNames).map(([code, name]) => {
              const langCode = code as Language;
              return (
                <button
                  key={code}
                  onClick={() => {
                    setLanguage(langCode);
                    setIsOpen(false);
                  }}
                  className={`flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-amber-500/10 transition-colors ${
                    language === code ? 'text-amber-400 bg-amber-500/5' : 'text-gray-300'
                  }`}
                >
                  <span>{languageFlags[langCode]}</span>
                  <span>{name}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
