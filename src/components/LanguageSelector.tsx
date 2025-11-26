import { useEffect, useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { fetchPublicLanguages } from '@/lib/publicLanguages';
import type { Language } from '@/lib/i18n';

type PublicLang = {
  ididioma: number;
  codigo: string;     // 'es' | 'en' | 'va' | otros
  icono?: string;     // url del icono (opcional)
};

const codeToUI: Record<string, Language | undefined> = {
  es: 'es',
  en: 'en',
};

export default function LanguageSelector() {
  const { setLanguage, idIdioma, setIdIdioma } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [langs, setLangs] = useState<PublicLang[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchPublicLanguages();
        if (!alive) return;

        // Ordena dejando primero el guardado en localStorage (si existe)
        const savedId = Number(localStorage.getItem('ididioma') || idIdioma || 1);
        const ordered = [...data].sort((a, b) => (a.ididioma === savedId ? -1 : b.ididioma === savedId ? 1 : 0));
        setLangs(ordered);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const current = langs.find(l => l.ididioma === idIdioma) || langs[0];

  const handlePick = (l: PublicLang) => {
    // 1) Actualiza el idIdioma (para la carta / backend)
    setIdIdioma(l.ididioma);

    // 2) Si el código es uno de los que tenemos en i18n, cambia también la UI
    const ui = codeToUI[l.codigo?.toLowerCase()];
    if (ui) setLanguage(ui);

    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(o => !o)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg glass hover:bg-amber-700/20 transition-all duration-300 text-white"
        aria-label="Selector de idioma"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">
          {loading ? '...' : (current?.codigo?.toUpperCase() ?? '??')}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && !loading && (
        <div className="absolute top-full right-0 mt-2 bg-black/95 backdrop-blur-md rounded-lg border border-amber-800/30 shadow-xl overflow-hidden z-50 min-w-[160px]">
          {langs.map(l => {
            const active = l.ididioma === idIdioma;
            return (
              <button
                key={l.ididioma}
                onClick={() => handlePick(l)}
                className={`w-full px-4 py-3 text-left hover:bg-amber-700/20 transition-all duration-200 flex items-center gap-3 ${
                  active ? 'bg-amber-800/30 text-amber-400' : 'text-gray-300'
                }`}
              >
                {l.icono ? (
                  <img src={l.icono} alt={l.codigo} className="w-5 h-5 rounded object-cover" />
                ) : (
                  <span className="inline-block w-5 text-center opacity-70">🌐</span>
                )}
                <span className="text-sm font-medium uppercase">{l.codigo}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
