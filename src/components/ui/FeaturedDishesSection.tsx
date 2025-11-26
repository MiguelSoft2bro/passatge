import { motion } from 'framer-motion';
import { Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchMenuData } from '@/lib/api';
import type { MenuItem, MenuCategory } from '@/lib/types';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslations } from '../../lib/i18n';

export default function FeaturedDishesSection() {
  const [featuredDishes, setFeaturedDishes] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const { language, idIdioma } = useLanguage();
  const t = getTranslations(language);

  useEffect(() => {
    async function loadFeaturedDishes() {
      try {
        const { items, categories: cats } = await fetchMenuData(idIdioma);
        setCategories(cats);
        
        // Seleccionar solo los platos marcados como destacados (destacado = 1)
        const featured = items.filter(item => item.featured);
        
        setFeaturedDishes(featured);
      } catch (error) {
        console.error('Error loading featured dishes:', error);
      } finally {
        setLoading(false);
      }
    }

    loadFeaturedDishes();
  }, [idIdioma]);

  const getCategoryName = (categoryId: number) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.name || 'Especialidad';
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  if (loading) {
    return (
      <section id="carta-destacada" className="py-20" style={{ backgroundColor: '#303030' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-white">{language === 'en' ? 'Loading featured dishes...' : 'Cargando platos destacados...'}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="carta-destacada" className="py-20" style={{ backgroundColor: '#303030' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
           {t.featuredDishes.title} <span className="text-amber-600">{t.featuredDishes.titleHighlight}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
            {t.featuredDishes.description}
          </p>
        </motion.div>

        {/* Dishes Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {featuredDishes.map((dish) => (
            <motion.div
              key={dish.id}
              variants={itemVariants}
              className="rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2"
              style={{ backgroundColor: '#303030' }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-amber-800 text-white text-sm font-semibold rounded-full">
                    {getCategoryName(dish.categoryId)}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-playfair text-xl font-semibold text-white group-hover:text-amber-600 transition-colors">
                    {dish.name}
                  </h3>
                  {dish.price && (
                    <div className="flex items-center text-amber-600 font-bold text-lg ml-4">
                      {dish.price}
                    </div>
                  )}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {dish.description || 'Deliciosa especialidad de nuestra cocina mediterránea.'}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Link
            to="/carta"
            className="px-8 py-3 border-2 border-amber-600/50 text-amber-600 rounded-full font-semibold bg-amber-600 text-white transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2"
          >
            <Utensils className="w-5 h-5" />
            {t.featuredDishes.viewMenu}
          </Link>
          
          <p className="text-gray-400 text-sm mt-4">
            Descubre todos nuestros platos y bebidas especiales
          </p>
        </motion.div>
      </div>
    </section>
  );
}
