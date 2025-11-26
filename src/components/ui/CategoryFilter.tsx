
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Filter } from 'lucide-react';
import type { MenuCategory } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface CategoryFilterProps {
  selectedCategory: number | 'all';
  onCategoryChange: (categoryId: number | 'all') => void;
  categories: MenuCategory[];
}

export default function CategoryFilter({ selectedCategory, onCategoryChange, categories }: CategoryFilterProps) {
  const { t } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Filter to show only main categories (not subcategories)
  const mainCategories = categories.filter(category => !category.isSubcategory);
  
  // Get selected category name for display
  const selectedCategoryName = selectedCategory === 'all' 
    ? t.menu.categories.all 
    : mainCategories.find(cat => cat.id === selectedCategory)?.name || t.menu.categories.all;

  return (
    <div className="mb-12">
      {/* Mobile/Tablet Dropdown (visible on small screens) */}
      <div className="block lg:hidden">
        <div className="relative">
          <motion.button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full glass rounded-lg px-4 py-3 flex items-center justify-between text-white font-medium"
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-amber-600" />
              <span>{selectedCategoryName}</span>
            </div>
            <ChevronDown 
              className={`w-5 h-5 text-amber-600 transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`} 
            />
          </motion.button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 bg-black/95 backdrop-blur-md rounded-lg border border-amber-800/30 shadow-xl overflow-hidden z-50"
              >
                {/* All categories option */}
                <button
                  onClick={() => {
                    onCategoryChange('all');
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left transition-colors duration-200 flex items-center gap-3 ${
                    selectedCategory === 'all'
                      ? 'bg-amber-800/30 text-amber-400'
                      : 'text-gray-300 hover:bg-amber-700/20'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  {t.menu.categories.all}
                </button>

                {/* Category options */}
                {mainCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      onCategoryChange(category.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left transition-colors duration-200 ${
                      selectedCategory === category.id
                        ? 'bg-amber-800/30 text-amber-400'
                        : 'text-gray-300 hover:bg-amber-700/20'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Desktop Horizontal Scroll (visible on large screens) */}
      <div className="hidden lg:block">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 min-w-max px-4">
            {/* All categories button */}
            <motion.button
              onClick={() => onCategoryChange('all')}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-amber-800 text-white shadow-lg led-glow'
                  : 'glass text-gray-300 hover:bg-amber-700/20 hover:text-white'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.menu.categories.all}
            </motion.button>

            {/* Category buttons */}
            {mainCategories.map((category) => {
              const isActive = selectedCategory === category.id;
              
              return (
                <motion.button
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? 'bg-amber-800 text-white shadow-lg led-glow'
                      : 'glass text-gray-300 hover:bg-amber-700/20 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.name}
                </motion.button>
              );
            })}
          </div>
        </div>
        
        {/* Gradient indicators for scroll */}
        <div className="relative -mt-12 pointer-events-none">
          <div className="absolute left-0 top-0 w-8 h-12 bg-gradient-to-r from-black to-transparent" />
          <div className="absolute right-0 top-0 w-8 h-12 bg-gradient-to-l from-black to-transparent" />
        </div>
      </div>
    </div>
  );
}
