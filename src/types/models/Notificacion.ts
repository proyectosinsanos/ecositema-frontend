import { MicroservicioKey } from '@/types/Microservicio/MicroservicioKey.enum';

/**
 * Notificación del ecosistema.
 * TODO: Confirmar estructura con el backend cuando esté definida en la BD.
 */
export interface Notificacion {
  id:               string;
  titulo:           string;
  mensaje:          string;
  leida:            boolean;
  fecha:            string; // ISO 8601
  microservicioKey?: MicroservicioKey; // microservicio de origen (ausente = ecosistema)
  link?:            string;            // ruta interna del microservicio para deep link
}
