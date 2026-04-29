'use client';

import { useUiStore, useNotificacionesStore, useAuthStore } from '@/store';
import { NOTIFICACIONES_ENDPOINTS } from '@/api';
import { MICROSERVICIOS } from '@/config';
import { Notificacion } from '@/types/models';

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

function OrigenNotificacion({ notificacion }: { notificacion: Notificacion }) {
  if (!notificacion.microservicioKey) return null;

  const microservicio = MICROSERVICIOS.find((m) => m.key === notificacion.microservicioKey);
  if (!microservicio) return null;

  return (
    <span className="flex items-center gap-1 text-xs text-ink-muted">
      <span className="material-symbols-outlined text-[13px] leading-none">{microservicio.icono}</span>
      {microservicio.label}
    </span>
  );
}

export default function NotificationsDrawer() {
  const { notifOpen } = useUiStore();
  const { notificaciones, marcarLeida, marcarTodasLeidas, eliminar } = useNotificacionesStore();
  const { setMicroservicioActivo, setNavegacion } = useAuthStore();

  const noLeidas = notificaciones.filter((n) => !n.leida).length;

  const handleClick = async (n: Notificacion) => {
    if (!n.leida) {
      marcarLeida(n.id);
      await fetch(NOTIFICACIONES_ENDPOINTS.MARCAR_LEIDA(n.id), {
        method: 'PATCH',
        credentials: 'include',
      }).catch(() => {});
    }

    if (n.microservicioKey) {
      const microservicio = MICROSERVICIOS.find((m) => m.key === n.microservicioKey);
      if (microservicio) {
        setMicroservicioActivo(microservicio);
        if (n.link) setNavegacion(n.link);
      }
    }
  };

  const handleEliminar = async (id: string) => {
    eliminar(id);
  };

  const handleMarcarTodas = async () => {
    marcarTodasLeidas();
    await fetch(NOTIFICACIONES_ENDPOINTS.MARCAR_TODAS, {
      method: 'PATCH',
      credentials: 'include',
    }).catch(() => {});
  };

  return (
    <div
      className={`shrink-0 overflow-hidden transition-[width] duration-300 ease-in-out bg-surface border-l border-line
        ${notifOpen ? 'w-80' : 'w-0'}`}
    >
      <div className="w-80 h-full flex flex-col">

        {/* Header del drawer */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-line shrink-0">
          <span className="text-lg font-semibold text-ink">Notificaciones</span>
          {noLeidas > 0 && (
            <button
              onClick={handleMarcarTodas}
              className="text-xs text-primary-dark hover:text-primary-dark/70 transition-colors"
            >
              Marcar todas como leídas
            </button>
          )}
        </div>

        {/* Lista */}
        <div className="flex-1 overflow-y-auto">
          {notificaciones.length === 0 ? (
            <div className="flex flex-col items-center gap-2 py-16 text-ink-muted">
              <span className="material-symbols-outlined text-[40px]">notifications_off</span>
              <span className="text-sm">Sin notificaciones</span>
            </div>
          ) : (
            notificaciones.map((n) => (
              <div
                key={n.id}
                className={`relative flex items-start gap-3 w-full px-4 py-3 border-b border-line last:border-0 group transition-colors hover:bg-surface-muted
                  ${!n.leida ? 'bg-primary/5 hover:bg-primary/10' : ''}`}
              >
                <button
                  onClick={() => handleClick(n)}
                  className="flex items-start gap-3 flex-1 text-left min-w-0"
                >
                  <span className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${!n.leida ? 'bg-primary-dark' : 'bg-transparent'}`} />

                  <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                    <span className={`text-sm ${!n.leida ? 'font-semibold text-ink' : 'font-medium text-ink-muted'}`}>
                      {n.titulo}
                    </span>
                    <span className="text-xs text-ink-muted line-clamp-2">{n.mensaje}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <OrigenNotificacion notificacion={n} />
                      {n.microservicioKey && <span className="text-xs text-ink-muted">·</span>}
                      <span className="text-xs text-ink-muted">{tiempoRelativo(n.fecha)}</span>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleEliminar(n.id)}
                  className="shrink-0 mt-0.5 p-0.5 rounded text-ink-muted hover:text-ink hover:bg-surface-muted transition-colors opacity-0 group-hover:opacity-100"
                >
                  <span className="material-symbols-outlined text-base leading-none">close</span>
                </button>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
