import { create } from 'zustand';
import { UsuarioSesionDto }  from '@/types/Usuario';
import { EmpresaSesionDto }  from '@/types/Empresa';
import { Producto }          from '@/types/models';
import { Microservicio }     from '@/types/Microservicio';

interface AuthState {
  usuario:             UsuarioSesionDto | null;
  empresa:             EmpresaSesionDto | null;
  productos:           Producto[];
  productoActivo:      Producto | null;
  microservicioActivo: Microservicio | null;

  setUsuario:             (usuario: UsuarioSesionDto) => void;
  setEmpresa:             (empresa: EmpresaSesionDto) => void;
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
