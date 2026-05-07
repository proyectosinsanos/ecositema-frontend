'use client';

import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import { serviciosPorHora } from '../data/mock';
import { tooltipStyle } from '../data/chartStyles';
import ChartCard from './ChartCard';

export default function ServiciosPorHoraChart() {
  return (
    <ChartCard
      title="Servicios por hora"
      subtitle="Volumen y tiempo promedio — hoy"

      legend={
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-primary opacity-85" /><span className="text-xs text-ink-muted">Servicios</span></div>
          <div className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-warning" /><span className="text-xs text-ink-muted">Tiempo promedio</span></div>
        </div>
      }
    >
      <ResponsiveContainer width="100%" height={240}>
        <ComposedChart data={serviciosPorHora} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          <XAxis dataKey="hora" tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="left"  tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} unit=" min" />
          <Tooltip contentStyle={tooltipStyle.contentStyle} labelStyle={tooltipStyle.labelStyle} itemStyle={tooltipStyle.itemStyle} cursor={tooltipStyle.cursor} />
          <Bar yAxisId="left" dataKey="servicios" name="Servicios" fill="var(--color-primary)" opacity={0.85} radius={[3, 3, 0, 0]} />
          <Line yAxisId="right" type="monotone" dataKey="tiempoPromedio" name="Tiempo prom." stroke="var(--color-warning)" strokeWidth={2} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
