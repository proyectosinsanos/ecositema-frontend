'use client';

import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { porDispensario } from '../data/mock';
import { tooltipStyle } from '../data/chartStyles';
import ChartCard from './ChartCard';

type Metric = 'servicios' | 'tiempoPromedio' | 'sinDespachador';

const TABS: { key: Metric; label: string }[] = [
  { key: 'servicios',       label: 'Volumen'         },
  { key: 'tiempoPromedio',  label: 'Tiempo prom.'    },
  { key: 'sinDespachador',  label: 'Sin despachador' },
];

const colorMap: Record<Metric, string> = {
  servicios:       'var(--color-primary)',
  tiempoPromedio:  'var(--color-warning)',
  sinDespachador:  'var(--color-error)',
};


const unitMap: Record<Metric, string> = {
  servicios:      '',
  tiempoPromedio: ' min',
  sinDespachador: '',
};

export default function DispensarioChart() {
  const [metric, setMetric] = useState<Metric>('servicios');

  return (
    <ChartCard
      title="Por dispensario"
      subtitle="Comparativa hoy"

      headerRight={
        <div className="flex gap-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setMetric(t.key)}
              className={`text-xs px-2.5 py-1 rounded-lg transition-colors ${
                metric === t.key
                  ? 'bg-primary text-primary-ink font-medium'
                  : 'text-ink-muted hover:bg-surface-alt'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      }
    >
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={porDispensario} layout="vertical" margin={{ top: 0, right: 16, left: 8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} unit={unitMap[metric]} />
          <YAxis type="category" dataKey="dispensario" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} width={56} />
          <Tooltip contentStyle={tooltipStyle.contentStyle} labelStyle={tooltipStyle.labelStyle} itemStyle={tooltipStyle.itemStyle} cursor={tooltipStyle.cursor} />
          <Bar dataKey={metric} radius={[0, 4, 4, 0]}>
            {porDispensario.map((_, i) => (
              <Cell key={i} fill={colorMap[metric]} opacity={0.7 + i * 0.1} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
