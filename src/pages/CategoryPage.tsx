// src/pages/CategoryPage.tsx
import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Loader2, ArrowLeft } from 'lucide-react';
import type { MenuItem, MenuCategory } from '@/lib/types';
import { fetchMenuData, getItemsByCategory } from '@/lib/api';
import MenuCard from '@/components/ui/MenuCard';
import ProductDetailModal from '../components/ui/ProductDetailModal';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();

  const { t, idIdioma } = useLanguage(); // 👈 usamos idIdioma del contexto

  const [selectedCategory, setSelectedCategory] = useState<number>(
    Number.isFinite(parseInt(categoryId || '0')) ? parseInt(categoryId || '0') : 0
  );
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleOpenModal = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Esperar a que termine la animación de salida antes de limpiar
    setTimeout(() => setSelectedItem(null), 300);
  };

  // Sincroniza selectedCategory cuando cambie la URL
  useEffect(() => {
    if (categoryId) {
      const id = parseInt(categoryId);
      if (Number.isFinite(id)) {
        setSelectedCategory(id);
      } else {
        setSelectedCategory(0);
      }
      window.scrollTo(0, 0);
    }
  }, [categoryId]);

  // Carga carta cuando cambie el idioma o al entrar
  useEffect(() => {
    let alive = true;
    async function loadMenuData() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMenuData(idIdioma); // 👈 pasamos idioma al backend
        if (!alive) return;
        setMenuItems(data.items);
        setCategories(data.categories);

        // Si la categoría seleccionada ya no existe con este idioma, cae a la primera raíz
        const exists = data.categories.some(c => c.id === selectedCategory);
        if (!exists) {
          const firstRoot = data.categories.find(c => !c.isSubcategory && (c.parentId === 0 || !c.parentId));
          if (firstRoot) {
            setSelectedCategory(firstRoot.id);
            // no navegamos forzosamente para no romper el back; si quieres, descomenta:
            // navigate(`/carta/categoria/${firstRoot.id}`, { replace: true });
          }
        }
      } catch (err) {
        console.error('Error loading menu data:', err);
        if (alive) setError('Error al cargar la carta. Por favor, intenta de nuevo.');
      } finally {
        if (alive) setLoading(false);
      }
    }
    loadMenuData();
    return () => { alive = false; };
    // Re-carga cuando cambie el idioma
  }, [idIdioma]); // 👈 dependemos del idioma

  // Categorías raíz (sin padre)
  const mainCategories = useMemo(() => {
    return categories.filter(category =>
      !category.isSubcategory && (category.parentId === 0 || !category.parentId)
    );
  }, [categories]);

const filteredItems = useMemo(() => {
  const itemsByCat = getItemsByCategory(menuItems, categories, selectedCategory);

  // Ordenar: primero los que tienen imagen propia, luego los de imagen por defecto
  return [...itemsByCat].sort((a, b) => {
    const aHas = a.hasCustomImage ? 1 : 0;
    const bHas = b.hasCustomImage ? 1 : 0;

    // bHas - aHas => los que tienen imagen (1) quedan antes que los que no (0)
    return bHas - aHas;
  });
}, [menuItems, categories, selectedCategory]);

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
    navigate(`/carta/categoria/${categoryId}`);
  };

  // Auto-scroll al chip activo
  useEffect(() => {
    if (scrollContainerRef.current && categories.length > 0) {
      const container = scrollContainerRef.current;
      const activeButton = container.querySelector(`[data-category-id="${selectedCategory}"]`) as HTMLElement;

      if (activeButton) {
        const containerRect = container.getBoundingClientRect();
        const buttonRect = activeButton.getBoundingClientRect();
        const scrollLeft = container.scrollLeft;

        const isVisible = buttonRect.left >= containerRect.left && buttonRect.right <= containerRect.right;

        if (!isVisible) {
          const targetScrollLeft =
            scrollLeft +
            buttonRect.left -
            containerRect.left -
            containerRect.width / 2 +
            buttonRect.width / 2;

          container.scrollTo({
            left: targetScrollLeft,
            behavior: 'smooth',
          });
        }
      }
    }
  }, [selectedCategory, categories]);

  // Estado de scroll para los gradientes
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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
        {/* Header con botón atrás */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center mb-8"
        >
          <button
            onClick={() => navigate('/carta')}
            className="absolute left-4 flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="text-center">
            <h1 className="font-playfair text-2xl md:text-3xl font-bold text-white">PASSATGE</h1>
        <p className="text-amber-600 text-sm">{t.hero.subtitle} • San Blas , Alicante</p>
          </div>
        </motion.div>

        {/* Carrusel horizontal de categorías */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <div className="relative overflow-hidden">
            {canScrollLeft && (
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-900 via-gray-900/50 to-transparent z-10 pointer-events-none" />
            )}
            {canScrollRight && (
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-900 via-gray-900/50 to-transparent z-10 pointer-events-none" />
            )}

            <div
              ref={scrollContainerRef}
              className="overflow-x-auto scrollbar-hide px-6 cursor-grab active:cursor-grabbing"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              <div className="flex gap-2 min-w-max py-3">
                {mainCategories.map((category, index) => {
                  const isActive = selectedCategory === category.id;

                  return (
                    <motion.button
                      key={category.id}
                      data-category-id={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap text-xs ${
                        isActive
                          ? 'bg-amber-800 text-white shadow-lg led-glow'
                          : 'glass text-gray-300 hover:bg-amber-700/20 hover:text-white'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        marginLeft: index === 0 ? '0' : undefined,
                        marginRight: index === mainCategories.length - 1 ? '0' : undefined,
                      }}
                    >
                      {category.name}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="text-center mt-2">
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 2, duration: 1 }}
              className="inline-block text-xs text-white bg-black/70 px-3 py-1 rounded-full"
            >
              Desliza →
            </motion.div>
          </div>
        </motion.div>

        {/* Grid de platos */}
        <motion.div
          key={`${selectedCategory}-${idIdioma}`} // 👈 re-render limpio al cambiar idioma
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleOpenModal(item)}
              className="cursor-pointer"
            >
              <MenuCard 
                item={item} 
                index={index} 
              />
            </div>
          ))}
        </motion.div>

        {/* Vacío */}
        {filteredItems.length === 0 && !loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <UtensilsCrossed className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No hay artículos en esta categoría</p>
          </motion.div>
        )}

        {/* Nota pie */}
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

      {/* Product Detail Modal */}
      <ProductDetailModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
