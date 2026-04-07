import { EmpresaType } from '@/types/Empresa/EmpresaType.enum';

export interface Empresa {
  id_empresa: number;
  name: string;
  description: string;
  type: EmpresaType;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
