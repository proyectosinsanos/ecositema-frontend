import { UsuarioSesionDto }          from '@/types/Usuario';
import { EmpresaSesionDto, EmpresaType } from '@/types/Empresa';
import { Producto, Notificacion }    from '@/types/models';
import { MicroservicioKey }          from '@/types/Microservicio';
import { ProductoEnum }              from '@/types/Producto';
import { ServicioEnum } from '@/types/Servicio/ServicioEnum.enum';

export const MOCK_USUARIO: UsuarioSesionDto = {
  id_usuario: 1,
  name:       'Erick',
  last_name:  'Báez',
  email:      'ebaez@cistemlabs.io',
};

export const MOCK_EMPRESA: EmpresaSesionDto = {
  id_empresa: 1,
  name:       'Cistem Labs',
  type:       'TECNOLOGIA' as unknown as EmpresaType,
};

export const MOCK_PRODUCTOS: Producto[] = [
  {
    id_producto:    1,
    nombre:         'AI-CistemGas',
    microservicios: [MicroservicioKey.CISTEM_VISION],
    logoIcono:        '/CistemGasIcono.svg',
    logoCompleto:     '/AicistemgasHeader.svg',
    logoCompletoDark: '/AicistemgasHeaderDark.svg',
  },
  {
    id_producto:    2,
    nombre:         'Cistem Living',
    microservicios: [],
  },
];

const now = Date.now();
const mins = (m: number) => new Date(now - m * 60_000).toISOString();

// TODO: Actualizar producto y servicio con los valores reales del enum cuando estén definidos
export const MOCK_NOTIFICACIONES: Notificacion[] = [
  {
    uuid:     '1',
    title:    'Cámara sin señal detectada',
    message:  'La cámara CAM-03 del local Centro no envía señal desde hace 10 minutos.',
    is_read:  false,
    fecha:    mins(8),
    producto: 'AI_CISTEM_GAS' as unknown as ProductoEnum,
    servicio: ServicioEnum.CISTEM_VISION,
  },
  {
    uuid:     '2',
    title:    'Alerta de movimiento nocturno',
    message:  'Se detectó movimiento en zona restringida (Almacén B) a las 02:34 a.m.',
    is_read:  false,
    fecha:    mins(47),
    producto: 'AI_CISTEM_GAS' as unknown as ProductoEnum,
    servicio: ServicioEnum.CISTEM_VISION,
  },
  {
    uuid:     '3',
    title:    'Nuevo usuario agregado',
    message:  'El administrador agregó a María González con rol Supervisor.',
    is_read:  false,
    fecha:    mins(130),
    producto: 'ECOSISTEMA' as unknown as ProductoEnum,
    servicio: ServicioEnum.CISTEM_VISION,
  },
  {
    uuid:     '4',
    title:    'Reporte semanal disponible',
    message:  'El reporte de actividad de la semana del 31 de marzo ya está disponible.',
    is_read:  true,
    fecha:    mins(1500),
    producto: 'AI_CISTEM_GAS' as unknown as ProductoEnum,
    servicio: ServicioEnum.CISTEM_VISION,
  },
  {
    uuid:     '5',
    title:    'Mantenimiento programado',
    message:  'El sistema estará en mantenimiento el sábado 12 de abril de 2:00 a 4:00 a.m.',
    is_read:  true,
    fecha:    mins(2880),
    producto: 'ECOSISTEMA' as unknown as ProductoEnum,
    servicio: ServicioEnum.CISTEM_VISION,
  },
];
