import { ServicioEnum } from '@/types/Servicio';

export interface Servicio {
  id_servicio: number;
  name: ServicioEnum;
  description: string;
  created: string;
  updated: string;
  deleted: string | null;
}
