// src/components/ui/ProductDetailModal.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { MenuItem } from '@/lib/types';

interface ProductDetailModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({ item, isOpen, onClose }: ProductDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Combinar imagen principal con galería
  const allImages = item
    ? [
        ...(item.image ? [item.image] : []),
        ...(item.galeria ?? []),
      ].filter(Boolean)
    : [];

  const hasMultipleImages = allImages.length > 1;

  // Reset al cambiar de producto
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [item?.id]);

  // Cerrar con ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  if (!item) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="grid md:grid-cols-2">
                {/* Image Gallery */}
                <div className="relative bg-black aspect-square md:aspect-auto">
                  {allImages.length > 0 ? (
                    <>
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentImageIndex}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          src={allImages[currentImageIndex]}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </AnimatePresence>

                      {/* Navigation arrows */}
                      {hasMultipleImages && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                            aria-label="Imagen anterior"
                          >
                            <ChevronLeft className="w-6 h-6" />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                            aria-label="Siguiente imagen"
                          >
                            <ChevronRight className="w-6 h-6" />
                          </button>
                        </>
                      )}

                      {/* Image counter */}
                      {hasMultipleImages && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/70 rounded-full text-white text-sm">
                          {currentImageIndex + 1} / {allImages.length}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      <span>Sin imagen</span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-8 flex flex-col">
                  <div className="flex-1">
                    {/* Title */}
                    <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
                      {item.name}
                    </h2>

                    {/* Featured badge */}
                    {item.featured && (
                      <span className="inline-block px-3 py-1 bg-amber-900/30 text-amber-500 text-xs rounded-full border border-amber-800/50 mb-4">
                        Destacado
                      </span>
                    )}

                    {/* Description */}
                    {item.description && (
                      <p className="text-gray-300 text-base leading-relaxed mb-6">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Price */}
                  <div className="pt-6 border-t border-gray-800">
                    <div className="flex items-baseline justify-between">
                      <span className="text-gray-400 text-sm">Precio</span>
                      <span className="font-playfair text-3xl font-bold text-amber-600">
                        {item.price}
                      </span>
                    </div>
                  </div>

                  {/* Thumbnail Gallery */}
                  {hasMultipleImages && (
                    <div className="mt-6 pt-6 border-t border-gray-800">
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {allImages.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                              idx === currentImageIndex
                                ? 'border-amber-600 ring-2 ring-amber-600/30'
                                : 'border-gray-700 hover:border-gray-600'
                            }`}
                          >
                            <img
                              src={img}
                              alt={`${item.name} - ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
