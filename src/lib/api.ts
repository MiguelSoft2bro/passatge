// src/lib/api.ts
import type { ApiResponse, ApiCategoryNode, MenuItem, MenuCategory } from './types';

const API_URL = 'https://passatgebar.com/api/get_carta.php';
const DEFAULT_IMAGE = '../../images/default.png';

let cachedData: { items: MenuItem[]; categories: MenuCategory[]; ididioma: number } | null = null;
let lastFetch = 0;
const CACHE_DURATION = 5 * 60 * 1000;

// --- helpers ---
function flattenCategories(nodes: ApiCategoryNode[], out: MenuCategory[] = []): MenuCategory[] {
  for (const n of nodes) {
    const parentId = n.idcategoriapadre ?? 0; // raíz => 0
    out.push({
      id: n.idcategoria,
      name: n.nombre,
      parentId,
      isSubcategory: parentId !== 0,
    });
    if (n.children?.length) flattenCategories(n.children, out);
  }
  return out;
}

function collectItems(nodes: ApiCategoryNode[], out: MenuItem[] = []): MenuItem[] {
  for (const n of nodes) {
    if (n.platos?.length) {
      for (const p of n.platos) {
        const hasCustomImage = !!(p.image && p.image.trim() !== '');

        out.push({
          id: String(p.idplato),
          name: p.nombre,
          description: p.descripcion ?? '',
          price: p.precio || "0",
          categoryId: n.idcategoria,
          featured: p.destacado === 1, // Usar el campo destacado de la BD

          // Imagen
          image: hasCustomImage ? p.image! : DEFAULT_IMAGE, // assertion: p.image is non-null when hasCustomImage

          // 👇 NUEVO: marcar si tiene imagen propia
          hasCustomImage,
        });
      }
    }
    if (n.children?.length) collectItems(n.children, out);
  }
  return out;
}

// --- API principal ---
export async function fetchMenuData(ididioma: number = 1): Promise<{ items: MenuItem[]; categories: MenuCategory[] }> {
  if (cachedData && Date.now() - lastFetch < CACHE_DURATION && cachedData.ididioma === ididioma) {
    return { items: cachedData.items, categories: cachedData.categories };
  }

  const url = new URL(API_URL);
  if (ididioma && ididioma !== 1) url.searchParams.set('ididioma', String(ididioma));

  const response = await fetch(url.toString(), { cache: 'no-store' });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const data: ApiResponse = await response.json();
  const categories = flattenCategories(data.categorias);
  const items = collectItems(data.categorias);

  cachedData = { items, categories, ididioma: data.ididioma ?? ididioma };
  lastFetch = Date.now();

  return { items, categories };
}

// Convenience para páginas que solo quieren categorías
export async function fetchCategoriesPublic(ididioma: number = 1): Promise<MenuCategory[]> {
  const { categories } = await fetchMenuData(ididioma);
  return categories;
}

// Obtener solo platos destacados
export async function fetchFeaturedDishes(ididioma: number = 1): Promise<MenuItem[]> {
  const { items } = await fetchMenuData(ididioma);
  return items.filter(item => item.featured);
}

// ---- utilidades que ya usas en CategoryPage ----
function getDescendantCategoryIds(categories: MenuCategory[], rootId: number): number[] {
  const ids: number[] = [rootId];
  const byParent = new Map<number, MenuCategory[]>();
  for (const c of categories) {
    const list = byParent.get(c.parentId) ?? [];
    list.push(c);
    byParent.set(c.parentId, list);
  }
  const stack = [rootId];
  while (stack.length) {
    const current = stack.pop()!;
    const children = byParent.get(current) ?? [];
    for (const ch of children) {
      ids.push(ch.id);
      stack.push(ch.id);
    }
  }
  return ids;
}

export function getItemsByCategory(
  items: MenuItem[],
  categories: MenuCategory[],
  categoryId: number | 'all'
): MenuItem[] {
  if (categoryId === 'all') return items;
  const selected = categories.find(c => c.id === categoryId);
  if (!selected) return [];
  if (!selected.isSubcategory) {
    const allIds = getDescendantCategoryIds(categories, categoryId);
    return items.filter(i => allIds.includes(i.categoryId));
  }
  return items.filter(i => i.categoryId === categoryId);
}

export function getMainCategories(categories: MenuCategory[]): MenuCategory[] {
  // raíz => parentId === 0
  return categories.filter(c => !c.isSubcategory && (c.parentId === 0 || !c.parentId));
}

export function getSubcategories(categories: MenuCategory[], parentId: number): MenuCategory[] {
  return categories.filter(c => c.parentId === parentId);
}
