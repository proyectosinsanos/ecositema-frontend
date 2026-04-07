import { create } from 'zustand';
import { Usuario } from '@/types/models/Usuario';
import { Empresa } from '@/types/models/Empresa';
import { Producto } from '@/types/models/Producto';
import { Microservicio } from '@/types/Microservicio/Microservicio.type';

interface AuthState {
  usuario:             Usuario | null;
  empresa:             Empresa | null;
  productos:           Producto[];
  productoActivo:      Producto | null;
  microservicioActivo: Microservicio | null;

  setUsuario:             (usuario: Usuario) => void;
  setEmpresa:             (empresa: Empresa) => void;
  setProductos:           (productos: Producto[]) => void;
  setProductoActivo:      (producto: Producto | null) => void;
  setMicroservicioActivo: (microservicio: Microservicio | null) => void;
  limpiar:                () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  usuario:             null,
  empresa:             null,
  productos:           [],
  productoActivo:      null,
  microservicioActivo: null,

  setUsuario:             (usuario)             => set({ usuario }),
  setEmpresa:             (empresa)             => set({ empresa }),
  setProductos:           (productos)           => set({ productos }),
  setProductoActivo:      (productoActivo)      => set({ productoActivo, microservicioActivo: null }),
  setMicroservicioActivo: (microservicioActivo) => set({ microservicioActivo }),

  limpiar: () => set({ usuario: null, empresa: null, productos: [], productoActivo: null, microservicioActivo: null }),
}));
