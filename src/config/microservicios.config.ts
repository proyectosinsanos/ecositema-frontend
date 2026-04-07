import { Microservicio } from '@/types/Microservicio/Microservicio.type';
import { MicroservicioKey } from '@/types/Microservicio/MicroservicioKey.enum';

/**
 * Catálogo de microservicios del ecosistema.
 * Al agregar uno nuevo, seguir los pasos indicados en MicroservicioKey.enum.ts.
 */
export const MICROSERVICIOS: Microservicio[] = [
  {
    key:   MicroservicioKey.CISTEM_VISION,
    label: 'Cistem Vision',
    icono: 'videocam',
    url:   process.env.NEXT_PUBLIC_URL_MICROSERVICIO_CISTEM_VISION ?? '',
  },
  // TODO: Registrar los demás microservicios del ecosistema
];
