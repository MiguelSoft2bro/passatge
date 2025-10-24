
import { MenuItem, ContactInfo } from './types';

const dishImage = 'https://cdn.abacus.ai/images/5a9be7b2-4347-4b98-8e1f-8064387e560d.png';

export const menuItems: MenuItem[] = [
  // Entrantes
  {
    id: '1',
    name: 'Tartar de Atún Rojo',
    description: 'Atún rojo de Alicante, aguacate, sésamo negro y vinagreta de soja',
    price: 18.50,
    category: 'entrantes',
    featured: true,
    image: dishImage
  },
  {
    id: '2',
    name: 'Croquetas de Jamón Ibérico',
    description: 'Bechamel artesana con jamón ibérico de bellota y trufa negra',
    price: 12.00,
    category: 'entrantes',
    image: dishImage
  },
  {
    id: '3',
    name: 'Carpaccio de Pulpo',
    description: 'Pulpo mediterráneo, aceite de pimentón y microgreens',
    price: 16.00,
    category: 'entrantes',
    image: dishImage
  },
  {
    id: '4',
    name: 'Burrata con Tomate Raf',
    description: 'Burrata artesana, tomate raf de la huerta alicantina y albahaca',
    price: 14.50,
    category: 'entrantes',
    image: dishImage
  },

  // Principales
  {
    id: '5',
    name: 'Arroz Negro del Mediterráneo',
    description: 'Arroz con sepia, calamar y alioli de azafrán',
    price: 22.00,
    category: 'principales',
    featured: true,
    image: dishImage
  },
  {
    id: '6',
    name: 'Lubina a la Sal',
    description: 'Lubina salvaje en costra de sal con verduras de temporada',
    price: 26.00,
    category: 'principales',
    image: dishImage
  },
  {
    id: '7',
    name: 'Solomillo de Ternera',
    description: 'Solomillo nacional con reducción de vino tinto y patatas confitadas',
    price: 28.50,
    category: 'principales',
    image: dishImage
  },
  {
    id: '8',
    name: 'Risotto de Setas',
    description: 'Arroz cremoso con setas de temporada y parmesano',
    price: 19.00,
    category: 'principales',
    image: dishImage
  },

  // Postres
  {
    id: '9',
    name: 'Tarta de Chocolate Negro',
    description: 'Chocolate 70% con helado de vainilla y coulis de frambuesa',
    price: 8.50,
    category: 'postres',
    image: dishImage
  },
  {
    id: '10',
    name: 'Tiramisú Artesano',
    description: 'Receta tradicional con café de tueste natural',
    price: 7.50,
    category: 'postres',
    image: dishImage
  },
  {
    id: '11',
    name: 'Crema Catalana Flambeada',
    description: 'Postre tradicional con azúcar caramelizado al momento',
    price: 6.50,
    category: 'postres',
    image: dishImage
  },

  // Bebidas
  {
    id: '12',
    name: 'Gin Tonic Premium',
    description: 'Gin artesanal con tónica premium y botánicos frescos',
    price: 12.00,
    category: 'bebidas',
    image: dishImage
  },
  {
    id: '13',
    name: 'Cóctel Passatge Signature',
    description: 'Mezcla exclusiva con ron añejo, licor de naranja y especias',
    price: 14.00,
    category: 'bebidas',
    featured: true,
    image: dishImage
  },
  {
    id: '14',
    name: 'Vino Tinto Reserva',
    description: 'Selección de bodegas alicantinas, copa',
    price: 6.50,
    category: 'bebidas',
    image: dishImage
  },
  {
    id: '15',
    name: 'Café Especial',
    description: 'Blend exclusivo de granos seleccionados',
    price: 3.50,
    category: 'bebidas',
    image: dishImage
  }
];

export const contactInfo: ContactInfo = {
  address: 'Calle del Arte, 15, 03001 Alicante',
  phone: '+34 965 123 456',
  email: 'info@passatgebar.com',
  hours: {
    weekdays: 'L-J: 18:00 - 02:00',
    weekends: 'V-D: 18:00 - 03:00'
  }
};

export const categoryLabels = {
  entrantes: 'Entrantes',
  principales: 'Principales',
  postres: 'Postres',
  bebidas: 'Bebidas'
};
