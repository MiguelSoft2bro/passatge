// src/pages/admin/AdminPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAdminAuthenticated, logoutAdmin } from '@/lib/adminAuth';
import {
  idiomasApi, categoriasApi, platosApi,
  uploadIcon, uploadImage,
} from '@/lib/adminApi';
import type {
  IdiomaRow, CategoriaRow, CategoriaTR,
  PlatoRow, PlatoTR
} from '@/lib/adminApi';
import { nombreCategoria } from '@/lib/adminApi';

/* =========================
   Helpers UI reutilizables
   ========================= */

function SectionHeader({
  title, subtitle, children,
}: { title: string; subtitle?: string; children?: React.ReactNode; }) {
  return (
    <div className="mb-4 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
      <div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        {subtitle && <p className="text-gray-400">{subtitle}</p>}
      </div>
      <div className="flex gap-2">{children}</div>
    </div>
  );
}

function ToolbarButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = '', ...rest } = props;
  return (
    <button
      {...rest}
      className={`px-3 py-2 rounded bg-amber-700 text-white hover:bg-amber-800 font-medium ${className}`}
    />
  );
}

function SecondaryButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = '', ...rest } = props;
  return (
    <button
      {...rest}
      className={`px-3 py-2 rounded bg-gray-800 text-gray-200 hover:bg-gray-700 ${className}`}
    />
  );
}

function DangerButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = '', ...rest } = props;
  return (
    <button
      {...rest}
      className={`px-3 py-2 rounded bg-red-700 text-white hover:bg-red-800 ${className}`}
    />
  );
}

function Input({ className = '', ...rest }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...rest}
      className={`w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 ${className}`}
    />
  );
}

function Select({ className = '', ...rest }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...rest}
      className={`w-full bg-gray-800 text-white px-3 py-2 rounded border border-gray-700 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 ${className}`}
    />
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-medium text-gray-300 mb-1">{children}</label>;
}

function Badge({ color = 'green', children }: { color?: 'green' | 'red' | 'amber' | 'gray'; children: React.ReactNode }) {
  const map = {
    green: 'bg-green-900 text-green-200',
    red: 'bg-red-900 text-red-200',
    amber: 'bg-amber-900 text-amber-200',
    gray: 'bg-gray-800 text-gray-300',
  } as const;
  return <span className={`text-xs px-2 py-1 rounded ${map[color]}`}>{children}</span>;
}

/* =========================
   Página principal
   ========================= */

type Tab = 'categorias' | 'platos' | 'idiomas';

