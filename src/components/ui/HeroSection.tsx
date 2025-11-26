
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslations } from '../../lib/i18n';

export default function HeroSection() {
  const { language } = useLanguage();
  const t = getTranslations(language);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="relative w-full h-full">
         <picture>
  <source
    media="(max-width: 767px)"
    srcSet="images/portada-mobile.jpg"
  />
  <img
    src="images/portada.jpg"
    alt="PASSATGE Bar exterior"
    className="absolute inset-0 w-full h-full object-cover object-center"
  />
</picture>

          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        </div>
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4">
        <motion.h1 
          className="font-playfair text-6xl md:text-8xl font-bold text-white mb-6 led-glow"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {t.hero.title}
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-amber-600 mb-4 font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          {t.hero.subtitle}
        </motion.p>
        
        <motion.p 
          className="text-lg text-gray-300 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          {t.hero.description}
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <Link
            to="/carta"
            className="px-8 py-3 border-2 border-amber-600/50 text-amber-600 rounded-full font-semibold bg-amber-600 text-white transition-all duration-300 transform hover:scale-105"
          >
            {t.hero.viewMenu}
          </Link>
          <a
            href="#reservas"
            className="px-8 py-3 border-2 border-amber-600/50 text-amber-600 rounded-full font-semibold hover:bg-amber-600 hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            {t.hero.learnMore}
          </a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <a href="#about" className="text-white/60 hover:text-white transition-colors">
          <ChevronDown className="w-8 h-8" />
        </a>
      </motion.div>
    </section>
  );
}
