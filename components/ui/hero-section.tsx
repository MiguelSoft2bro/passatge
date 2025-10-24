
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
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
          <Image
            src="/images/hero.jpeg"
            alt="PASSATGE Bar exterior"
            fill
            className="object-cover"
            priority
          />
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
          PASSATGE
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-amber-600 mb-4 font-light"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
         Bar Gastronómico
        </motion.p>
        
        <motion.p 
          className="text-lg text-gray-300 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          Experiencia culinaria única en el corazón de Alicante. 
          Donde el arte se encuentra con la gastronomía en un ambiente sofisticado y moderno.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          <a
            href="/carta"
            className="px-8 py-3 bg-amber-800 hover:bg-amber-900 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 led-glow"
          >
            Ver Nuestra Carta
          </a>
          <a
            href="#about"
            className="px-8 py-3 border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
          >
            Conoce Más
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
