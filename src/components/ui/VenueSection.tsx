import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslations } from '../../lib/i18n';

const galleryImages = [
  {
    src: '/images/portada.jpg',
    alt: 'Interior elegante del restaurante',
    title: 'Ambiente Sofisticado',
    description: 'Disfruta de nuestro interior elegante y acogedor'
  },
  {
    src: '/images/051125  103C.jpg',
    alt: 'Barra principal y coctelería',
    title: 'Barra Premium',
    description: 'Nuestra barra con selección premium de bebidas'
  },
  {
    src: '/images/301025  015C.jpg',
    alt: 'Zona de comedor principal',
    title: 'Reservado',
    description: 'Espacio amplio y cómodo para tus cenas especiales'
  },
  {
    src: '/images/301025  031C.jpg',
    alt: 'Pequeños placeres',
    title: 'Pequeños placeres',
    description: 'Disfruta de nuestros apertivos'
  },
  {
    src: '/images/201125  410C.jpg',
    alt: 'Vista general del local',
    title: 'Vista General',
    description: 'Conoce cada rincón de nuestro espacio gastronómico'
  },
  {
    src: '/images/preparando-un-coctel-en-un-bar.jpg',
    alt: 'Cocina abierta',
    title: 'Vista General',
    description: 'Conoce cada rincón de nuestro espacio gastronómico'
  }
  ,
    {
    src: '/images/201125  407C.jpg',
    alt: 'Comedor',
    title: 'Terraza Exterior',
    description: 'Conoce cada rincón de nuestro espacio gastronómico'
  },
  {
    src: '/images/201125  403C.jpg',
    alt: 'Vista general del local',
    title: 'Vista General',
    description: 'Conoce cada rincón de nuestro espacio gastronómico'
  },
    {
    src: '/images/201125  417C2.jpg',
    alt: 'Cocina abierta',
    title: 'Vista General',
    description: 'Conoce cada rincón de nuestro espacio gastronómico'
  }
];

export default function VenueSection() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section className="py-20" style={{ backgroundColor: '#303030' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center items-center gap-3 mb-4">
            
          </div>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
            {t.venue.title} <span className="text-amber-600">{t.venue.titleHighlight}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            {t.venue.description}
          </p>
          
        
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-amber-900/20 transition-all duration-500"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">
                    {image.title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {image.description}
                  </p>
                </div>
              </div>

              {/* Always visible title 
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-sm font-medium rounded-full">
                  {image.title}
                </span>
              </div>*/}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
