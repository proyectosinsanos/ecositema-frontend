const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

export const NOTIFICACIONES_ENDPOINTS = {
  LISTAR:       `${BASE}/notificaciones`,
  MARCAR_LEIDA:  `${BASE}/notificaciones/leer`,
  MARCAR_TODAS: `${BASE}/notificaciones/leer-todas`,
} as const;
