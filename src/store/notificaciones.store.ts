import { create } from 'zustand';
import { Notificacion } from '@/types/models/Notificacion';

interface NotificacionesState {
  notificaciones: Notificacion[];
  setNotificaciones: (notificaciones: Notificacion[]) => void;
  marcarLeida: (id: string) => void;
  marcarTodasLeidas: () => void;
}

export const useNotificacionesStore = create<NotificacionesState>()((set) => ({
  notificaciones: [],

  setNotificaciones: (notificaciones) => set({ notificaciones }),

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
}));
