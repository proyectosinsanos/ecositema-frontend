'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { hora: '00:00', eventos: 4,  alertas: 1 },
  { hora: '02:00', eventos: 2,  alertas: 0 },
  { hora: '04:00', eventos: 3,  alertas: 1 },
  { hora: '06:00', eventos: 8,  alertas: 2 },
  { hora: '08:00', eventos: 24, alertas: 3 },
  { hora: '10:00', eventos: 31, alertas: 4 },
  { hora: '12:00', eventos: 28, alertas: 2 },
  { hora: '14:00', eventos: 35, alertas: 5 },
  { hora: '16:00', eventos: 42, alertas: 6 },
  { hora: '18:00', eventos: 38, alertas: 4 },
  { hora: '20:00', eventos: 22, alertas: 3 },
  { hora: '22:00', eventos: 10, alertas: 1 },
];

export default function ActivityChart() {
  return (
    <div className="bg-surface-muted border border-line rounded-xl p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-ink">Actividad del sistema</h3>
        <p className="text-xs text-ink-muted mt-0.5">Eventos y alertas por hora — hoy</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="gradEventos" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="var(--color-primary)" stopOpacity={0.25} />
              <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradAlertas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="var(--color-error)" stopOpacity={0.25} />
              <stop offset="95%" stopColor="var(--color-error)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          <XAxis
            dataKey="hora"
            tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              fontSize: 12,
              color: 'var(--color-text)',
            }}
            cursor={{ stroke: 'var(--color-border-strong)', strokeWidth: 1 }}
          />
          <Area
            type="monotone"
            dataKey="eventos"
            name="Eventos"
            stroke="var(--color-primary)"
            strokeWidth={2}
            fill="url(#gradEventos)"
          />
          <Area
            type="monotone"
            dataKey="alertas"
            name="Alertas"
            stroke="var(--color-error)"
            strokeWidth={2}
            fill="url(#gradAlertas)"
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="flex gap-4 mt-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-primary" />
          <span className="text-xs text-ink-muted">Eventos</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-error" />
          <span className="text-xs text-ink-muted">Alertas</span>
        </div>
      </div>
    </div>
  );
}
