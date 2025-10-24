
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Palette, Users, Award, Clock } from 'lucide-react';

export default function AboutSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: Palette,
      title: 'Ambiente Artístico',
      description: 'Diseño vanguardista que fusiona arte moderno con confort sofisticado'
    },
    {
      icon: Users,
      title: 'Experiencia Única',
      description: 'Servicio personalizado en un entorno íntimo y exclusivo'
    },
    {
      icon: Award,
      title: 'Calidad Premium',
      description: 'Ingredientes seleccionados y técnicas culinarias de vanguardia'
    },
    {
      icon: Clock,
      title: 'Tradición & Innovación',
      description: 'Fusión perfecta entre tradición mediterránea e innovación gastronómica'
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
              Nuestra <span className="text-amber-600">Historia</span>
            </h2>
            
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Desde 2018, PASSATGE se ha consolidado como el epicentro de la experiencia 
              gastronómica y artística en Alicante. Nuestro bar fusiona la tradición 
              mediterránea con la innovación contemporánea, creando un espacio único donde 
              cada visita es una experiencia sensorial completa.
            </p>
            
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Situado en el corazón artístico de la ciudad, nuestro establecimiento combina 
              diseño vanguardista, iluminación LED atmosférica y una cuidada selección 
              musical que complementa perfectamente nuestra propuesta culinaria de autor.
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
              <Image
                src="/images/r128-Bar-Passatge-Cafe-image.jpeg"
                alt="Interior de PASSATGE Bar"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-6 -left-6 glass p-6 rounded-xl"
            >
              <p className="text-2xl font-bold text-white mb-1">6+</p>
              <p className="text-amber-600 text-sm">Años de Experiencia</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
