
'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';
import { contactInfo } from '@/lib/data';

export default function ContactSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const contactItems = [
    {
      icon: MapPin,
      title: 'Ubicación',
      info: contactInfo.address,
      action: 'Ver en Mapa',
      handler: () => {
        // Scroll to map section
        const mapSection = document.querySelector('.glass.rounded-2xl.overflow-hidden.h-64');
        mapSection?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      icon: Phone,
      title: 'Teléfono',
      info: contactInfo.phone,
      action: 'Llamar',
      handler: () => {
        window.open(`tel:${contactInfo.phone}`, '_self');
      }
    },
    {
      icon: Mail,
      title: 'Email',
      info: contactInfo.email,
      action: 'Escribir',
      handler: () => {
        window.open(`mailto:${contactInfo.email}?subject=Consulta%20PASSATGE%20Bar&body=Hola,%20me%20gustaría%20obtener%20más%20información%20sobre...`, '_blank');
      }
    },
    {
      icon: Clock,
      title: 'Horarios',
      info: `${contactInfo.hours.weekdays}\n${contactInfo.hours.weekends}`,
      action: 'Ver Horarios',
      handler: () => {
        alert(`Horarios de PASSATGE:\n\n${contactInfo.hours.weekdays}\n${contactInfo.hours.weekends}\n\nTe esperamos!`);
      }
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-b from-transparent to-black/30" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            Ven a <span className="text-amber-600">Visitarnos</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Te esperamos en el corazón artístico de Alicante para vivir una experiencia gastronómica única
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass p-6 rounded-xl text-center hover:bg-amber-700/10 transition-all duration-300 transform hover:scale-105"
              >
                <div className="w-16 h-16 bg-amber-800/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300 text-sm whitespace-pre-line mb-4">{item.info}</p>
                <button 
                  onClick={item.handler}
                  className="text-amber-600 hover:text-amber-400 text-sm font-medium transition-colors hover:underline"
                >
                  {item.action}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="glass rounded-2xl overflow-hidden h-64 flex items-center justify-center mb-8"
        >
          <div className="text-center">
            <MapPin className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <p className="text-white font-semibold mb-2">Calle del Arte, 15</p>
            <p className="text-gray-300">03001 Alicante, España</p>
          </div>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center"
        >
          <p className="text-gray-300 mb-6">Síguenos en redes sociales</p>
          <div className="flex justify-center gap-4">
            <button className="w-12 h-12 bg-amber-800 hover:bg-amber-900 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
              <Instagram className="w-6 h-6 text-white" />
            </button>
            <button className="w-12 h-12 bg-amber-800 hover:bg-amber-900 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
              <Facebook className="w-6 h-6 text-white" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
