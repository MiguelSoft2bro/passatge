// src/pages/CartaPage.tsx
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Loader2 } from 'lucide-react';
import type { MenuCategory } from '@/lib/types';
import { fetchMenuData } from '@/lib/api';
import CategoryCard from '@/components/ui/CategoryCard';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CartaPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t, idIdioma } = useLanguage(); // 👈 idioma dinámico

  useEffect(() => {
    let alive = true;

    async function loadMenuData() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMenuData(idIdioma); // 👈 pasamos el idioma al backend
        if (!alive) return;
        setCategories(data.categories);
      } catch (err) {
        console.error('Error loading menu data:', err);
        if (alive) setError('Error al cargar la carta. Por favor, intenta de nuevo.');
      } finally {
        if (alive) setLoading(false);
      }
    }

    loadMenuData();
    window.scrollTo(0, 0);

    return () => { alive = false; };
  }, [idIdioma]); // 👈 recarga cuando cambie el idioma

  // Categorías raíz (sin padre)
  const mainCategories = useMemo(() => {
    return categories.filter(c => !c.isSubcategory && (c.parentId === 0 || !c.parentId));
  }, [categories]);

  const handleCategoryClick = (categoryId: number) => {
    navigate(`/carta/categoria/${categoryId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-amber-600 animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Cargando carta...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <UtensilsCrossed className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-amber-800 hover:bg-amber-900 text-white rounded-full font-semibold transition-all duration-300"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="text-center mx-auto">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold text-white">
              PASSATGE
            </h1>
            <p className="text-amber-600 text-sm">{t.hero.subtitle} • San Blas , Alicante</p>
          </div>
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
              {t.menu.title} <span className="text-amber-600">{t.menu.titleHighlight}</span>
            </h2>
          </div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Selecciona una categoría para ver nuestros productos
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {mainCategories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => handleCategoryClick(category.id)}
              index={index}
            />
          ))}
        </motion.div>

        {/* Empty State */}
        {mainCategories.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <UtensilsCrossed className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No hay categorías disponibles</p>
          </motion.div>
        )}

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 py-8 border-t border-gray-800"
        >
          <p className="text-gray-400 text-sm mb-2">{t.menu.priceNote}</p>
          <p className="text-amber-600 font-medium">{t.menu.reservations}</p>
        </motion.div>
      </div>
    </div>
  );
}
