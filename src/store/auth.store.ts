import { create } from 'zustand';
import { Usuario } from '@/types/models/Usuario';
import { Empresa } from '@/types/models/Empresa';
import { Producto } from '@/types/models/Producto';

interface AuthState {
  usuario:        Usuario | null;
  empresa:        Empresa | null;
  productos:      Producto[];
  productoActivo: Producto | null;

  setUsuario:        (usuario: Usuario) => void;
  setEmpresa:        (empresa: Empresa) => void;
  setProductos:      (productos: Producto[]) => void;
  setProductoActivo: (producto: Producto | null) => void;
  limpiar:           () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  usuario:        null,
  empresa:        null,
  productos:      [],
  productoActivo: null,

  setUsuario:        (usuario)        => set({ usuario }),
  setEmpresa:        (empresa)        => set({ empresa }),
  setProductos:      (productos)      => set({ productos }),
  setProductoActivo: (productoActivo) => set({ productoActivo }),

  limpiar: () => set({ usuario: null, empresa: null, productos: [], productoActivo: null }),
}));
