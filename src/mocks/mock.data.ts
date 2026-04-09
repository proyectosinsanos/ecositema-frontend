import { Usuario }      from '@/types/models/Usuario';
import { Empresa }      from '@/types/models/Empresa';
import { Producto }     from '@/types/models/Producto';
import { Notificacion } from '@/types/models/Notificacion';
import { EmpresaType }  from '@/types/Empresa/EmpresaType.enum';
import { MicroservicioKey } from '@/types/Microservicio/MicroservicioKey.enum';

export const MOCK_USUARIO: Usuario = {
  id_usuario: 1,
  name:       'Erick',
  last_name:  'Báez',
  email:      'ebaez@cistemlabs.io',
  id_empresa: 1,
  last_seen:  new Date().toISOString(),
  created:    '2024-01-15T08:00:00.000Z',
  updated:    '2025-04-01T10:00:00.000Z',
  deleted:    null,
};

export const MOCK_EMPRESA: Empresa = {
  id_empresa:  1,
  name:        'Cistem Labs',
  description: 'Plataforma de microservicios para gestión inteligente.',
  type:        'TECNOLOGIA' as unknown as EmpresaType,
  created_at:  '2023-06-01T00:00:00.000Z',
  updated_at:  '2025-01-01T00:00:00.000Z',
  deleted_at:  null,
};

export const MOCK_PRODUCTOS: Producto[] = [
  {
    id_producto:    1,
    nombre:         'Cistem GAS',
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
