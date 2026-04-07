/**
 * Claves únicas de cada microservicio del ecosistema.
 * Los valores deben coincidir con ServicioName.enum.ts (columna servicio.name en la BD).
 *
 * Al agregar uno nuevo:
 *  1. Añadir el valor aquí y en ServicioName.enum.ts con el mismo string.
 *  2. Añadir la entrada en src/config/microservicios.config.ts.
 *  3. Añadir la variable de entorno NEXT_PUBLIC_URL_MICROSERVICIO_<CLAVE> en .env.local.
 */
export enum MicroservicioKey {
  CISTEM_VISION = 'CistemVision',
  // TODO: Agregar los demás microservicios del ecosistema
}
