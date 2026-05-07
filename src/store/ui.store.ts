import { create } from 'zustand';

interface UiState {
  sidebarOpen: boolean;
  notifOpen:   boolean;
  theme:       'light' | 'dark';
  toggleSidebar: () => void;
  closeSidebar:  () => void;
  toggleNotif:   () => void;
  closeNotif:    () => void;
  toggleTheme:   () => void;
}

function applyTheme(theme: 'light' | 'dark') {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('theme', theme);
}

const savedTheme = typeof window !== 'undefined'
  ? (localStorage.getItem('theme') as 'light' | 'dark' | null) ?? 'light'
  : 'light';

if (typeof document !== 'undefined') {
  document.documentElement.dataset.theme = savedTheme;
}

export const useUiStore = create<UiState>()((set) => ({
  sidebarOpen: false,
  notifOpen:   false,
  theme:       savedTheme,

  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  closeSidebar:  () => set({ sidebarOpen: false }),

  toggleNotif: () => set((state) => ({ notifOpen: !state.notifOpen })),
  closeNotif:  () => set({ notifOpen: false }),

  toggleTheme: () => set((state) => {
    const next = state.theme === 'light' ? 'dark' : 'light';
    applyTheme(next);
    return { theme: next };
  }),
}));
