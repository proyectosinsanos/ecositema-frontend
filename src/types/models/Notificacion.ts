import { ProductoEnum } from '@/types/Producto';
import { ServicioEnum } from '../Servicio/ServicioEnum.enum';

/* export class NotificacionDto {
    uuid: string;
    title: string
    message: string;
    producto: ProductoEnum;
    servicio: ServicioEnum;
    fecha: Date;
    is_read: boolean;
}; */

export interface Notificacion {
  uuid:     string;
  title:    string;
  message:  string;
  producto: ProductoEnum;
  servicio: ServicioEnum;
  fecha:    string;
  is_read:  boolean;
}
