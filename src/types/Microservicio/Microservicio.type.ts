import { MicroservicioKey } from './MicroservicioKey.enum';

export interface MenuItemMicroservicio {
  label: string;
  icono: string;
  // TODO: Agregar navegación real cuando se integre el microservicio
}

export interface Microservicio {
  key: MicroservicioKey;
  label: string;
  icono: string; // Nombre del ícono en Material Symbols Outlined
  url: string;   // Valor de NEXT_PUBLIC_URL_MICROSERVICIO_<KEY>
  menu: MenuItemMicroservicio[];
}
