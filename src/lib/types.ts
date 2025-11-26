// ===== Tipos de la NUEVA API =====
export interface ApiDish {
  idplato: number;
  precio: string;
  image?: string | null;
  nombre: string;
  descripcion?: string | null;
  destacado?: number; // 0 o 1
}

export interface ApiCategoryNode {
  idcategoria: number;
  idcategoriapadre: number | null;
  nombre: string;
  descripcion?: string | null;
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
  hasCustomImage: boolean; // 👈 nuevo
}

export interface MenuCategory {
  id: number;
  name: string;
  parentId: number;        // mapearemos null -> 0 para no tocar tu lógica existente
  isSubcategory: boolean;
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
