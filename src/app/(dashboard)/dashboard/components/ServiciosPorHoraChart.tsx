'use client';

import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { serviciosPorHora } from '../data/mock';

export default function ServiciosPorHoraChart() {
  return (
    <div className="bg-surface-muted border border-line rounded-xl p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-ink">Servicios por hora</h3>
        <p className="text-xs text-ink-muted mt-0.5">Volumen y tiempo promedio — hoy</p>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <ComposedChart data={serviciosPorHora} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          <XAxis dataKey="hora" tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="left"  tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} unit=" min" />
          <Tooltip
            contentStyle={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: 12, color: 'var(--color-text)' }}
            cursor={{ fill: 'var(--color-border)', opacity: 0.3 }}
          />
          <Bar yAxisId="left" dataKey="servicios" name="Servicios" fill="var(--color-primary)" opacity={0.85} radius={[3, 3, 0, 0]} />
          <Line yAxisId="right" type="monotone" dataKey="tiempoPromedio" name="Tiempo prom." stroke="var(--color-warning)" strokeWidth={2} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
      <div className="flex gap-4 mt-1">
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-primary opacity-85" /><span className="text-xs text-ink-muted">Servicios</span></div>
        <div className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-warning" /><span className="text-xs text-ink-muted">Tiempo promedio</span></div>
      </div>
    </div>
  );
}
