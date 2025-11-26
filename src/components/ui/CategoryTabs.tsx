import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import type { MenuCategory } from '@/lib/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface CategoryTabsProps {
  selectedCategory: number | 'all';
  onCategoryChange: (categoryId: number | 'all') => void;
  categories: MenuCategory[];
}

export default function CategoryTabs({ selectedCategory, onCategoryChange, categories }: CategoryTabsProps) {
  const { t } = useLanguage();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());
  
  // Filter main categories (those without parent or with parentId = 0)
  const mainCategories = categories.filter(category => 
    !category.isSubcategory && (category.parentId === 0 || !category.parentId)
  );
  
  // Get subcategories for a parent category
  const getSubcategories = (parentId: number) => {
    return categories.filter(category => 
      category.parentId === parentId && category.parentId !== 0
    );
  };
  
  // Toggle expanded state for a category
  const toggleCategory = (categoryId: number) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };
  
  // Check scroll state
  const checkScrollState = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollState();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollState);
      return () => container.removeEventListener('scroll', checkScrollState);
    }
  }, [mainCategories]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // For many categories, use vertical layout with collapsible sections
  if (mainCategories.length > 5) {
    return (
      <div className="mb-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-white font-medium">Categorías</h3>
          <div className="text-amber-600 text-sm">{categories.length} categorías</div>
        </div>

        {/* Vertical layout with subcategories */}
        <div className="space-y-3">
          {/* All categories */}
          <motion.button
            onClick={() => onCategoryChange('all')}
            className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-amber-800 text-white shadow-lg led-glow'
                : 'glass text-gray-300 hover:bg-amber-700/20 hover:text-white'
            }`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="font-medium">{t.menu.categories.all}</div>
          </motion.button>

          {/* Main categories with subcategories */}
          {mainCategories.map((category) => {
            const subcategories = getSubcategories(category.id);
            const hasSubcategories = subcategories.length > 0;
            const isExpanded = expandedCategories.has(category.id);
            const isActive = selectedCategory === category.id;
            
            return (
              <div key={category.id} className="space-y-2">
                {/* Main category */}
                <div className="flex">
                  <motion.button
                    onClick={() => onCategoryChange(category.id)}
                    className={`flex-1 p-4 rounded-xl text-left transition-all duration-300 ${
                      isActive
                        ? 'bg-amber-800 text-white shadow-lg led-glow'
                        : 'glass text-gray-300 hover:bg-amber-700/20 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="font-medium">{category.name}</div>
                    {hasSubcategories && (
                      <div className="text-xs text-gray-400 mt-1">
                        {subcategories.length} subcategorías
                      </div>
                    )}
                  </motion.button>
                  
                  {/* Expand button for subcategories */}
                  {hasSubcategories && (
                    <motion.button
                      onClick={() => toggleCategory(category.id)}
                      className="ml-2 p-4 glass rounded-xl hover:bg-amber-700/20 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronDown 
                        className={`w-5 h-5 text-amber-600 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`} 
                      />
                    </motion.button>
                  )}
                </div>

                {/* Subcategories */}
                <AnimatePresence>
                  {hasSubcategories && isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="ml-4 space-y-2"
                    >
                      {subcategories.map((subcategory) => {
                        const isSubActive = selectedCategory === subcategory.id;
                        
                        return (
                          <motion.button
                            key={subcategory.id}
                            onClick={() => onCategoryChange(subcategory.id)}
                            className={`w-full p-3 rounded-lg text-left transition-all duration-300 text-sm ${
                              isSubActive
                                ? 'bg-amber-700 text-white shadow-md'
                                : 'bg-white/5 text-gray-300 hover:bg-amber-700/20 hover:text-white'
                            }`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            {subcategory.name}
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // For fewer categories, use horizontal scroll layout
  return (
    <div className="mb-12 relative">
      <div className="relative overflow-hidden">
        {/* Left scroll button */}
        <AnimatePresence>
          {canScrollLeft && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 glass p-2 rounded-full shadow-lg"
            >
              <ChevronLeft className="w-5 h-5 text-amber-600" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Right scroll button */}
        <AnimatePresence>
          {canScrollRight && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 glass p-2 rounded-full shadow-lg"
            >
              <ChevronRight className="w-5 h-5 text-amber-600" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Scrollable content */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide px-8"
        >
          <div className="flex gap-3 min-w-max py-2">
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
              const subcategories = getSubcategories(category.id);
              
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
                  {subcategories.length > 0 && (
                    <span className="ml-2 text-xs opacity-70">({subcategories.length})</span>
                  )}
                </motion.button>
              );
            })}

            {/* Subcategories for horizontal layout - shown only when parent is selected or subcategory is selected */}
            {mainCategories.map((category) => {
              const subcategories = getSubcategories(category.id);
              const parentSelected = selectedCategory === category.id;
              const hasSelectedSubcategory = subcategories.some(sub => sub.id === selectedCategory);
              
              // Show subcategories if parent is selected or one of them is selected
              if (!parentSelected && !hasSelectedSubcategory) return null;
              
              return subcategories.map((subcategory) => {
                const isActive = selectedCategory === subcategory.id;
                
                return (
                  <motion.button
                    key={subcategory.id}
                    onClick={() => onCategoryChange(subcategory.id)}
                    className={`px-4 py-2 rounded-full text-sm transition-all duration-300 whitespace-nowrap border-l-2 border-amber-500/30 ${
                      isActive
                        ? 'bg-amber-700 text-white shadow-md'
                        : 'bg-white/10 text-gray-200 hover:bg-amber-700/30'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {subcategory.name}
                  </motion.button>
                );
              });
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
