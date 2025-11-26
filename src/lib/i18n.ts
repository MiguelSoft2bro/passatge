
export type Language = 'es' | 'en';

export interface Translation {
  nav: {
    home: string;
    menu: string;
    contact: string;
    location: string;
  };
  hero: {
    title: string;
    subtitle: string;
    description: string;
    viewMenu: string;
    learnMore: string;
  };
  about: {
    title: string;
    titleHighlight: string;
    description1: string;
    description2: string;
    features: {
      artistic: {
        title: string;
        description: string;
      };
      experience: {
        title: string;
        description: string;
      };
      quality: {
        title: string;
        description: string;
      };
      tradition: {
        title: string;
        description: string;
      };
    };
    yearsExperience: string;
  };
  menu: {
    title: string;
    titleHighlight: string;
    description: string;
    categories: {
      all: string;
      entrantes: string;
      principales: string;
      postres: string;
      bebidas: string;
    };
    featured: string;
    backToHome: string;
    noItems: string;
    priceNote: string;
    reservations: string;
  };
  contact: {
    title: string;
    titleHighlight: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
    weekdays: string;
     weekMar: string;
    weekends: string;
    weekDom: string;
    closed: string;
    socialMedia: string;
    location: string;
    phoneAction: string;
    emailAction: string;
    hoursAction: string;
    locationAction: string;
  };
  gallery: {
    title: string;
    titleHighlight: string;
    description: string;
  };
  footer: {
    address: string;
    phone: string;
    copyright: string;
    cookies: string;
    privacy: string;
  };
  reservations: {
    title: string;
    titleHighlight: string;
    description: string;
    callUs: string;
    whatsappReserve: string;
    callToReserve: string;
    hoursNote: string;
  };
  team: {
    title: string;
    titleHighlight: string;
    description: string;
    chef: string;
    manager: string;
    sommelier: string;
    chefSpecialty: string;
    managerSpecialty: string;
    sommelierSpecialty: string;
    chefDescription: string;
    managerDescription: string;
    sommelierDescription: string;
    chefSpecialties: string[];
    managerSpecialties: string[];
    sommelierSpecialties: string[];
    specialtiesTitle: string;
    passionTitle: string;
    passionDescription: string;
    experienceYears: string;
    dedication: string;
    commitment: string;
  };
  testimonials: {
    title: string;
    titleHighlight: string;
    description: string;
  };
  venue: {
    title: string;
    titleHighlight: string;
    description: string;
  };
  featuredDishes: {
    title: string;
    titleHighlight: string;
    description: string;
    viewMenu: string;
  };
  cookies: {
    title: string;
    description: string;
    accept: string;
    reject: string;
    learnMore: string;
    bannerText: string;
  };
}

