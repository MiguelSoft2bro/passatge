
export type Language = 'es' | 'en' | 'va';

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
    weekends: string;
  };
  gallery: {
    title: string;
    titleHighlight: string;
    description: string;
  };
  footer: {
    address: string;
    phone: string;
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
      subtitle: 'Bar  Gastronómico',
      description: 'Experiencia culinaria única en el corazón de Alicante. Donde el arte se encuentra con la gastronomía en un ambiente sofisticado y moderno.',
      viewMenu: 'Ver Nuestra Carta',
      learnMore: 'Conoce Más'
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
      reservations: 'Para reservas: +34 965 123 456'
    },
    contact: {
      title: 'Visítanos',
      titleHighlight: 'En Alicante',
      address: 'Calle del Arte, 15, 03001 Alicante',
      phone: '+34 965 123 456',
      email: 'info@passatgebar.com',
      hours: 'Horarios',
      weekdays: 'L-J: 18:00 - 02:00',
      weekends: 'V-D: 18:00 - 03:00'
    },
    gallery: {
      title: 'Nuestra',
      titleHighlight: 'Gastronomía',
      description: 'Una selección de nuestros platos más destacados, donde cada creación es una obra de arte culinaria.'
    },
    footer: {
      address: 'Calle del Arte, 15, 03001 Alicante',
      phone: '+34 965 123 456'
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
      learnMore: 'Learn More'
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
      reservations: 'For reservations: +34 965 123 456'
    },
    contact: {
      title: 'Visit Us',
      titleHighlight: 'In Alicante',
      address: 'Calle del Arte, 15, 03001 Alicante',
      phone: '+34 965 123 456',
      email: 'info@passatgebar.com',
      hours: 'Opening Hours',
      weekdays: 'Mon-Thu: 6:00 PM - 2:00 AM',
      weekends: 'Fri-Sun: 6:00 PM - 3:00 AM'
    },
    gallery: {
      title: 'Our',
      titleHighlight: 'Gastronomy',
      description: 'A selection of our most outstanding dishes, where each creation is a work of culinary art.'
    },
    footer: {
      address: 'Calle del Arte, 15, 03001 Alicante',
      phone: '+34 965 123 456'
    }
  },
  va: {
    nav: {
      home: 'Inici',
      menu: 'La Nostra Carta',
      contact: 'Contacte',
      location: 'Ubicació'
    },
    hero: {
      title: 'PASSATGE',
      subtitle: 'Bar Artístic & Gastronòmic',
      description: 'Experiència culinària única en el cor d\'Alacant. On l\'art es troba amb la gastronomia en un ambient sofisticat i modern.',
      viewMenu: 'Veure la Nostra Carta',
      learnMore: 'Coneix Més'
    },
    about: {
      title: 'La Nostra',
      titleHighlight: 'Història',
      description1: 'Des de 2018, PASSATGE s\'ha consolidat com l\'epicentre de l\'experiència gastronòmica i artística a Alacant. El nostre bar fusiona la tradició mediterrània amb la innovació contemporània, creant un espai únic on cada visita és una experiència sensorial completa.',
      description2: 'Situat en el cor artístic de la ciutat, el nostre establiment combina disseny d\'avantguarda, il·luminació LED atmosfèrica i una cuidada selecció musical que complementa perfectament la nostra proposta culinària d\'autor.',
      features: {
        artistic: {
          title: 'Ambient Artístic',
          description: 'Disseny d\'avantguarda que fusiona art modern amb confort sofisticat'
        },
        experience: {
          title: 'Experiència Única',
          description: 'Servei personalitzat en un entorn íntim i exclusiu'
        },
        quality: {
          title: 'Qualitat Premium',
          description: 'Ingredients seleccionats i tècniques culinàries d\'avantguarda'
        },
        tradition: {
          title: 'Tradició & Innovació',
          description: 'Fusió perfecta entre tradició mediterrània i innovació gastronòmica'
        }
      },
      yearsExperience: 'Anys d\'Experiència'
    },
    menu: {
      title: 'La Nostra',
      titleHighlight: 'Carta',
      description: 'Descobreix la nostra selecció de plats d\'autor, elaborats amb ingredients de màxima qualitat i presentats en un ambient únic i sofisticat.',
      categories: {
        all: 'Tot',
        entrantes: 'Entrants',
        principales: 'Principals',
        postres: 'Postres',
        bebidas: 'Begudes'
      },
      featured: 'Destacat',
      backToHome: 'Tornar a l\'Inici',
      noItems: 'No hi ha plats disponibles en aquesta categoria',
      priceNote: '* Els preus poden variar segons la temporada i la disponibilitat',
      reservations: 'Per a reserves: +34 965 123 456'
    },
    contact: {
      title: 'Visita\'ns',
      titleHighlight: 'A Alacant',
      address: 'Carrer de l\'Art, 15, 03001 Alacant',
      phone: '+34 965 123 456',
      email: 'info@passatgebar.com',
      hours: 'Horaris',
      weekdays: 'Dl-Dj: 18:00 - 02:00',
      weekends: 'Dv-Dg: 18:00 - 03:00'
    },
    gallery: {
      title: 'La Nostra',
      titleHighlight: 'Gastronomia',
      description: 'Una selecció dels nostres plats més destacats, on cada creació és una obra d\'art culinària.'
    },
    footer: {
      address: 'Carrer de l\'Art, 15, 03001 Alacant',
      phone: '+34 965 123 456'
    }
  }
};

export function getTranslations(language: Language): Translation {
  return translations[language];
}
