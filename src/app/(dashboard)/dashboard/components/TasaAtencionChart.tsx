'use client';

import {
  ComposedChart, Area, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import { serviciosPorHora } from '../data/mock';

const data = serviciosPorHora.map((d) => ({
  hora:           d.hora,
  sinDespachador: d.sinDespachador,
  tasaAtencion:   Math.round(((d.servicios - d.sinDespachador) / d.servicios) * 100),
}));

export default function TasaAtencionChart() {
  return (
    <div className="bg-surface-muted border border-line rounded-xl p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-ink">Calidad de atención por hora</h3>
        <p className="text-xs text-ink-muted mt-0.5">Tasa de atención (%) y servicios sin despachador</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <ComposedChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="gradTasa" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="var(--color-success)" stopOpacity={0.2} />
              <stop offset="95%" stopColor="var(--color-success)" stopOpacity={0}   />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          <XAxis dataKey="hora" tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="left"  tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} unit="%" domain={[60, 100]} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: 12, color: 'var(--color-text)' }}
            cursor={{ stroke: 'var(--color-border-strong)', strokeWidth: 1 }}
          />
          <Area yAxisId="left" type="monotone" dataKey="tasaAtencion" name="Tasa atención" stroke="var(--color-success)" strokeWidth={2} fill="url(#gradTasa)" />
          <Bar yAxisId="right" dataKey="sinDespachador" name="Sin despachador" fill="var(--color-error)" opacity={0.7} radius={[3, 3, 0, 0]} />
        </ComposedChart>
      </ResponsiveContainer>
      <div className="flex gap-4 mt-1">
        <div className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-success" /><span className="text-xs text-ink-muted">Tasa de atención</span></div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-error opacity-70" /><span className="text-xs text-ink-muted">Sin despachador</span></div>
      </div>
    </div>
  );
}
