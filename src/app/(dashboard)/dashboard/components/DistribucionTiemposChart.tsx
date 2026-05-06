'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { distribucionTiempos } from '../data/mock';

const COLORS = [
  'var(--color-success)',
  'var(--color-info)',
  'var(--color-primary)',
  'var(--color-warning)',
  'var(--color-error)',
];

export default function DistribucionTiemposChart() {
  return (
    <div className="bg-surface-muted border border-line rounded-xl p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-ink">Distribución de tiempos</h3>
        <p className="text-xs text-ink-muted mt-0.5">Servicios por rango de duración</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={distribucionTiempos} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          <XAxis dataKey="rango" tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: 12, color: 'var(--color-text)' }}
            cursor={{ fill: 'var(--color-border)', opacity: 0.3 }}
          />
          <Bar dataKey="cantidad" name="Servicios" radius={[4, 4, 0, 0]}>
            {distribucionTiempos.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
