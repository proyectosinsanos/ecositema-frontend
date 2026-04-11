import { ServicioName } from '@/types/Servicio';

export interface Servicio {
  id_servicio: number;
  name: ServicioName;
  description: string;
  created: string;
  updated: string;
  deleted: string | null;
}
