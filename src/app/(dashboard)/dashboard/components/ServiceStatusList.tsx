interface Service {
  name: string;
  status: 'online' | 'degraded' | 'offline';
  uptime: string;
  latency: string;
}

const services: Service[] = [
  { name: 'Cistem Vision',    status: 'online',   uptime: '99.8%', latency: '42ms'  },
  { name: 'Auth Service',     status: 'online',   uptime: '100%',  latency: '18ms'  },
  { name: 'Notification Hub', status: 'online',   uptime: '99.5%', latency: '65ms'  },
  { name: 'AI Analyzer',      status: 'degraded', uptime: '97.2%', latency: '210ms' },
  { name: 'Storage Service',  status: 'online',   uptime: '99.9%', latency: '31ms'  },
];

const statusConfig = {
  online:   { label: 'En línea',  dot: 'bg-success', text: 'text-success'  },
  degraded: { label: 'Degradado', dot: 'bg-warning', text: 'text-warning'  },
  offline:  { label: 'Offline',   dot: 'bg-error',   text: 'text-error'    },
};

export default function ServiceStatusList() {
  return (
    <div className="bg-surface-muted border border-line rounded-xl p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-ink">Estado de servicios</h3>
        <p className="text-xs text-ink-muted mt-0.5">Microservicios activos</p>
      </div>
      <div className="flex flex-col gap-3">
        {services.map((s) => {
          const cfg = statusConfig[s.status];
          return (
            <div key={s.name} className="flex items-center justify-between py-2 border-b border-line last:border-0">
              <div className="flex items-center gap-2.5">
                <span className={`w-2 h-2 rounded-full shrink-0 ${cfg.dot} ${s.status === 'online' ? 'animate-pulse' : ''}`} />
                <span className="text-sm font-medium text-ink">{s.name}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-ink-muted">{s.uptime}</span>
                <span className="text-xs text-ink-muted w-12 text-right">{s.latency}</span>
                <span className={`text-xs font-medium ${cfg.text} w-16 text-right`}>{cfg.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
