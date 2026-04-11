import { EmpresaType } from '@/types/Empresa/EmpresaType.enum'; // directo para evitar circular

/**
 * Proyección de la empresa devuelta por el backend en la sesión activa.
 * No incluye descripción ni timestamps — solo lo necesario para mostrar contexto al usuario.
 */
export interface EmpresaSesionDto {
  id_empresa: number;
  name:       string;
  type:       EmpresaType;
}
