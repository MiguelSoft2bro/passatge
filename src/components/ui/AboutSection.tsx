
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Palette, Users, Award, Clock } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslations } from '../../lib/i18n';

export default function AboutSection() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: Palette,
      title: t.about.features.artistic.title,
      description: t.about.features.artistic.description
    },
    {
      icon: Users,
      title: t.about.features.experience.title,
      description: t.about.features.experience.description
    },
    {
      icon: Award,
      title: t.about.features.quality.title,
      description: t.about.features.quality.description
    },
    {
      icon: Clock,
      title: t.about.features.tradition.title,
      description: t.about.features.tradition.description
    }
  ];

  return (
    <section id="about" className="py-20 px-4" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
              {t.about.title} <span className="text-amber-600">{t.about.titleHighlight}</span>
            </h2>
            
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              {t.about.description1}
            </p>
            
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              {t.about.description2}
            </p>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="glass p-4 rounded-lg hover:bg-amber-700/10 transition-all duration-300"
                  >
                    <Icon className="w-8 h-8 text-amber-600 mb-3" />
                    <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="images/portada.jpg"
                alt="Interior de PASSATGE Bar"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating Card */}
         
          </motion.div>
        </div>
      </div>
    </section>
  );
}
