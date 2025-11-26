import { motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { getTranslations } from '../../lib/i18n';
import { Star } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    nameKey: 'chef',
    roleKey: 'chefSpecialty',
    descriptionKey: 'chefDescription',
    image: "/images/121125  301C.jpg",
    specialtiesKey: 'chefSpecialties'
  },
  {
    id: 2,
    nameKey: 'manager',
    roleKey: 'managerSpecialty', 
    descriptionKey: 'managerDescription',
    image: "/images/121125  313C.jpg",
    specialtiesKey: 'managerSpecialties'
  },
  {
    id: 3,
    nameKey: 'sommelier',
    roleKey: 'sommelierSpecialty',
    descriptionKey: 'sommelierDescription',
    image: "/images/121125  322C.jpg",
    specialtiesKey: 'sommelierSpecialties'
  }
];

export default function TeamSection() {
  const { language } = useLanguage();
  const t = getTranslations(language);
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <section id="equipo" className="py-20" style={{ backgroundColor: '#303030' }}>
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
            {t.team.title} <span className="text-amber-600">{t.team.titleHighlight}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t.team.description}
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              variants={itemVariants}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl hover:shadow-amber-900/20 transition-all duration-500 hover:-translate-y-2" style={{ backgroundColor: '#303030' }}>
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={t.team[member.nameKey as keyof typeof t.team] as string}
                    className="w-full h-100 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  {/* Role Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-amber-800 text-white text-sm font-semibold rounded-full">
                      {t.team[member.roleKey as keyof typeof t.team] as string}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-amber-600 transition-colors">
                      {t.team[member.nameKey as keyof typeof t.team] as string}
                    </h3>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 text-amber-500 fill-current" />
                      ))}
                    </div>
                  </div>
{/*
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {t.team[member.descriptionKey as keyof typeof t.team] as string}
                  </p>

                  {/* Specialties 
                  <div>
                    <h4 className="text-sm font-semibold text-amber-600 mb-3 uppercase tracking-wide">
                      {t.team.specialtiesTitle}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {(t.team[member.specialtiesKey as keyof typeof t.team] as string[]).map((specialty: string) => (
                        <span
                          key={specialty}
                          className="px-3 py-1 text-gray-300 text-xs rounded-full border border-gray-700 hover:border-amber-800 transition-colors"
                          style={{ backgroundColor: '#303030' }}
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>*/}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r rounded-2xl p-8 border " style={{ backgroundColor: '#D97705', borderColor: '#D97705' }}>
            <h3 className="text-2xl font-bold text-white mb-4">
              {t.team.passionTitle}
            </h3>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
              {t.team.passionDescription}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">100%</div>
                <div className="text-white">{t.team.dedication}</div>
              </div>
              <div className="text-center">
            
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-white">{t.team.commitment}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
