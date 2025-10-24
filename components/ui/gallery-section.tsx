
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChefHat } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const galleryImages = [
  {
    src: '/images/14d449b5-623c-4189-9cb0-4c719507b867.jpeg',
    alt: 'Tartar de Atún Rojo',
    title: 'Tartar de Atún Rojo'
  },
  {
    src: '/images/2b0b7767-5c57-4ed7-af9b-24ad48c72c5d.jpeg',
    alt: 'Arroz Negro del Mediterráneo',
    title: 'Arroz Negro del Mediterráneo'
  },
  {
    src: 'https://cdn.abacus.ai/images/5a9be7b2-4347-4b98-8e1f-8064387e560d.png',
    alt: 'Cóctel Passatge Signature',
    title: 'Cóctel Passatge Signature'
  },
  {
    src: 'https://cdn.abacus.ai/images/5a9be7b2-4347-4b98-8e1f-8064387e560d.png',
    alt: 'Solomillo de Ternera',
    title: 'Solomillo de Ternera'
  },
  {
    src: 'https://cdn.abacus.ai/images/5a9be7b2-4347-4b98-8e1f-8064387e560d.png',
    alt: 'Tarta de Chocolate Negro',
    title: 'Tarta de Chocolate Negro'
  },
  {
    src: 'https://cdn.abacus.ai/images/5a9be7b2-4347-4b98-8e1f-8064387e560d.png',
    alt: 'Lubina a la Sal',
    title: 'Lubina a la Sal'
  }
];

export default function GallerySection() {
  const { t } = useLanguage();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 px-4" ref={ref}>
      <div className="max-w-7xl mx-auto">
        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <ChefHat className="w-8 h-8 text-amber-400" />
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white">
              {t.gallery.title} <span className="text-amber-400">{t.gallery.titleHighlight}</span>
            </h2>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            {t.gallery.description}
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative aspect-square overflow-hidden rounded-xl glass hover:scale-[1.02] transition-all duration-500"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-playfair text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {image.title}
                </h3>
              </div>
              
              {/* Wood texture overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600/10 via-transparent to-amber-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="/carta"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <ChefHat className="w-5 h-5" />
            {t.hero.viewMenu}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
