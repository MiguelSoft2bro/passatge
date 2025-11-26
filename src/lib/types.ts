// ===== Tipos de la NUEVA API =====
export interface ApiGalleryPhoto {
  imagen: string;
  orden: number;
}

export interface ApiDish {
  idplato: number;
  precio: string;
  image?: string | null;
  nombre: string;
  descripcion?: string | null;
  destacado?: number; // 0 o 1
  orden?: number; // campo de ordenación
  galeria?: ApiGalleryPhoto[]; // fotos adicionales
}

export interface ApiCategoryNode {
  idcategoria: number;
  idcategoriapadre: number | null;
  nombre: string;
  descripcion?: string | null;
  orden?: number; // campo de ordenación
  platos: ApiDish[];
  children: ApiCategoryNode[];
}

export interface ApiResponse {
  ididioma: number;
  categorias: ApiCategoryNode[];
}

// ===== Tipos transformados (se mantienen como los usa tu app) =====
export interface MenuItem {
  id: string;              // mantenemos string para no romper claves/props
  name: string;
  description: string;
  price: string;
  categoryId: number;
  featured?: boolean;
  image?: string;
  hasCustomImage: boolean;
  orden?: number; // campo de ordenación
  galeria?: string[]; // URLs de fotos adicionales
}

export interface MenuCategory {
  id: number;
  name: string;
  parentId: number;        // mapearemos null -> 0 para no tocar tu lógica existente
  isSubcategory: boolean;
  orden?: number; // campo de ordenación
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  hours: {
    weekdays: string;
    weekends: string;
  };
}