export const translations: Record<Language, Translation> = {
  es: {
    nav: {
      home: 'Inicio',
      menu: 'Nuestra Carta',
      contact: 'Contacto',
      location: 'Ubicación'
    },
    hero: {
      title: 'PASSATGE',
      subtitle: 'Bar Gastronómico',
      description: 'Experiencia culinaria única en el corazón de Alicante. Donde el arte se encuentra con la gastronomía en un ambiente sofisticado y moderno.',
      viewMenu: 'Ver Nuestra Carta',
      learnMore: 'Reservar Mesa'
    },
    about: {
      title: 'Nuestra',
      titleHighlight: 'Historia',
      description1: 'Desde 2018, PASSATGE se ha consolidado como el epicentro de la experiencia gastronómica y artística en Alicante. Nuestro bar fusiona la tradición mediterránea con la innovación contemporánea, creando un espacio único donde cada visita es una experiencia sensorial completa.',
      description2: 'Situado en el corazón artístico de la ciudad, nuestro establecimiento combina diseño vanguardista, iluminación LED atmosférica y una cuidada selección musical que complementa perfectamente nuestra propuesta culinaria de autor.',
      features: {
        artistic: {
          title: 'Ambiente Artístico',
          description: 'Diseño vanguardista que fusiona arte moderno con confort sofisticado'
        },
        experience: {
          title: 'Experiencia Única',
          description: 'Servicio personalizado en un entorno íntimo y exclusivo'
        },
        quality: {
          title: 'Calidad Premium',
          description: 'Ingredientes seleccionados y técnicas culinarias de vanguardia'
        },
        tradition: {
          title: 'Tradición & Innovación',
          description: 'Fusión perfecta entre tradición mediterránea e innovación gastronómica'
        }
      },
      yearsExperience: 'Años de Experiencia'
    },
    menu: {
      title: 'Nuestra',
      titleHighlight: 'Carta',
      description: 'Descubre nuestra selección de platos de autor, elaborados con ingredientes de máxima calidad y presentados en un ambiente único y sofisticado.',
      categories: {
        all: 'Todo',
        entrantes: 'Entrantes',
        principales: 'Principales',
        postres: 'Postres',
        bebidas: 'Bebidas'
      },
      featured: 'Destacado',
      backToHome: 'Volver al Inicio',
      noItems: 'No hay platos disponibles en esta categoría',
      priceNote: '* Los precios pueden variar según temporada y disponibilidad',
      reservations: 'Para reservas: +34 96 683 6875'
    },
    contact: {
      title: 'Visítanos',
      titleHighlight: 'En Alicante',
      address: 'C. Malaga, 03005 Alicante (San Blas)',
      phone: '+34 96 683 6875',
      email: 'info@passatgebar.com',
      hours: 'Horarios',
      weekdays: 'Martes: 17:00 - 01:00',
      weekMar: 'Miércoles - Jueves: 12:30 - 01:00',
      weekends: 'Viernes-Sábado: 12:30 - 02:30',
      weekDom: 'Domingo: 12:30 - 01:00',
      closed: 'Lunes: Cerrado',
      socialMedia: 'Síguenos en redes sociales',
      location: 'Ubicación',
      phoneAction: 'Llamar',
      emailAction: 'Escribir',
      hoursAction: 'Ver Horarios',
      locationAction: 'Ver en Mapa'
    },
    gallery: {
      title: 'Nuestra',
      titleHighlight: 'Gastronomía',
      description: 'Una selección de nuestros platos más destacados, donde cada creación es una obra de arte culinaria.'
    },
    footer: {
      address: 'C. Malaga, 03005 Alicante (San Blas)',
      phone: '+34 96 683 6875',
      copyright: '© 2025 Passatgebar | siminfo.es',
      cookies: 'Cookies',
      privacy: 'Política de Privacidad'
    },
    reservations: {
      title: 'Reserva',
      titleHighlight: 'Hoy',
      description: 'Asegura tu lugar en PASSATGE. Te ofrecemos una experiencia culinaria única en San Blas, Alicante. Reserva ahora y disfruta de nuestra gastronomía en un ambiente sofisticado y acogedor.',
      callUs: 'Llámanos',
      whatsappReserve: 'Reservar por WhatsApp',
      callToReserve: 'Llama para Reservar',
      hoursNote: '* Recomendamos reservar con antelación, especialmente fines de semana'
    },
    team: {
      title: 'Nuestro',
      titleHighlight: 'Equipo',
      description: 'Conoce al talentoso equipo que hace posible la experiencia única de PASSATGE. Cada miembro aporta su pasión y expertise para crear momentos memorables.',
      chef: 'Asier',
      manager: 'Ruth', 
      sommelier: 'Jackie',
      chefSpecialty: 'Chef',
      managerSpecialty: 'Encargada',
      sommelierSpecialty: 'Cocinera',
      chefDescription: 'Con más de 15 años de experiencia en alta cocina Argentina, Asier lidera nuestro equipo culinario con pasión y creatividad, fusionando técnicas tradicionales con innovación gastronómica.',
      managerDescription: 'Experta en vinos y maridajes, Ruth se encarga de crear experiencias únicas para cada cliente y gestionar la excelencia del servicio con conocimiento y profesionalidad.',
      sommelierDescription: 'Responsable de que cada visita sea memorable, Jackie coordina el equipo de sala con atención al detalle y calidez humana, asegurando que cada cliente se sienta especial.',
      chefSpecialties: ['Cocina Argentina', 'Maridajes', 'Productos Locales', 'Alta Gastronomía'],
      managerSpecialties: ['Enología', 'Maridajes', 'Gestión de Sala', 'Servicio al Cliente'],
      sommelierSpecialties: ['Atención al Cliente', 'Protocolos', 'Cócteles', 'Hospitalidad'],
      specialtiesTitle: 'Especialidades',
      passionTitle: 'Pasión por la Excelencia',
      passionDescription: 'Nuestro equipo está formado por profesionales apasionados que comparten una visión común: ofrecer experiencias gastronómicas memorables. Cada miembro aporta su experiencia y dedicación para hacer de tu visita algo especial.',
      experienceYears: 'Años de Experiencia',
      dedication: 'Dedicación al Cliente',
      commitment: 'Compromiso con la Calidad'
    },
    testimonials: {
      title: 'Lo que dicen',
      titleHighlight: 'Nuestros Clientes',
      description: 'La experiencia de nuestros clientes es nuestra mejor carta de presentación. Descubre por qué PASSATGE se ha convertido en el lugar favorito de Alicante.'
    },
    venue: {
      title: 'Nuestro',
      titleHighlight: 'Espacio',
      description: 'Un ambiente único que combina diseño contemporáneo con la calidez mediterránea. Cada rincón de PASSATGE está pensado para crear la experiencia perfecta.'
    },
    featuredDishes: {
      title: 'Platos',
      titleHighlight: 'Destacados',
      description: 'Descubre nuestra selección de creaciones culinarias más populares. Cada plato es una obra de arte que combina sabores tradicionales con técnicas innovadoras.',
      viewMenu: 'Ver Carta Completa'
    },
    cookies: {
      title: 'Política de Cookies',
      description: 'En PASSATGE no utilizamos cookies de seguimiento ni recabamos información personal. Solo utilizamos cookies técnicas esenciales para el funcionamiento básico del sitio web.',
      accept: 'Aceptar',
      reject: 'Rechazar',
      learnMore: 'Más información',
      bannerText: 'Este sitio web utiliza cookies técnicas esenciales para su funcionamiento. No recabamos información personal.'
    }
  },
  en: {
    nav: {
      home: 'Home',
      menu: 'Our Menu',
      contact: 'Contact',
      location: 'Location'
    },
    hero: {
      title: 'PASSATGE',
      subtitle: 'Artistic Bar & Gastronomy',
      description: 'Unique culinary experience in the heart of Alicante. Where art meets gastronomy in a sophisticated and modern atmosphere.',
      viewMenu: 'View Our Menu',
      learnMore: 'Book Table'
    },
    about: {
      title: 'Our',
      titleHighlight: 'Story',
      description1: 'Since 2018, PASSATGE has established itself as the epicenter of gastronomic and artistic experience in Alicante. Our bar fuses Mediterranean tradition with contemporary innovation, creating a unique space where each visit is a complete sensory experience.',
      description2: 'Located in the artistic heart of the city, our establishment combines avant-garde design, atmospheric LED lighting and a carefully selected musical selection that perfectly complements our signature culinary proposal.',
      features: {
        artistic: {
          title: 'Artistic Atmosphere',
          description: 'Avant-garde design that fuses modern art with sophisticated comfort'
        },
        experience: {
          title: 'Unique Experience',
          description: 'Personalized service in an intimate and exclusive environment'
        },
        quality: {
          title: 'Premium Quality',
          description: 'Selected ingredients and cutting-edge culinary techniques'
        },
        tradition: {
          title: 'Tradition & Innovation',
          description: 'Perfect fusion between Mediterranean tradition and gastronomic innovation'
        }
      },
      yearsExperience: 'Years of Experience'
    },
    menu: {
      title: 'Our',
      titleHighlight: 'Menu',
      description: 'Discover our selection of signature dishes, crafted with the highest quality ingredients and presented in a unique and sophisticated atmosphere.',
      categories: {
        all: 'All',
        entrantes: 'Starters',
        principales: 'Main Courses',
        postres: 'Desserts',
        bebidas: 'Drinks'
      },
      featured: 'Featured',
      backToHome: 'Back to Home',
      noItems: 'No dishes available in this category',
      priceNote: '* Prices may vary according to season and availability',
      reservations: 'For reservations: +34 96 683 6875'
    },
    contact: {
      title: 'Visit Us',
      titleHighlight: 'In Alicante',
      address: 'C. Malaga, 03005 Alicante (San Blas)',
      phone: '+34 96 683 6875',
      email: 'info@passatgebar.com',
      hours: 'Opening Hours',
 weekdays: 'Tuesday: 17:00 - 01:00',
weekMar: 'Wednesday - Thursday: 12:30 - 01:00',
weekends: 'Friday - Saturday: 12:30 - 02:30',
weekDom: 'Sunday: 12:30 - 01:00',

      closed: 'Monday: Closed',
      socialMedia: 'Follow us on social media',
      location: 'Location',
      phoneAction: 'Call',
      emailAction: 'Email',
      hoursAction: 'View Hours',
      locationAction: 'View on Map'
    },
    gallery: {
      title: 'Our',
      titleHighlight: 'Gastronomy',
      description: 'A selection of our most outstanding dishes, where each creation is a work of culinary art.'
    },
    footer: {
      address: 'C. Malaga, 03005 Alicante (San Blas)',
      phone: '+34 96 683 6875',
      copyright: '© 2025 Passatgebar | siminfo.es',
      cookies: 'Cookies',
      privacy: 'Privacy Policy'
    },
    reservations: {
      title: 'Book',
      titleHighlight: 'Today',
      description: 'Secure your place at PASSATGE. We offer you a unique culinary experience in San Blas, Alicante. Book now and enjoy our gastronomy in a sophisticated and welcoming atmosphere.',
      callUs: 'Call Us',
      whatsappReserve: 'Reserve via WhatsApp',
      callToReserve: 'Call to Reserve',
      hoursNote: '* We recommend booking in advance, especially on weekends'
    },
    team: {
      title: 'Our',
      titleHighlight: 'Team',
      description: 'Meet the talented team that makes the unique PASSATGE experience possible. Each member brings their passion and expertise to create memorable moments.',
      chef: 'Asier',
      manager: 'Ruth',
      sommelier: 'Jackie',
      chefSpecialty: 'Chef',
      managerSpecialty: 'Manager',
      sommelierSpecialty: 'Chef',
      chefDescription: 'With more than 15 years of experience in high-end Argentine cuisine, Asier leads our culinary team with passion and creativity, fusing traditional techniques with gastronomic innovation.',
      managerDescription: 'Expert in wines and pairings, Ruth is responsible for creating unique experiences for each client and managing service excellence with knowledge and professionalism.',
      sommelierDescription: 'Responsible for making each visit memorable, Jackie coordinates the service team with attention to detail and human warmth, ensuring that each client feels special.',
      chefSpecialties: ['Argentine Cuisine', 'Pairings', 'Local Products', 'Fine Dining'],
      managerSpecialties: ['Oenology', 'Wine Pairings', 'Service Management', 'Customer Service'],
      sommelierSpecialties: ['Customer Care', 'Protocols', 'Cocktails', 'Hospitality'],
      specialtiesTitle: 'Specialties',
      passionTitle: 'Passion for Excellence',
      passionDescription: 'Our team is made up of passionate professionals who share a common vision: to offer memorable gastronomic experiences. Each member contributes their experience and dedication to make your visit something special.',
      experienceYears: 'Years of Experience',
      dedication: 'Customer Dedication',
      commitment: 'Commitment to Quality'
    },
    testimonials: {
      title: 'What Our',
      titleHighlight: 'Customers Say',
      description: 'Our customers\' experience is our best calling card. Discover why PASSATGE has become Alicante\'s favorite place.'
    },
    venue: {
      title: 'Our',
      titleHighlight: 'Space',
      description: 'A unique atmosphere that combines contemporary design with Mediterranean warmth. Every corner of PASSATGE is designed to create the perfect experience.'
    },
    featuredDishes: {
      title: 'Featured',
      titleHighlight: 'Dishes',
      description: 'Discover our selection of most popular culinary creations. Each dish is a work of art that combines traditional flavors with innovative techniques.',
      viewMenu: 'View Full Menu'
    },
    cookies: {
      title: 'Cookie Policy',
      description: 'At PASSATGE we do not use tracking cookies or collect personal information. We only use essential technical cookies for the basic functioning of the website.',
      accept: 'Accept',
      reject: 'Reject',
      learnMore: 'Learn more',
      bannerText: 'This website uses essential technical cookies for its operation. We do not collect personal information.'
    }
  }
};

export function getTranslations(language: Language): Translation {
  return translations[language];
}
