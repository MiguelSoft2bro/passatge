
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, UtensilsCrossed } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuItems = [
    { href: '/', label: t.nav.home, icon: Home },
    { href: '/carta', label: t.nav.menu, icon: UtensilsCrossed },
  ];

  return (
    <>
      {/* Menu Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 right-4 z-50 p-3 rounded-full glass led-glow hover:scale-110 transition-all duration-300"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 menu-overlay"
          >
            {/* Menu Content */}
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-gray-900 to-black border-l border-amber-700/30 pt-20"
            >
              <div className="flex flex-col h-full">
                {/* Logo */}
                <div className="px-8 pb-8 border-b border-gray-800">
                  <h1 className="font-playfair text-3xl font-bold text-white">
                    PASSATGE
                  </h1>
                  <p className="text-amber-600 text-sm mt-1">Bar Artístico • Alicante</p>
                  <div className="mt-4">
                    <LanguageSelector />
                  </div>
                </div>

                {/* Navigation Items */}
                <div className="flex-1 py-8">
                  {menuItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.href || 
                      (item.href.startsWith('#') && location.pathname === '/');

                    return (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {item.href.startsWith('#') ? (
                          <a
                            href={item.href}
                            className={`flex items-center px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-amber-700/10 hover:text-amber-600 ${
                              isActive ? 'text-amber-600 ' : 'text-gray-300'
                            }`}
                          >
                            <Icon className="w-6 h-6 mr-4" />
                            {item.label}
                          </a>
                        ) : (
                          <Link
                            to={item.href}
                            className={`flex items-center px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-amber-700/10 hover:text-amber-600 ${
                              isActive ? ' text-amber-600 ' : 'text-gray-300'
                            }`}
                          >
                            <Icon className="w-6 h-6 mr-4" />
                            {item.label}
                          </Link>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="px-8 py-6 border-t border-gray-800 text-center">
                  <p className="text-gray-400 text-sm">
                   C. Malaga,<br />
                    03005 Alicante 
                  </p>
                  <p className="text-amber-600 text-sm mt-2">
                    +34 96 683 68 75
                  </p>
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
