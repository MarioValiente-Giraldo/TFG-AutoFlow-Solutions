const API_URL = import.meta.env.VITE_API_URL;

const ACCESS_TOKEN_KEY = 'autoflow_access_token';
const REFRESH_TOKEN_KEY = 'autoflow_refresh_token';
const USER_KEY = 'autoflow_user';

function clearSession() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  window.location.href = '/login';
}

/**
 * Wrapper sobre fetch que añade Authorization: Bearer <token> automáticamente.
 * Si recibe un 401, intenta refrescar el access_token y reintenta la petición.
 * Si el refresh también falla, cierra la sesión y redirige a /login.
 */
export async function authFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {}),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };

  const res = await fetch(url, { ...options, headers });

  if (res.status !== 401) return res;

  // Token expirado — intenta refresh
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (!refreshToken) {
    clearSession();
    return res;
  }

  const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!refreshRes.ok) {
    clearSession();
    return res;
  }

  const { access_token } = await refreshRes.json();
  localStorage.setItem(ACCESS_TOKEN_KEY, access_token);

  // Reintenta la petición original con el nuevo token
  const retryHeaders: Record<string, string> = {
    ...headers,
    Authorization: `Bearer ${access_token}`,
  };
  return fetch(url, { ...options, headers: retryHeaders });
}
