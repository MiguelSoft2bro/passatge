import { motion } from 'framer-motion';
import { Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslations } from '../../lib/i18n';

export default function ReservationSection() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  
  const phoneNumber = "+34 96 683 6875";
  const whatsappNumber = "34966836875";
  const whatsappMessage = "Hola, me gustaría hacer una reserva en PASSATGE Bar Gastronómico. ¿Podrían ayudarme con la disponibilidad?";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <section id="reservas" className="py-20" style={{ backgroundColor: '#232323' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-white mb-6">
              {t.reservations.title} <span className="text-amber-600">{t.reservations.titleHighlight}</span>
            </h2>
            
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              {t.reservations.description}
            </p>

            <div className="space-y-6">
              {/* Phone Section */}
              <div className="flex items-center gap-4">
                <div className="p-3 bg-amber-600 rounded-full">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">{t.reservations.callUs}</h3>
                  <p className="text-amber-600 font-semibold text-lg">{t.contact.phone}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleWhatsAppClick}
                  className="px-8 py-3 border-2 border-amber-600/50 text-amber-600 rounded-full font-semibold bg-amber-600 text-white transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t.reservations.whatsappReserve}
                </button>

                <button
                  onClick={handlePhoneClick}
                  className="px-8 py-3 border-2 border-amber-600/50 text-amber-600 rounded-full font-semibold bg-amber-600 text-white transition-all duration-300 transform hover:scale-105"
                >
                  {t.reservations.callToReserve}
                </button>
              </div>

              <div className="mt-8 p-6 rounded-lg border border-gray-800" style={{ backgroundColor: '#404040' }}>
                <h4 className="text-lg font-semibold text-white mb-2">{t.contact.hours}</h4>
                <div className="text-gray-300 space-y-1">
                  <p><span className="font-medium">{t.contact.weekdays}</span></p>
                  <p><span className="font-medium">{t.contact.weekMar}</span></p>
                  <p><span className="font-medium">{t.contact.weekends}</span></p>
                  <p><span className="font-medium">{t.contact.weekDom}</span></p>
                  <p className="text-sm text-amber-400"><span className="font-medium">{t.contact.closed}</span></p>
                  <p className="text-sm text-gray-400 mt-3">
                     {t.reservations.hoursNote}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <img
                src="/images/301025  045C2.jpg"
                alt="Interior de PASSATGE Bar"
                className="w-full h-[600px] object-cover rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
