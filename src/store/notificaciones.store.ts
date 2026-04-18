import { create } from 'zustand';
import { Notificacion } from '@/types/models';

interface NotificacionesState {
  notificaciones: Notificacion[];
  setNotificaciones: (notificaciones: Notificacion[]) => void;
  agregar: (notificacion: Notificacion) => void;
  marcarLeida: (id: string) => void;
  marcarTodasLeidas: () => void;
  eliminar: (id: string) => void;
}

export const useNotificacionesStore = create<NotificacionesState>()((set) => ({
  notificaciones: [],

  setNotificaciones: (notificaciones) => set({ notificaciones }),

  agregar: (notificacion) =>
    set((state) => ({ notificaciones: [notificacion, ...state.notificaciones] })),

  marcarLeida: (id) =>
    set((state) => ({
      notificaciones: state.notificaciones.map((n) =>
        n.id === id ? { ...n, leida: true } : n
      ),
    })),

  marcarTodasLeidas: () =>
    set((state) => ({
      notificaciones: state.notificaciones.map((n) => ({ ...n, leida: true })),
    })),

  eliminar: (id) =>
    set((state) => ({
      notificaciones: state.notificaciones.filter((n) => n.id !== id),
    })),
}));
