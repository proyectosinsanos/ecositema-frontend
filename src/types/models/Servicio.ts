import { ServicioName } from '@/types/Servicio/ServicioName.enum';

export interface Servicio {
  id_servicio: number;
  name: ServicioName;
  description: string;
  created: string;
  updated: string;
  deleted: string | null;
}
