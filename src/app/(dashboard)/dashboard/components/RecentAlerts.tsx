const alerts = [
  { id: 1, msg: 'Cámara CAM-03 sin señal',           time: 'hace 8 min',  severity: 'error'   },
  { id: 2, msg: 'Movimiento en zona restringida',     time: 'hace 47 min', severity: 'warning' },
  { id: 3, msg: 'Latencia elevada en AI Analyzer',   time: 'hace 1h',     severity: 'warning' },
  { id: 4, msg: 'Acceso no autorizado bloqueado',     time: 'hace 2h',     severity: 'error'   },
  { id: 5, msg: 'Reporte semanal generado',           time: 'hace 3h',     severity: 'info'    },
];

const severityConfig = {
  error:   { bar: 'bg-error',   badge: 'bg-error/10 text-error',     dot: 'bg-error'   },
  warning: { bar: 'bg-warning', badge: 'bg-warning/10 text-warning', dot: 'bg-warning' },
  info:    { bar: 'bg-info',    badge: 'bg-info/10 text-info',       dot: 'bg-info'    },
};

export default function RecentAlerts() {
  return (
    <div className="bg-surface-muted border border-line rounded-xl p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-ink">Alertas recientes</h3>
        <p className="text-xs text-ink-muted mt-0.5">Últimas 24 horas</p>
      </div>
      <div className="flex flex-col gap-2">
        {alerts.map((a) => {
          const cfg = severityConfig[a.severity as keyof typeof severityConfig];
          return (
            <div key={a.id} className="flex items-center gap-3 p-3 rounded-lg bg-surface-alt hover:bg-surface-alt/80 transition-colors">
              <div className={`w-1 h-8 rounded-full shrink-0 ${cfg.bar}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-ink truncate">{a.msg}</p>
                <p className="text-xs text-ink-muted mt-0.5">{a.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
