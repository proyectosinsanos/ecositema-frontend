const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

export const AUTH_ENDPOINTS = {
  LOGIN:                  `${BASE}/auth/login`,
  LOGOUT:                 `${BASE}/auth/logout`,
  ME:                     `${BASE}/auth/me`,
  REFRESH:                `${BASE}/auth/refresh`,
  RECUPERAR_CONTRASENA:   `${BASE}/auth/recuperar-contrasena`,
  RESTABLECER_CONTRASENA: `${BASE}/auth/restablecer-contrasena`,
  IFRAME_TOKEN:           `${BASE}/auth/iframe-token`,
} as const;
