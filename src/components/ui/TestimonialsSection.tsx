import { motion } from 'framer-motion';
import { Star, Instagram, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslations } from '../../lib/i18n';

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  comment: string;
  source: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "María González",
    rating: 5,
    comment: "Excelente el servicio y la comida. El ambiente es perfecto para una cena romántica. Los platos están muy bien elaborados y el personal es muy atento.",
    source: "Google",
    date: "Hace 2 semanas"
  },
  {
    id: 2,
    name: "Carlos Ruiz",
    rating: 5,
    comment: "Platos deliciosos y presentación impecable. El tartar de atún y el risotto de bogavante son espectaculares. Volveremos seguro.",
    source: "TripAdvisor",
    date: "Hace 1 mes"
  },
  {
    id: 3,
    name: "Ana Martín",
    rating: 5,
    comment: "Una experiencia gastronómica increíble en Alicante. La relación calidad-precio es excelente y el trato del personal excepcional.",
    source: "Instagram",
    date: "Hace 3 semanas"
  },
  {
    id: 4,
    name: "Roberto Silva",
    rating: 4,
    comment: "Local muy acogedor con una carta variada y de calidad. Destacar especialmente los postres caseros. Recomendable para ocasiones especiales.",
    source: "Gastroranking",
    date: "Hace 1 semana"
  },
  {
    id: 5,
    name: "Elena Torres",
    rating: 5,
    comment: "El mejor bar gastronómico de San Blas. Cada plato es una obra de arte. El cóctel signature es una delicia y el ambiente muy sofisticado.",
    source: "Google",
    date: "Hace 5 días"
  },
  {
    id: 6,
    name: "David López",
    rating: 5,
    comment: "Perfecto para celebraciones. Atendieron perfectamente mis alergias alimentarias y adaptaron los platos sin perder calidad. Profesionalidad absoluta.",
    source: "TripAdvisor",
    date: "Hace 2 días"
  }
];

const stats = [
  { platform: "Google", rating: 4.8, reviews: 127, icon: Star },
  { platform: "TripAdvisor", rating: 4.7, reviews: 89, icon: TrendingUp },
  { platform: "Instagram", rating: 4.9, reviews: 156, icon: Instagram },
  { platform: "Gastroranking", rating: 4.6, reviews: 73, icon: Star }
];

export default function TestimonialsSection() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  
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

  return (
    <section id="testimonios" className="py-20" style={{ backgroundColor: '#303030' }}>
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
            {t.testimonials.title} <span className="text-amber-600">{t.testimonials.titleHighlight}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t.testimonials.description}
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat) => (
            <div key={stat.platform} className="rounded-lg p-6 text-center  " style={{ backgroundColor: '#D97705' , borderColor: '#D97705'  }}>
              <div className="flex justify-center mb-3">
                <stat.icon className="w-8 h-8 text-white-600" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{stat.platform}</h3>
              <div className="flex justify-center items-center gap-1 mb-2">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="text-2xl font-bold text-white-600">{stat.rating}</span>
              </div>
              <p className="text-white-400 text-sm">{stat.reviews} reseñas</p>
            </div>
          ))}
        </motion.div>

        {/* Overall Rating */}
        
        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={itemVariants}
              className="rounded-lg p-6 border border-amber-800 hover:border-amber-800/50 transition-all duration-300 relative"
              style={{ backgroundColor: '#303030' , borderColor: '#D97705' }}
            >
           
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">{testimonial.source}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-sm text-gray-400">{testimonial.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= testimonial.rating
                        ? 'text-yellow-500 fill-current'
                        : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>

              <p className="text-gray-300 text-sm leading-relaxed">
                "{testimonial.comment}"
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
           
           <a
              href="https://www.google.com/search?q=passatge+bar+gastron%C3%B3mico+alicante"
              target="_blank"
              rel="noopener noreferrer"
   
            className="px-8 py-3 border-2 border-amber-600/50 text-amber-600 rounded-full font-semibold bg-amber-600 text-white transition-all duration-300 transform hover:scale-105"
          >
           Deja tu reseña
          </a>
           
         
           
          </div>
        </motion.div>
      </div>
    </section>
  );
}
