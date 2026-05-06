import { create } from 'zustand';
import { Notificacion } from '@/types/models';

interface NotificacionesState {
  notificaciones: Notificacion[];
  setNotificaciones: (notificaciones: Notificacion[]) => void;
  agregar: (notificacion: Notificacion) => void;
  marcarLeida: (uuid: string) => void;
  marcarTodasLeidas: () => void;
  eliminar: (uuid: string) => void;
}

export const useNotificacionesStore = create<NotificacionesState>()((set) => ({
  notificaciones: [],

  setNotificaciones: (notificaciones) => set({ notificaciones }),

  agregar: (notificacion) =>
    set((state) => ({ notificaciones: [notificacion, ...state.notificaciones] })),

  marcarLeida: (uuid) =>
    set((state) => ({
      notificaciones: state.notificaciones.map((n) =>
        n.uuid === uuid ? { ...n, is_read: true } : n
      ),
    })),

  marcarTodasLeidas: () =>
    set((state) => ({
      notificaciones: state.notificaciones.map((n) => ({ ...n, is_read: true })),
    })),

  eliminar: (uuid) =>
    set((state) => ({
      notificaciones: state.notificaciones.filter((n) => n.uuid !== uuid),
    })),
}));
