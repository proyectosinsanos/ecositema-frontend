'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { distribucionTiempos } from '../data/mock';
import { tooltipStyle } from '../data/chartStyles';
import ChartCard from './ChartCard';

const COLORS = [
  'var(--color-success)',
  'var(--color-info)',
  'var(--color-primary)',
  'var(--color-warning)',
  'var(--color-error)',
];

export default function DistribucionTiemposChart() {
  return (
    <ChartCard
      title="Distribución de tiempos"
      subtitle="Servicios por rango de duración"

    >
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={distribucionTiempos} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          <XAxis dataKey="rango" tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle.contentStyle} labelStyle={tooltipStyle.labelStyle} itemStyle={tooltipStyle.itemStyle} cursor={tooltipStyle.cursor} />
          <Bar dataKey="cantidad" name="Servicios" radius={[4, 4, 0, 0]}>
            {distribucionTiempos.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
