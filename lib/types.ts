
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  featured?: boolean;
  image?: string;
}

export type MenuCategory = 'entrantes' | 'principales' | 'postres' | 'bebidas';

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  hours: {
    weekdays: string;
    weekends: string;
  };
}
