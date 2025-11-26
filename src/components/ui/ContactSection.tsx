
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react';
import { contactInfo } from '@/lib/data';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslations } from '../../lib/i18n';

export default function ContactSection() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const contactItems = [
    {
      icon: MapPin,
      title: t.contact.location,
      info: contactInfo.address,
      action: t.contact.locationAction,
      handler: () => {
        // Scroll to map section
        const mapSection = document.querySelector('.glass.rounded-2xl.overflow-hidden.h-64');
        mapSection?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      icon: Phone,
      title: t.contact.phone,
      info: contactInfo.phone,
      action: t.contact.phoneAction,
      handler: () => {
        window.open(`tel:${contactInfo.phone}`, '_self');
      }
    },
    {
      icon: Mail,
      title: 'Email',
      info: contactInfo.email,
      action: t.contact.emailAction,
      handler: () => {
        window.open(`mailto:${contactInfo.email}?subject=Consulta%20PASSATGE%20Bar&body=Hola,%20me%20gustaría%20obtener%20más%20información%20sobre...`, '_blank');
      }
    },
{
  icon: Clock,
  title: t.contact.hours,
  info: `${t.contact.weekdays}\n${t.contact.weekMar}\n${t.contact.weekends}\n${t.contact.weekDom}`,
  action: t.contact.hoursAction,
  handler: () => {
    alert(
      `${t.contact.hours}:\n\n` +
      `${t.contact.weekdays}\n` +
      `${t.contact.weekMar}\n` +
      `${t.contact.weekends}\n` +
      `${t.contact.weekDom}\n\n` +
      (language === 'es' ? '¡Te esperamos!' : 'We look forward to seeing you!')
    );
  }
}
  ];

  return (
    <section className="py-20 px-4" ref={ref} style={{ backgroundColor: '#303030' }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-4">
            {t.contact.title} <span className="text-amber-600">{t.contact.titleHighlight}</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            {language === 'es' 
              ? 'Te esperamos en el corazón artístico de Alicante para vivir una experiencia gastronómica única'
              : 'We wait for you in the artistic heart of Alicante to live a unique gastronomic experience'
            }
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
                className="glass p-6 rounded-xl text-center hover:bg-amber-600/10 transition-all duration-300 transform hover:scale-105"
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

  
        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center"
        >
          <p className="text-gray-300 mb-6">{t.contact.socialMedia}</p>
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
