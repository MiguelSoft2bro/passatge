
'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, UtensilsCrossed } from 'lucide-react';
import Link from 'next/link';
import { MenuCategory } from '@/lib/types';
import { menuItems } from '@/lib/data';
import CategoryFilter from '@/components/ui/category-filter';
import MenuCard from '@/components/ui/menu-card';

export default function CartaPage() {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'all'>('all');

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'all') {
      return menuItems;
    }
    return menuItems.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          
          
          <div className="text-center">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white">
              PASSATGE
            </h1>
            <p className="text-amber-600 text-sm">Bar Gastronomico • Alicante</p>
          </div>
          
          <div className="w-20"></div> {/* Spacer for balance */}
        </motion.div>

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <UtensilsCrossed className="w-8 h-8 text-amber-600" />
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white">
              Nuestra <span className="text-amber-600">Carta</span>
            </h2>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Descubre nuestra selección de platos de autor, elaborados con ingredientes de máxima calidad 
            y presentados en un ambiente único y sofisticado.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </motion.div>

        {/* Menu Grid */}
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((item, index) => (
            <MenuCard key={item.id} item={item} index={index} />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <UtensilsCrossed className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No hay platos disponibles en esta categoría</p>
          </motion.div>
        )}

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 py-8 border-t border-gray-800"
        >
          <p className="text-gray-400 text-sm mb-2">
            * Los precios pueden variar según temporada y disponibilidad
          </p>
          <p className="text-amber-600 font-medium">
            Para reservas: +34 965 123 456
          </p>
        </motion.div>
      </div>
    </div>
  );
}
