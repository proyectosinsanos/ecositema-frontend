import { UsuarioSesionDto }          from '@/types/Usuario';
import { EmpresaSesionDto, EmpresaType } from '@/types/Empresa';
import { Producto, Notificacion }    from '@/types/models';
import { MicroservicioKey }          from '@/types/Microservicio';

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
  },
  {
    id_producto:    2,
    nombre:         'Cistem Living',
    microservicios: [],
  },
];

const now = Date.now();
const mins = (m: number) => new Date(now - m * 60_000).toISOString();

export const MOCK_NOTIFICACIONES: Notificacion[] = [
  {
    id:               '1',
    titulo:           'Cámara sin señal detectada',
    mensaje:          'La cámara CAM-03 del local Centro no envía señal desde hace 10 minutos.',
    leida:            false,
    fecha:            mins(8),
    microservicioKey: MicroservicioKey.CISTEM_VISION,
    link:             '/camaras/CAM-03',
  },
  {
    id:               '2',
    titulo:           'Alerta de movimiento nocturno',
    mensaje:          'Se detectó movimiento en zona restringida (Almacén B) a las 02:34 a.m.',
    leida:            false,
    fecha:            mins(47),
    microservicioKey: MicroservicioKey.CISTEM_VISION,
    link:             '/alertas',
  },
  {
    id:     '3',
    titulo: 'Nuevo usuario agregado',
    mensaje:'El administrador agregó a María González con rol Supervisor.',
    leida:  false,
    fecha:  mins(130),
    // Sin microservicioKey — notificación del ecosistema
  },
  {
    id:               '4',
    titulo:           'Reporte semanal disponible',
    mensaje:          'El reporte de actividad de la semana del 31 de marzo ya está disponible.',
    leida:            true,
    fecha:            mins(1500),
    microservicioKey: MicroservicioKey.CISTEM_VISION,
    link:             '/reportes',
  },
  {
    id:     '5',
    titulo: 'Mantenimiento programado',
    mensaje:'El sistema estará en mantenimiento el sábado 12 de abril de 2:00 a 4:00 a.m.',
    leida:  true,
    fecha:  mins(2880),
    // Sin microservicioKey — notificación del ecosistema
  },
];
