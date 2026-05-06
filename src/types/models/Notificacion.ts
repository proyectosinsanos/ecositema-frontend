import { ProductoEnum } from '@/types/Producto';
import { ServicioEnum } from '@/types/Servicio';

export interface Notificacion {
  uuid:     string;
  title:    string;
  message:  string;
  producto: ProductoEnum;
  servicio: ServicioEnum;
  fecha:    string;
  is_read:  boolean;
}
