import { MicroservicioKey } from './MicroservicioKey.enum';

export interface MenuItemMicroservicio {
  label: string;
  icono: string;
  link:  string;
}

export interface Microservicio {
  key:    MicroservicioKey;
  label:  string;
  icono:  string; // Nombre del ícono en Material Symbols Outlined
  url:    string; // URL del frontend (iframe) — NEXT_PUBLIC_URL_MICROSERVICIO_<KEY>
  urlBackend: string; // URL del backend — NEXT_PUBLIC_API_MICROSERVICIO_<KEY>
  menu:   MenuItemMicroservicio[];
}
