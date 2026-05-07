import { MicroservicioKey } from './MicroservicioKey.enum';

export interface MenuItemMicroservicio {
  label: string;
  icono: string;
  link:  string;
}

export interface Microservicio {
  key:        MicroservicioKey;
  label:      string;
  icono:      string;    // Nombre del ícono en Material Symbols Outlined (fallback)
  logoIcono?: string;    // Ruta en /public para el ícono SVG (sidebar)
  url:        string;
  urlBackend: string;
  menu:       MenuItemMicroservicio[];
}
