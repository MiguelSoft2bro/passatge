import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveAdminToken } from '@/lib/adminAuth';

const API_LOGIN = import.meta.env.VITE_ADMIN_LOGIN_URL ?? 'https://passatgebar.com/api/admin_login.php';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(API_LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Si el PHP está en otro dominio y usas cookies, añade: credentials: 'include'
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!data.ok || !data.token) throw new Error(data.msg || 'Credenciales inválidas');

      saveAdminToken(data.token);
      navigate('/administracion', { replace: true });
    } catch (err: any) {
      setError(err.message || 'Error de inicio de sesión');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-lg">
        <h1 className="text-2xl font-bold text-white mb-1">Administración</h1>
        <p className="text-gray-400 mb-6">Accede con tus credenciales</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Usuario</label>
            <input
              type="text"
              className="w-full rounded-lg bg-gray-800 text-white px-3 py-2 outline-none border border-gray-700 focus:border-amber-600"
              value={username}
              onChange={e => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Contraseña</label>
            <input
              type="password"
              className="w-full rounded-lg bg-gray-800 text-white px-3 py-2 outline-none border border-gray-700 focus:border-amber-600"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          {error && <div className="text-sm text-red-400">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-700 hover:bg-amber-800 text-white rounded-lg py-2 font-semibold transition"
          >
            {loading ? 'Entrando…' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
