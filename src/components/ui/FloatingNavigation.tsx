import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, Home, Utensils, Calendar, MessageSquare, Image, Phone, Users } from 'lucide-react';

export default function FloatingNavigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const sections = [
    { id: 'hero', label: 'Inicio', icon: Home },
    { id: 'about', label: 'Nosotros', icon: Home },
    { id: 'carta-destacada', label: 'Carta', icon: Utensils },
    { id: 'reservas', label: 'Reservas', icon: Calendar },
    { id: 'equipo', label: 'Equipo', icon: Users },
    { id: 'testimonios', label: 'Reseñas', icon: MessageSquare },
    { id: 'local', label: 'Local', icon: Image },
    { id: 'contact', label: 'Contacto', icon: Phone },
  ];

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block"
        >
          <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-full p-2 shadow-2xl">
            {/* Section Navigation */}
            <div className="flex flex-col gap-2 mb-2">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                
                return (
                  <motion.button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`group relative p-3 rounded-full transition-all duration-300 ${
                      isActive 
                        ? 'bg-amber-600 text-white' 
                        : 'hover:bg-gray-700 text-gray-400 hover:text-white'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                    
                    {/* Tooltip */}
                    <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div className="bg-gray-800 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap shadow-lg">
                        {section.label}
                        <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-l-4 border-l-gray-800 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Scroll to Top */}
            <div className="border-t border-gray-700 pt-2">
              <motion.button
                onClick={scrollToTop}
                className="p-3 rounded-full hover:bg-gray-700 text-gray-400 hover:text-white transition-all duration-300 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronUp className="w-5 h-5" />
                
                {/* Tooltip */}
                <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="bg-gray-800 text-white text-sm px-3 py-1 rounded-lg whitespace-nowrap shadow-lg">
                    Subir
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-l-4 border-l-gray-800 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                  </div>
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