export default function AdminPage() {
  const nav = useNavigate();
  const [tab, setTab] = useState<Tab>('categorias');

  useEffect(() => {
    if (!isAdminAuthenticated()) nav('/administracion/login', { replace: true });
  }, [nav]);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Panel de administración</h1>
          <SecondaryButton onClick={() => { logoutAdmin(); nav('/administracion/login', { replace: true }); }}>
            Cerrar sesión
          </SecondaryButton>
        </header>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['categorias', 'platos', 'idiomas'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg font-medium ${tab === t
                ? 'bg-amber-700 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-gray-800 p-6 bg-gray-900">
          {tab === 'categorias' && <CategoriasPanel />}
          {tab === 'platos' && <PlatosPanel />}
          {tab === 'idiomas' && <IdiomasPanel />}
        </div>
      </div>
    </div>
  );
}

/* =========================
   IDIOMAS (limpio y simétrico)
   ========================= */

function IdiomasPanel() {
  const [rows, setRows] = useState<IdiomaRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Crear
  const [nuevo, setNuevo] = useState<{ nombre: string; activo: number; file: File | null; preview: string; }>({
    nombre: '', activo: 1, file: null, preview: ''
  });

  // Estados por fila
  const [dirty, setDirty] = useState<Record<number, boolean>>({});
  const [saving, setSaving] = useState<Record<number, boolean>>({});
  const [savedAt, setSavedAt] = useState<Record<number, number>>({});

  async function load() {
    try {
      const r = await idiomasApi.list();
      setRows(r.rows);
      setDirty({}); setSaving({}); setSavedAt({});
    } catch (e: any) { setError(e.message); }
  }
  useEffect(() => { load(); }, []);

  // Crear
  async function create() {
    try {
      if (!nuevo.nombre.trim()) throw new Error('Nombre requerido');
      let iconUrl: string | null = null;
      if (nuevo.file) iconUrl = await uploadIcon(nuevo.file);
      await idiomasApi.create(nuevo.nombre.trim(), iconUrl, nuevo.activo);
      setNuevo({ nombre: '', activo: 1, file: null, preview: '' });
      await load();
    } catch (e: any) { setError(e.message); }
  }

  function markDirty(id: number, updater: (r: IdiomaRow) => IdiomaRow) {
    setRows(rs => rs.map(x => x.ididioma === id ? updater({ ...x }) : x));
    setDirty(d => ({ ...d, [id]: true })); setSavedAt(s => ({ ...s, [id]: 0 }));
  }

  async function saveRow(row: IdiomaRow) {
    const id = row.ididioma;
    try {
      setSaving(s => ({ ...s, [id]: true }));
      await idiomasApi.update(row);
      setDirty(d => ({ ...d, [id]: false }));
      setSavedAt(s => ({ ...s, [id]: Date.now() }));
    } catch (e: any) { setError(e.message); }
    finally { setSaving(s => ({ ...s, [id]: false })); }
  }

  async function remove(id: number) {
    if (!confirm('¿Eliminar idioma?')) return;
    try { await idiomasApi.delete(id); await load(); } catch (e: any) { setError(e.message); }
  }

  return (
    <>
      <SectionHeader
        title="Idiomas"
        subtitle="Gestiona los idiomas disponibles para textos."
      >
        <ToolbarButton onClick={create}>Crear idioma</ToolbarButton>
      </SectionHeader>

      {error && <div className="mb-4 p-3 rounded bg-red-900/40 text-red-200">{error}</div>}

      {/* Crear */}
      <div className="mb-6 p-4 rounded border border-gray-800 bg-gray-950">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>Nombre</Label>
            <Input
              placeholder="Español, English..."
              value={nuevo.nombre}
              onChange={e => setNuevo(p => ({ ...p, nombre: e.target.value }))}
            />
          </div>
          <div>
            <Label>Estado</Label>
            <Select value={nuevo.activo} onChange={e => setNuevo(p => ({ ...p, activo: Number(e.target.value) }))}>
              <option value={1}>Activo</option>
              <option value={0}>Inactivo</option>
            </Select>
          </div>
          <div>
            <Label>Icono</Label>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded overflow-hidden bg-gray-800 border border-gray-700">
                {nuevo.preview ? <img src={nuevo.preview} className="w-full h-full object-cover" /> : null}
              </div>
              <input
                type="file" accept="image/*" className="text-gray-300"
                onChange={e => {
                  const f = e.target.files?.[0] ?? null;
                  setNuevo(p => ({ ...p, file: f, preview: f ? URL.createObjectURL(f) : '' }));
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Listado */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-300 min-w-[820px]">
          <thead className="sticky top-0 bg-gray-900">
            <tr className="text-left">
              <th className="py-2 pr-3">Icono</th>
              <th className="py-2 pr-3">Nombre</th>
              <th className="py-2 pr-3">Estado</th>
              <th className="py-2 pr-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => {
              const isDirty = !!dirty[r.ididioma];
              const isSaving = !!saving[r.ididioma];
              const isSaved = savedAt[r.ididioma] && Date.now() - savedAt[r.ididioma] < 2500;

              return (
                <tr key={r.ididioma} className="border-t border-gray-800">
                  <td className="py-3 pr-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded overflow-hidden bg-gray-800">
                        {r.icono ? <img src={r.icono} className="w-full h-full object-cover" /> : null}
                      </div>
                      <input
                        type="file" accept="image/*" className="text-gray-300"
                        onChange={async e => {
                          const f = e.target.files?.[0] ?? null;
                          if (!f) return;
                          const url = await uploadIcon(f);
                          markDirty(r.ididioma, x => ({ ...x, icono: url }));
                        }}
                      />
                    </div>
                  </td>
                  <td className="py-3 pr-3">
                    <Input
                      value={r.nombre}
                      onChange={e => markDirty(r.ididioma, x => ({ ...x, nombre: e.target.value }))}
                    />
                  </td>
                  <td className="py-3 pr-3">
                    <Select
                      value={r.activo}
                      onChange={e => markDirty(r.ididioma, x => ({ ...x, activo: Number(e.target.value) }))}
                    >
                      <option value={1}>Activo</option>
                      <option value={0}>Inactivo</option>
                    </Select>
                  </td>
                  <td className="py-3 pr-3">
                    <div className="flex items-center gap-2">
                      <ToolbarButton disabled={!isDirty || isSaving} onClick={() => saveRow(r)}>
                        {isSaving ? 'Guardando…' : 'Guardar'}
                      </ToolbarButton>
                      {isSaved ? <Badge>Guardado</Badge> : null}
                      <DangerButton onClick={() => remove(r.ididioma)}>Borrar</DangerButton>
                    </div>
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr><td colSpan={4} className="py-8 text-center text-gray-500">No hay idiomas creados.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* =========================
   CATEGORÍAS (simétrico)
   ========================= */

function CategoriasPanel() {
  const [rows, setRows] = useState<CategoriaRow[]>([]);
  const [idiomas, setIdiomas] = useState<IdiomaRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  const idiomaPreferido = 1;

  // Crear
  const [nuevo, setNuevo] = useState<{ padre: number | null; activo: number; traducciones: CategoriaTR[] }>({
    padre: null, activo: 1, traducciones: []
  });

  // Estados por fila
  const [dirty, setDirty] = useState<Record<number, boolean>>({});
  const [saving, setSaving] = useState<Record<number, boolean>>({});
  const [savedAt, setSavedAt] = useState<Record<number, number>>({});

  async function load() {
    try {
      const [lc, li] = await Promise.all([categoriasApi.list(), idiomasApi.list()]);
      setRows(lc.rows); setIdiomas(li.rows);
      setDirty({}); setSaving({}); setSavedAt({});
    } catch (e: any) { setError(e.message); }
  }
  useEffect(() => { load(); }, []);

  async function create() {
    try {
      await categoriasApi.create({
        idcategoriapadre: nuevo.padre,
        activo: nuevo.activo,
        traducciones: nuevo.traducciones,
      });
      setNuevo({ padre: null, activo: 1, traducciones: [] });
      await load();
    } catch (e: any) { setError(e.message); }
  }

  function markDirty(id: number, updater: (r: CategoriaRow) => CategoriaRow) {
    setRows(rs => rs.map(x => x.idcategoria === id ? updater({ ...x }) : x));
    setDirty(d => ({ ...d, [id]: true })); setSavedAt(s => ({ ...s, [id]: 0 }));
  }

  async function saveRow(row: CategoriaRow) {
    const id = row.idcategoria;
    try {
      setSaving(s => ({ ...s, [id]: true }));
      await categoriasApi.update({
        idcategoria: row.idcategoria,
        idcategoriapadre: row.idcategoriapadre,
        activo: row.activo,
        traducciones: row.traducciones,
      });
      setDirty(d => ({ ...d, [id]: false }));
      setSavedAt(s => ({ ...s, [id]: Date.now() }));
    } catch (e: any) { setError(e.message); }
    finally { setSaving(s => ({ ...s, [id]: false })); }
  }

  async function remove(id: number) {
    if (!confirm('¿Eliminar categoría?')) return;
    try { await categoriasApi.delete(id); await load(); } catch (e: any) { setError(e.message); }
  }

  return (
    <>
      <SectionHeader
        title="Categorías"
        subtitle="Agrupa tus platos por categorías y subcategorías."
      >
        <ToolbarButton onClick={create}>Crear categoría</ToolbarButton>
      </SectionHeader>

      {error && <div className="mb-4 p-3 rounded bg-red-900/40 text-red-200">{error}</div>}

      <div className="mb-6 p-4 rounded border border-gray-800 bg-gray-950 shadow-inner">
        {/* Crear */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>Categoría padre</Label>
            <Select
              value={nuevo.padre ?? ''}
              onChange={e => setNuevo(p => ({ ...p, padre: e.target.value === '' ? null : Number(e.target.value) }))}
            >
              <option value="">(ninguna)</option>
              {rows.map(r => (
                <option key={r.idcategoria} value={r.idcategoria}>{nombreCategoria(r, idiomaPreferido)}</option>
              ))}
            </Select>
          </div>
          <div>
            <Label>Estado</Label>
            <Select
              value={nuevo.activo}
              onChange={e => setNuevo(p => ({ ...p, activo: Number(e.target.value) }))}
            >
              <option value={1}>Activo</option>
              <option value={0}>Inactivo</option>
            </Select>
          </div>

          <div className="md:col-span-3">
            <Label>Traducciones</Label>
            <div className="space-y-2">
              {nuevo.traducciones.map((t, i) => (
                <div key={i} className="grid md:grid-cols-3 gap-2">
                  <Select
                    value={t.ididioma}
                    onChange={e => setNuevo(p => {
                      const arr = [...p.traducciones]; arr[i] = { ...arr[i], ididioma: Number(e.target.value) };
                      return { ...p, traducciones: arr };
                    })}
                  >
                    {idiomas.map(idi => <option key={idi.ididioma} value={idi.ididioma}>{idi.nombre}</option>)}
                  </Select>
                  <Input
                    placeholder="Nombre"
                    value={t.nombre}
                    onChange={e => setNuevo(p => {
                      const arr = [...p.traducciones]; arr[i] = { ...arr[i], nombre: e.target.value };
                      return { ...p, traducciones: arr };
                    })}
                  />
                  <Input
                    placeholder="Descripción"
                    value={t.descripcion ?? ''}
                    onChange={e => setNuevo(p => {
                      const arr = [...p.traducciones]; arr[i] = { ...arr[i], descripcion: e.target.value };
                      return { ...p, traducciones: arr };
                    })}
                  />
                </div>
              ))}
              <SecondaryButton onClick={() =>
                setNuevo(p => ({ ...p, traducciones: [...p.traducciones, { ididioma: idiomas[0]?.ididioma ?? 1, nombre: '', descripcion: '' }] }))
              }>+ Traducción</SecondaryButton>
            </div>
          </div>
        </div>
      </div>

      {/* Tabla sin columna traducciones */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-300 min-w-[900px]">
          <thead className="sticky top-0 bg-gray-900">
            <tr className="text-left">
              <th className="py-2 pr-3">Categoría</th>
              <th className="py-2 pr-3">Padre</th>
              <th className="py-2 pr-3">Estado</th>
              <th className="py-2 pr-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => {
              const isDirty = !!dirty[r.idcategoria];
              const isSaving = !!saving[r.idcategoria];
              const isSaved = savedAt[r.idcategoria] && Date.now() - savedAt[r.idcategoria] < 2500;
              return (
                <>
                  <tr key={r.idcategoria} className="border-t border-gray-800">
                    <td className="py-3 pr-3 font-medium">{nombreCategoria(r, idiomaPreferido)}</td>
                    <td className="py-3 pr-3">
                      <Select
                        value={r.idcategoriapadre ?? ''}
                        onChange={e => markDirty(r.idcategoria, x => ({
                          ...x, idcategoriapadre: e.target.value === '' ? null : Number(e.target.value)
                        }))}
                      >
                        <option value="">(ninguna)</option>
                        {rows.filter(x => x.idcategoria !== r.idcategoria).map(op =>
                          <option key={op.idcategoria} value={op.idcategoria}>{nombreCategoria(op, idiomaPreferido)}</option>
                        )}
                      </Select>
                    </td>
                    <td className="py-3 pr-3">
                      <Select
                        value={r.activo}
                        onChange={e => markDirty(r.idcategoria, x => ({ ...x, activo: Number(e.target.value) }))}
                      >
                        <option value={1}>Activo</option>
                        <option value={0}>Inactivo</option>
                      </Select>
                    </td>
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-2">
                        <ToolbarButton disabled={!isDirty || isSaving} onClick={() => saveRow(r)}>
                          {isSaving ? 'Guardando…' : 'Guardar'}
                        </ToolbarButton>
                        {isSaved ? <Badge>Guardado</Badge> : null}
                        <DangerButton onClick={() => remove(r.idcategoria)}>Borrar</DangerButton>
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-gray-950/60">
                    <td colSpan={4} className="px-4 pb-6">
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs tracking-wide text-gray-400">Traducciones</span>
                          <SecondaryButton
                            onClick={() => markDirty(r.idcategoria, row => ({
                              ...row, traducciones: [...row.traducciones, { ididioma: idiomas[0]?.ididioma ?? 1, nombre: '', descripcion: '' }]
                            }))}
                            className="text-xs px-2 py-1"
                          >+ Añadir</SecondaryButton>
                        </div>
                        <div className="space-y-2">
                          {r.traducciones.map((t, idx) => (
                            <div key={idx} className="grid md:grid-cols-3 gap-2">
                              <Select
                                value={t.ididioma}
                                onChange={e => markDirty(r.idcategoria, row => ({
                                  ...row, traducciones: row.traducciones.map((y, i) => i === idx ? { ...y, ididioma: Number(e.target.value) } : y)
                                }))}
                              >
                                {idiomas.map(idi => <option key={idi.ididioma} value={idi.ididioma}>{idi.nombre}</option>)}
                              </Select>
                              <Input
                                value={t.nombre}
                                onChange={e => markDirty(r.idcategoria, row => ({
                                  ...row, traducciones: row.traducciones.map((y, i) => i === idx ? { ...y, nombre: e.target.value } : y)
                                }))}
                              />
                              <Input
                                value={t.descripcion ?? ''}
                                onChange={e => markDirty(r.idcategoria, row => ({
                                  ...row, traducciones: row.traducciones.map((y, i) => i === idx ? { ...y, descripcion: e.target.value } : y)
                                }))}
                              />
                            </div>
                          ))}
                          {r.traducciones.length === 0 && <div className="text-xs text-gray-500">Sin traducciones.</div>}
                        </div>
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
            {rows.length === 0 && (
              <tr><td colSpan={4} className="py-8 text-center text-gray-500">No hay categorías.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* =========================
   PLATOS (simétrico)
   ========================= */

function PlatosPanel() {
  const [rows, setRows] = useState<PlatoRow[]>([]);
  const [categorias, setCategorias] = useState<CategoriaRow[]>([]);
  const [idiomas, setIdiomas] = useState<IdiomaRow[]>([]);
  const [error, setError] = useState<string | null>(null);

  const idiomaPreferido = 1;

  // Crear
const [nuevo, setNuevo] = useState<{
  idcategoria: number | null;
  precio: string;
  destacado: number;
  file: File | null;
  preview: string;
  traducciones: PlatoTR[];
}>({
  idcategoria: null,
  precio: '',
  destacado: 0,
  file: null,
  preview: '',
  traducciones: []
});

  // Estados por fila
  const [dirty, setDirty] = useState<Record<number, boolean>>({});
  const [saving, setSaving] = useState<Record<number, boolean>>({});
  const [savedAt, setSavedAt] = useState<Record<number, number>>({});
  const [pendingFile, setPendingFile] = useState<Record<number, File | null>>({});

  async function load() {
    try {
      const [lp, lc, li] = await Promise.all([platosApi.list(), categoriasApi.list(), idiomasApi.list()]);
      setRows(lp.rows); setCategorias(lc.rows); setIdiomas(li.rows);
      if (lc.rows.length && nuevo.idcategoria == null) {
        setNuevo(p => ({ ...p, idcategoria: lc.rows[0].idcategoria }));
      }
      setDirty({}); setSaving({}); setSavedAt({}); setPendingFile({});
    } catch (e: any) { setError(e.message); }
  }
  useEffect(() => { load(); }, []);

  async function create() {
    try {
      if (nuevo.idcategoria == null) throw new Error('Selecciona una categoría');
      let imageUrl: string | null = null;
      if (nuevo.file) imageUrl = await uploadImage(nuevo.file);
 await platosApi.create({
  idcategoria: nuevo.idcategoria,
  precio: nuevo.precio,
  destacado: nuevo.destacado,
  image: imageUrl ?? '',
  traducciones: nuevo.traducciones,
});

setNuevo({
  idcategoria: categorias[0]?.idcategoria ?? null,
  precio: '',
  destacado: 0,
  file: null,
  preview: '',
  traducciones: []
});
      await load();
    } catch (e: any) { setError(e.message); }
  }

  function markDirty(id: number, updater: (r: PlatoRow) => PlatoRow) {
    setRows(rs => rs.map(x => x.idplato === id ? updater({ ...x }) : x));
    setDirty(d => ({ ...d, [id]: true })); setSavedAt(s => ({ ...s, [id]: 0 }));
  }

  async function saveRow(row: PlatoRow) {
    const id = row.idplato;
    try {
      setSaving(s => ({ ...s, [id]: true }));
      let imageUrl = row.image ?? '';
      if (pendingFile[id]) imageUrl = await uploadImage(pendingFile[id] as File);
      await platosApi.update({
        idplato: row.idplato,
        idcategoria: row.idcategoria,
        precio: row.precio,
        destacado: row.destacado,
        image: imageUrl,
        traducciones: row.traducciones,
      });
      setDirty(d => ({ ...d, [id]: false }));
      setSavedAt(s => ({ ...s, [id]: Date.now() }));
      setPendingFile(p => ({ ...p, [id]: null }));
    } catch (e: any) { setError(e.message); }
    finally { setSaving(s => ({ ...s, [id]: false })); }
  }

  async function remove(id: number) {
    if (!confirm('¿Eliminar plato?')) return;
    try { await platosApi.delete(id); await load(); } catch (e: any) { setError(e.message); }
  }

  return (

    <>

      <SectionHeader
        title="Platos"
        subtitle="Gestiona los platos y sus traducciones."
      >
        <ToolbarButton onClick={create}>Crear plato</ToolbarButton>
      </SectionHeader>

      {error && <div className="mb-4 p-3 rounded bg-red-900/40 text-red-200">{error}</div>}

      {/* Crear */}
      <div className="mb-6 p-4 rounded border border-gray-800 bg-gray-950 shadow-inner">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <Label>Categoría</Label>
            <Select
              value={nuevo.idcategoria ?? ''}
              onChange={e => setNuevo(p => ({ ...p, idcategoria: e.target.value === '' ? null : Number(e.target.value) }))}
            >
              {categorias.map(c => (
                <option key={c.idcategoria} value={c.idcategoria}>
                  {nombreCategoria(c, idiomaPreferido)}
                </option>
              ))}
            </Select>
          </div>
          <div>
  <Label>Precio</Label>
<Input
  type="text"
  value={nuevo.precio}
  onChange={e => setNuevo(p => ({ ...p, precio: e.target.value }))}
/>
          </div>
          <div className="md:col-span-2">
            <Label>Imagen</Label>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded overflow-hidden bg-gray-800">
                {nuevo.preview ? <img src={nuevo.preview} className="w-full h-full object-cover" /> : null}
              </div>
              <input
                type="file" accept="image/*" className="text-gray-300"
                onChange={e => {
                  const f = e.target.files?.[0] ?? null;
                  setNuevo(p => ({ ...p, file: f, preview: f ? URL.createObjectURL(f) : '' }));
                }}
              />
            </div>
          </div>
          <div>
            <Label>Destacado</Label>
            <Select value={nuevo.destacado} onChange={e => setNuevo(p => ({ ...p, destacado: Number(e.target.value) }))}>
              <option value={0}>No</option>
              <option value={1}>Sí</option>
            </Select>
          </div>
        </div>
        <div className="mt-4">
          <Label>Traducciones</Label>
          <div className="space-y-2">
            {nuevo.traducciones.map((t, i) => (
              <div key={i} className="grid md:grid-cols-3 gap-2">
                <Select
                  value={t.ididioma}
                  onChange={e => setNuevo(p => {
                    const arr = [...p.traducciones]; arr[i] = { ...arr[i], ididioma: Number(e.target.value) };
                    return { ...p, traducciones: arr };
                  })}
                >
                  {idiomas.map(idi => <option key={idi.ididioma} value={idi.ididioma}>{idi.nombre}</option>)}
                </Select>
                <Input
                  placeholder="Nombre"
                  value={t.nombre}
                  onChange={e => setNuevo(p => {
                    const arr = [...p.traducciones]; arr[i] = { ...arr[i], nombre: e.target.value };
                    return { ...p, traducciones: arr };
                  })}
                />
                <Input
                  placeholder="Descripción"
                  value={t.descripcion ?? ''}
                  onChange={e => setNuevo(p => {
                    const arr = [...p.traducciones]; arr[i] = { ...arr[i], descripcion: e.target.value };
                    return { ...p, traducciones: arr };
                  })}
                />
              </div>
            ))}
            <SecondaryButton onClick={() =>
              setNuevo(p => ({ ...p, traducciones: [...p.traducciones, { ididioma: idiomas[0]?.ididioma ?? 1, nombre: '', descripcion: '' }] }))
            }>+ Traducción</SecondaryButton>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-300 min-w-[1000px]">
          <thead className="sticky top-0 bg-gray-900">
            <tr className="text-left">
              <th className="py-2 pr-3">Plato</th>
              <th className="py-2 pr-3">Categoría</th>
              <th className="py-2 pr-3">Precio</th>
              <th className="py-2 pr-3">Imagen</th>
              <th className="py-2 pr-3">Destacado</th>
              <th className="py-2 pr-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => {
              const isDirty = !!dirty[r.idplato];
              const isSaving = !!saving[r.idplato];
              const isSaved = savedAt[r.idplato] && Date.now() - savedAt[r.idplato] < 2500;

              return (
                <>
                  <tr key={r.idplato} className="border-t border-gray-800">
                    <td className="py-3 pr-3 font-medium">{r.traducciones[0]?.nombre ?? `Plato ${r.idplato}`}</td>
                    <td className="py-3 pr-3">
                      <Select value={r.idcategoria} onChange={e => markDirty(r.idplato, x => ({ ...x, idcategoria: Number(e.target.value) }))}>
                        {categorias.map(c => <option key={c.idcategoria} value={c.idcategoria}>{nombreCategoria(c, idiomaPreferido)}</option>)}
                      </Select>
                    </td>
                  <td className="py-3 pr-3">
  <Input
    type="text"
    value={r.precio}
    onChange={e => markDirty(r.idplato, x => ({ ...x, precio: e.target.value }))}
  />
</td>
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded overflow-hidden bg-gray-800">
                          {r.image ? <img src={r.image} className="w-full h-full object-cover" /> : null}
                        </div>
                        <input type="file" accept="image/*" className="text-gray-300" onChange={e => {
                          const f = e.target.files?.[0] ?? null; if (!f) return;
                          setPendingFile(p => ({ ...p, [r.idplato]: f }));
                          const url = URL.createObjectURL(f);
                          markDirty(r.idplato, x => ({ ...x, image: url }));
                        }} />
                      </div>
                    </td>
                    <td className="py-3 pr-3">
                      <Select value={r.destacado} onChange={e => markDirty(r.idplato, x => ({ ...x, destacado: Number(e.target.value) }))}>
                        <option value={0}>No</option>
                        <option value={1}>Sí</option>
                      </Select>
                    </td>
                    <td className="py-3 pr-3">
                      <div className="flex items-center gap-2">
                        <ToolbarButton disabled={!isDirty || isSaving} onClick={() => saveRow(r)}>
                          {isSaving ? 'Guardando…' : 'Guardar'}
                        </ToolbarButton>
                        {isSaved ? <Badge>Guardado</Badge> : null}
                        <DangerButton onClick={() => remove(r.idplato)}>Borrar</DangerButton>
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-gray-950/60">
                    <td colSpan={6} className="px-4 pb-6">
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs tracking-wide text-gray-400">Traducciones</span>
                          <SecondaryButton
                            onClick={() => markDirty(r.idplato, row => ({
                              ...row, traducciones: [...row.traducciones, { ididioma: idiomas[0]?.ididioma ?? 1, nombre: '', descripcion: '' }]
                            }))}
                            className="text-xs px-2 py-1"
                          >+ Añadir</SecondaryButton>
                        </div>
                        <div className="space-y-2">
                          {r.traducciones.map((t, idx) => (
                            <div key={idx} className="grid md:grid-cols-3 gap-2">
                              <Select
                                value={t.ididioma}
                                onChange={e => markDirty(r.idplato, row => ({
                                  ...row, traducciones: row.traducciones.map((y, i) => i === idx ? { ...y, ididioma: Number(e.target.value) } : y)
                                }))}
                              >
                                {idiomas.map(idi => <option key={idi.ididioma} value={idi.ididioma}>{idi.nombre}</option>)}
                              </Select>
                              <Input
                                value={t.nombre}
                                onChange={e => markDirty(r.idplato, row => ({
                                  ...row, traducciones: row.traducciones.map((y, i) => i === idx ? { ...y, nombre: e.target.value } : y)
                                }))}
                              />
                              <Input
                                value={t.descripcion ?? ''}
                                onChange={e => markDirty(r.idplato, row => ({
                                  ...row, traducciones: row.traducciones.map((y, i) => i === idx ? { ...y, descripcion: e.target.value } : y)
                                }))}
                              />
                            </div>
                          ))}
                          {r.traducciones.length === 0 && <div className="text-xs text-gray-500">Sin traducciones.</div>}
                        </div>
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
            {rows.length === 0 && (
              <tr><td colSpan={6} className="py-8 text-center text-gray-500">No hay platos.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
