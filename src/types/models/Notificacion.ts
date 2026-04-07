/**
 * Notificación del ecosistema.
 * TODO: Confirmar estructura con el backend cuando esté definida en la BD.
 */
export interface Notificacion {
  id: string;
  titulo: string;
  mensaje: string;
  leida: boolean;
  fecha: string; // ISO 8601
}
