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
    menu: [
      { label: 'Cámaras',    icono: 'camera_indoor' },
      { label: 'Alertas',    icono: 'notification_important' },
      { label: 'Reportes',   icono: 'assessment' },
      { label: 'Configuración', icono: 'settings' },
      // TODO: Definir menú real con el equipo de Cistem Vision
    ],
  },
  // TODO: Registrar los demás microservicios del ecosistema
];
