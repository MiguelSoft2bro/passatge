// src/lib/publicLanguages.ts
export type PublicLanguage = {
  ididioma: number;
  codigo: string;
  icono?: string;
};

export async function fetchPublicLanguages(): Promise<PublicLanguage[]> {
  const res = await fetch('https://passatgebar.com/api/get_idiomas.php', { cache: 'no-store' });
  if (!res.ok) throw new Error('No se pudieron cargar los idiomas públicos');
  return res.json();
}
