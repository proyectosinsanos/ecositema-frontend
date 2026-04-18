import { MicroservicioKey } from './MicroservicioKey.enum';

export interface MenuItemMicroservicio {
  label: string;
  icono: string;
  link:  string;
}

export interface Microservicio {
  key: MicroservicioKey;
  label: string;
  icono: string; // Nombre del ícono en Material Symbols Outlined
  url: string;   // Valor de NEXT_PUBLIC_URL_MICROSERVICIO_<KEY>
  menu: MenuItemMicroservicio[];
}
