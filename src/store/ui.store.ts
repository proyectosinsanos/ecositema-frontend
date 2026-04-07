import { create } from 'zustand';

interface UiState {
  sidebarOpen: boolean;
  notifOpen:   boolean;
  toggleSidebar: () => void;
  closeSidebar:  () => void;
  toggleNotif:   () => void;
  closeNotif:    () => void;
}

export const useUiStore = create<UiState>()((set) => ({
  sidebarOpen: false,
  notifOpen:   false,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  closeSidebar:  () => set({ sidebarOpen: false }),

  toggleNotif: () => set((state) => ({ notifOpen: !state.notifOpen })),
  closeNotif:  () => set({ notifOpen: false }),
}));
