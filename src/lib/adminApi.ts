// src/lib/adminApi.ts
import { getAdminToken } from './adminAuth';

const API_BASE = import.meta.env.VITE_ADMIN_API_BASE ?? 'https://passatgebar.com/api';
const UPLOAD_ICON_URL = import.meta.env.VITE_ADMIN_UPLOAD_ICON_URL ?? `${API_BASE}/upload_icon.php`;
const UPLOAD_IMAGE_URL = import.meta.env.VITE_ADMIN_UPLOAD_IMAGE_URL ?? `${API_BASE}/upload_image.php`;

async function post<T>(path: string, body: any): Promise<T> {
  const token = getAdminToken();
  const res = await fetch(`${API_BASE}/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, ...body }),
  });
  const data = await res.json();
  if (!res.ok || data.ok === false) throw new Error(data?.msg || `HTTP ${res.status}`);
  return data as T;
}

/* ===== Idiomas ===== */
export type IdiomaRow = { ididioma: number; nombre: string; icono: string | null; activo: number };

export const idiomasApi = {
  list: () => post<{ok:true; rows: IdiomaRow[]}>('idiomas.php', { action: 'list' }),
  create: (nombre: string, icono: string | null, activo: number) =>
    post<{ok:true; ididioma:number}>('idiomas.php', { action: 'create', nombre, icono, activo }),
  update: (row: IdiomaRow) => post<{ok:true}>('idiomas.php', { action: 'update', ...row }),
  delete: (ididioma: number) => post<{ok:true}>('idiomas.php', { action: 'delete', ididioma }),
};

/* ===== Categorías ===== */
export type CategoriaTR = { ididioma:number; nombre:string; descripcion?:string|null };
export type CategoriaRow = {
  idcategoria: number;
  idcategoriapadre: number | null;
  activo: number;
  traducciones: CategoriaTR[];
};
export const categoriasApi = {
  list: () => post<{ok:true; rows: CategoriaRow[]}>('categorias.php', { action: 'list' }),
  create: (payload: { idcategoriapadre: number | null; activo: number; traducciones: CategoriaTR[] }) =>
    post<{ok:true; idcategoria:number}>('categorias.php', { action: 'create', ...payload }),
  update: (payload: { idcategoria:number; idcategoriapadre?: number|null; activo?: number; traducciones?: CategoriaTR[] }) =>
    post<{ok:true}>('categorias.php', { action: 'update', ...payload }),
  delete: (idcategoria: number) => post<{ok:true}>('categorias.php', { action: 'delete', idcategoria }),
};

/* ===== Platos ===== */
export type PlatoTR = { ididioma:number; nombre:string; descripcion?:string|null };
export type PlatoRow = {
  idplato: number;
  idcategoria: number;
  precio: string;
  destacado: number;
  image?: string | null;
  traducciones: PlatoTR[];
};
export const platosApi = {
  list: (idcategoria?: number) => post<{ok:true; rows: PlatoRow[]}>('platos.php', { action: 'list', idcategoria }),
  create: (payload: { idcategoria:number; precio:string; destacado:number; image?:string|null; traducciones:PlatoTR[] }) =>
    post<{ok:true; idplato:number}>('platos.php', { action: 'create', ...payload }),
  update: (payload: { idplato:number; idcategoria?:number; precio?:string; destacado?:number; image?:string|null; traducciones?:PlatoTR[] }) =>
    post<{ok:true}>('platos.php', { action: 'update', ...payload }),
  delete: (idplato:number) => post<{ok:true}>('platos.php', { action: 'delete', idplato }),
};

/* ===== Subidas de ficheros (multipart) ===== */
export async function uploadIcon(file: File): Promise<string> {
  const token = getAdminToken();
  if (!token) throw new Error('No hay token de autenticación');
  
  const fd = new FormData();
  fd.append('file', file);
  fd.append('token', token);
  const res = await fetch(UPLOAD_ICON_URL, { 
    method: 'POST', 
    body: fd 
  });
  const data = await res.json();
  if (!res.ok || data.ok === false) throw new Error(data?.msg || `HTTP ${res.status}`);
  return data.url as string;
}

export async function uploadImage(file: File): Promise<string> {
  const token = getAdminToken();
  if (!token) throw new Error('No hay token de autenticación');
  
  const fd = new FormData();
  fd.append('file', file);
  fd.append('token', token);
  const res = await fetch(UPLOAD_IMAGE_URL, { 
    method: 'POST', 
    body: fd 
  });
  const data = await res.json();
  if (!res.ok || data.ok === false) throw new Error(data?.msg || `HTTP ${res.status}`);
  return data.url as string;
}

/* ===== Contenido Home ===== */
export type ContenidoHomeTR = { ididioma: number; valor: string };
export type ContenidoHomeRow = {
  id: number;
  seccion: string;
  elemento: string;
  tipo: 'texto' | 'imagen' | 'titulo';
  valor?: string | null;
  imagen?: string | null;
  orden: number;
  activo: number;
  traducciones: ContenidoHomeTR[];
};

export const contenidoHomeApi = {
  list: () => post<{ok: true; rows: ContenidoHomeRow[]}>('contenido_home.php', { action: 'list' }),
  update: (payload: { id: number; valor?: string | null; imagen?: string | null; traducciones?: ContenidoHomeTR[] }) =>
    post<{ok: true}>('contenido_home.php', { action: 'update', ...payload }),
  uploadImage: async (file: File): Promise<string> => {
    const token = getAdminToken();
    if (!token) throw new Error('No hay token de autenticación');
    
    const fd = new FormData();
    fd.append('file', file);
    fd.append('token', token);
    const res = await fetch(`${API_BASE}/contenido_home.php`, { 
      method: 'POST', 
      body: fd 
    });
    const data = await res.json();
    if (!res.ok || data.ok === false) throw new Error(data?.msg || `HTTP ${res.status}`);
    return data.url as string;
  }
};

/* ===== Helpers para selects por nombre ===== */
export function nombreCategoria(row: CategoriaRow, idiomaPreferido = 1): string {
  const tr = row.traducciones.find(t => t.ididioma === idiomaPreferido) ?? row.traducciones[0];
  return tr?.nombre || `Categoría ${row.idcategoria}`;
}