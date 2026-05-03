const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

export const AUTH_ENDPOINTS = {
  LOGIN:                  `${BASE}/users/login`,
  LOGOUT:                 `${BASE}/users/logout`,
  ME:                     `${BASE}/users/me`,
  REFRESH:                `${BASE}/users/refresh`,
  RECUPERAR_CONTRASENA:   `${BASE}/auth/recuperar-contrasena`,
  RESTABLECER_CONTRASENA: `${BASE}/auth/restablecer-contrasena`,
  IFRAME_TOKEN:           `${BASE}/users/iframe-token`,
} as const;