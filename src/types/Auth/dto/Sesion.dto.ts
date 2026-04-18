import { UsuarioSesionDto } from '@/types/Usuario';
import { EmpresaSesionDto } from '@/types/Empresa';
import { Producto }         from '@/types/models';

export interface SesionDto {
  usuario:   UsuarioSesionDto;
  empresa:   EmpresaSesionDto;
  productos: Producto[];
}
