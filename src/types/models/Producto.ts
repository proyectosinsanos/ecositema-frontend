import { MicroservicioKey } from '@/types/Microservicio';

/**
 * Un producto es un conjunto de microservicios contratados por una empresa.
 * Cada empresa puede tener uno o varios productos, cada uno con su propio
 * set de microservicios.
 * TODO: Confirmar estructura con el backend cuando esté definida en la BD.
 */
export interface Producto {
  id_producto:   number;
  nombre:        string;
  microservicios: MicroservicioKey[];
  logoIcono?:      string; // ruta en /public para el ícono cuadrado (sidebar)
  logoCompleto?:   string; // ruta en /public para el logo horizontal (header, light)
  logoCompletoDark?: string; // ruta en /public para el logo horizontal en dark mode
}
