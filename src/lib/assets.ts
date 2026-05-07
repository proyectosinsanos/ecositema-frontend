const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

/**
 * Construye la URL completa de un asset del backend.
 * Si la ruta ya es absoluta (http/https) o es un path local (/public),
 * la devuelve sin modificar.
 */
export function assetUrl(path: string | undefined | null): string | undefined {
  if (!path) return undefined;
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('/')) {
    return path;
  }
  return `${API_BASE}/${path}`;
}
