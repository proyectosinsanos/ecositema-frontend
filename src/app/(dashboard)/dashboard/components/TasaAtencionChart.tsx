'use client';

import {
  ComposedChart, Area, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import { serviciosPorHora } from '../data/mock';
import { tooltipStyle } from '../data/chartStyles';
import ChartCard from './ChartCard';

const data = serviciosPorHora.map((d) => ({
  hora:           d.hora,
  sinDespachador: d.sinDespachador,
  tasaAtencion:   Math.round(((d.servicios - d.sinDespachador) / d.servicios) * 100),
}));

export default function TasaAtencionChart() {
  return (
    <ChartCard
      title="Calidad de atención por hora"
      subtitle="Tasa de atención (%) y servicios sin despachador"

      legend={
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5"><span className="w-4 h-0.5 bg-success" /><span className="text-xs text-ink-muted">Tasa de atención</span></div>
          <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm" style={{ background: '#e05252' }} /><span className="text-xs text-ink-muted">Sin despachador</span></div>
        </div>
      }
    >
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
          <Tooltip contentStyle={tooltipStyle.contentStyle} labelStyle={tooltipStyle.labelStyle} itemStyle={tooltipStyle.itemStyle} cursor={tooltipStyle.cursorLine} />
          <Area yAxisId="left" type="monotone" dataKey="tasaAtencion" name="Tasa atención" stroke="var(--color-success)" strokeWidth={2} fill="url(#gradTasa)" />
          <Bar yAxisId="right" dataKey="sinDespachador" name="Sin despachador" fill="#e05252" radius={[3, 3, 0, 0]} />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
