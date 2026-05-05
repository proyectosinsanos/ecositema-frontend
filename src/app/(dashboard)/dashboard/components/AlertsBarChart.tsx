'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const data = [
  { dia: 'Lun', alertas: 5 },
  { dia: 'Mar', alertas: 8 },
  { dia: 'Mié', alertas: 3 },
  { dia: 'Jue', alertas: 12 },
  { dia: 'Vie', alertas: 7 },
  { dia: 'Sáb', alertas: 2 },
  { dia: 'Hoy', alertas: 9 },
];

export default function AlertsBarChart() {
  return (
    <div className="bg-surface-muted border border-line rounded-xl p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-ink">Alertas por día</h3>
        <p className="text-xs text-ink-muted mt-0.5">Últimos 7 días</p>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          <XAxis
            dataKey="dia"
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
            cursor={{ fill: 'var(--color-border)', opacity: 0.4 }}
          />
          <Bar dataKey="alertas" name="Alertas" radius={[4, 4, 0, 0]}>
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={i === data.length - 1 ? 'var(--color-primary)' : 'var(--color-primary-light)'}
                opacity={i === data.length - 1 ? 1 : 0.6}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
