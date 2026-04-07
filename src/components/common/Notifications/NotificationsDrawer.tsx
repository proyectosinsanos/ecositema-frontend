'use client';

import { useUiStore } from '@/store/ui.store';
import { useNotificacionesStore } from '@/store/notificaciones.store';
import { NOTIFICACIONES_ENDPOINTS } from '@/api/notificaciones.endpoints';

function tiempoRelativo(fecha: string): string {
  const diff  = Date.now() - new Date(fecha).getTime();
  const mins  = Math.floor(diff / 60000);
  const horas = Math.floor(mins / 60);
  const dias  = Math.floor(horas / 24);

  if (mins < 1)   return 'ahora';
  if (mins < 60)  return `hace ${mins}m`;
  if (horas < 24) return `hace ${horas}h`;
  return `hace ${dias}d`;
}

export default function NotificationsDrawer() {
  const { notifOpen } = useUiStore();
  const { notificaciones, marcarLeida, marcarTodasLeidas } = useNotificacionesStore();

  const noLeidas = notificaciones.filter((n) => !n.leida).length;

  const handleMarcarLeida = async (id: string) => {
    marcarLeida(id);
    // TODO: Reemplazar con llamada real a la API
    await fetch(NOTIFICACIONES_ENDPOINTS.MARCAR_LEIDA(id), {
      method: 'PATCH',
      credentials: 'include',
    }).catch(() => {});
  };

  const handleMarcarTodas = async () => {
    marcarTodasLeidas();
    // TODO: Reemplazar con llamada real a la API
    await fetch(NOTIFICACIONES_ENDPOINTS.MARCAR_TODAS, {
      method: 'PATCH',
      credentials: 'include',
    }).catch(() => {});
  };

  return (
    <div
      className={`shrink-0 overflow-hidden transition-[width] duration-300 ease-in-out bg-bg border-l border-border
        ${notifOpen ? 'w-80' : 'w-0'}`}
    >
      <div className="w-80 h-full flex flex-col">

        {/* Header del drawer */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-border shrink-0">
          <span className="text-sm font-semibold text-text">Notificaciones</span>
          {noLeidas > 0 && (
            <button
              onClick={handleMarcarTodas}
              className="text-xs text-primary hover:text-primary-dark transition-colors"
            >
              Marcar todas como leídas
            </button>
          )}
        </div>

        {/* Lista */}
        <div className="flex-1 overflow-y-auto">
          {notificaciones.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-16 text-text-muted">
              <span className="material-symbols-outlined text-[40px]">notifications_off</span>
              <span className="text-sm">Sin notificaciones</span>
            </div>
          ) : (
            notificaciones.map((n) => (
              <button
                key={n.id}
                onClick={() => !n.leida && handleMarcarLeida(n.id)}
                className={`flex items-start gap-3 w-full px-4 py-3 text-left border-b border-border last:border-0 transition-colors hover:bg-surface
                  ${!n.leida ? 'bg-primary/5' : ''}`}
              >
                <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${!n.leida ? 'bg-primary' : 'bg-transparent'}`} />

                <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                  <span className={`text-sm ${!n.leida ? 'font-semibold text-text' : 'font-medium text-text-muted'}`}>
                    {n.titulo}
                  </span>
                  <span className="text-xs text-text-muted line-clamp-2">{n.mensaje}</span>
                  <span className="text-xs text-text-muted mt-0.5">{tiempoRelativo(n.fecha)}</span>
                </div>
              </button>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
