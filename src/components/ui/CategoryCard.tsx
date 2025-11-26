import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import type { MenuCategory } from '@/lib/types';

interface CategoryCardProps {
  category: MenuCategory;
  onClick: () => void;
  index: number;
}

export default function CategoryCard({ category, onClick, index }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <motion.button
        onClick={onClick}
        className="relative w-full p-6 glass rounded-xl text-left transition-all duration-300 hover:bg-amber-700/20 hover:scale-105 group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-amber-300 transition-colors">
              {category.name}
            </h3>
            <p className="text-gray-400 text-sm">
              Ver productos de esta categoría
            </p>
          </div>
          
          <div className="flex items-center">
            <motion.div
              className="p-2 rounded-full bg-amber-800/20 group-hover:bg-amber-800/40 transition-colors"
              whileHover={{ scale: 1.1 }}
            >
              <ChevronRight className="w-5 h-5 text-amber-600 group-hover:text-amber-400 transition-colors" />
            </motion.div>
          </div>
        </div>
        
        {/* Optional: Add a subtle gradient border effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </motion.button>
    </motion.div>
  );
}
