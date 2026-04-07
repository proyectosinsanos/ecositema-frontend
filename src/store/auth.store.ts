import { create } from 'zustand';
import { Usuario } from '@/types/models/Usuario';
import { Empresa } from '@/types/models/Empresa';
import { ServicioName } from '@/types/Servicio/ServicioName.enum';

interface AuthState {
  usuario: Usuario | null;
  empresa: Empresa | null;
  /** Servicios contratados por la empresa del usuario (de usuario_servicio) */
  servicios: ServicioName[];

  setUsuario: (usuario: Usuario) => void;
  setEmpresa: (empresa: Empresa) => void;
  setServicios: (servicios: ServicioName[]) => void;
  limpiar: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  usuario:   null,
  empresa:   null,
  servicios: [],

  setUsuario:   (usuario)   => set({ usuario }),
  setEmpresa:   (empresa)   => set({ empresa }),
  setServicios: (servicios) => set({ servicios }),

  limpiar: () => set({ usuario: null, empresa: null, servicios: [] }),
}));
