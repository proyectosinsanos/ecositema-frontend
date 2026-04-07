'use client';

import { useUiStore } from '@/store/ui.store';
import { useNotificacionesStore } from '@/store/notificaciones.store';

export default function Notifications() {
  const { notifOpen, toggleNotif } = useUiStore();
  const { notificaciones } = useNotificacionesStore();

  const noLeidas = notificaciones.filter((n) => !n.leida).length;

  return (
    <button
      onClick={toggleNotif}
      className={`relative flex items-center justify-center w-9 h-9 rounded-lg transition-colors
        ${notifOpen ? 'bg-surface' : 'hover:bg-surface'}`}
    >
      <span className="material-symbols-outlined text-[22px] text-text-muted">notifications</span>

      {noLeidas > 0 && (
        <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-error text-white text-[10px] font-bold flex items-center justify-center leading-none">
          {noLeidas > 99 ? '99+' : noLeidas}
        </span>
      )}
    </button>
  );
}
