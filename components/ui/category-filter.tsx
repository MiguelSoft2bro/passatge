
'use client';

import { motion } from 'framer-motion';
import { MenuCategory } from '@/lib/types';
import { categoryLabels } from '@/lib/data';

interface CategoryFilterProps {
  selectedCategory: MenuCategory | 'all';
  onCategoryChange: (category: MenuCategory | 'all') => void;
}

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  const categories: (MenuCategory | 'all')[] = ['all', 'entrantes', 'principales', 'postres', 'bebidas'];

  const getCategoryLabel = (category: MenuCategory | 'all'): string => {
    if (category === 'all') return 'Todos';
    return categoryLabels[category];
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category) => {
        const isActive = selectedCategory === category;
        
        return (
          <motion.button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
              isActive
                ? 'bg-amber-800 text-white shadow-lg led-glow'
                : 'glass text-gray-300 hover:bg-amber-700/20 hover:text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {getCategoryLabel(category)}
          </motion.button>
        );
      })}
    </div>
  );
}
