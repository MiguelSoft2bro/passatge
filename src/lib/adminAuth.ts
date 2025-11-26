// Utilidades de autenticación para el panel de admin

const TOKEN_KEY = 'admin_token';

type TokenPayload = {
  sub: string;
  exp: number; // epoch seconds
};

export function saveAdminToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getAdminToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function logoutAdmin() {
  localStorage.removeItem(TOKEN_KEY);
}

export function isTokenValid(token: string | null): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;

  try {
    const payloadB64 = parts[0];
    const payloadJson = atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/'));
    const payload = JSON.parse(payloadJson) as TokenPayload;
    if (!payload.exp || typeof payload.exp !== 'number') return false;
    const now = Math.floor(Date.now() / 1000);
    return now < payload.exp;
  } catch {
    return false;
  }
}

export function isAdminAuthenticated(): boolean {
  return isTokenValid(getAdminToken());
}
