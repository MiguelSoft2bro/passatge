
import { motion } from 'framer-motion';
import type { MenuItem } from '@/lib/types';
import { Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MenuCardProps {
  item: MenuItem;
  index: number;
}

export default function MenuCard({ item, index }: MenuCardProps) {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass rounded-xl overflow-hidden hover:bg-amber-700/10 transition-all duration-300 transform hover:scale-[1.02] group"
    >
      {/* Image */}
      {item.image && (
        <div className="relative h-48 bg-gray-800 overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          {item.featured && (
            <div className="absolute top-3 right-3">
              <div className="bg-amber-800 text-white px-2 py-1 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3" />
                <span className="text-xs font-medium">{t.menu.featured}</span>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-playfair text-xl font-semibold text-white group-hover:text-amber-600 transition-colors">
            {item.name}
          </h3>
          <div className="flex items-center text-amber-600 font-bold text-lg ml-4">
      
      <p className="whitespace-nowrap flex-shrink-0 text-right leading-none">
  {item.price} 
</p>
          </div>
        </div>
        
        <p className="text-gray-300 text-sm leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}
