'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { serviciosPorDia } from '../data/mock';
import { tooltipStyle } from '../data/chartStyles';
import ChartCard from './ChartCard';

const hoy = new Date().getDay();
const diaIndex = [6, 0, 1, 2, 3, 4, 5][hoy];

export default function ServiciosPorDiaChart() {
  return (
    <ChartCard
      title="Servicios por día"
      subtitle="Semana actual"

    >
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={serviciosPorDia} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          <XAxis dataKey="dia" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle.contentStyle} labelStyle={tooltipStyle.labelStyle} itemStyle={tooltipStyle.itemStyle} cursor={tooltipStyle.cursor} />
          <Bar dataKey="servicios" name="Servicios" radius={[4, 4, 0, 0]}>
            {serviciosPorDia.map((_, i) => (
              <Cell
                key={i}
                fill="var(--color-primary)"
                opacity={i === diaIndex ? 1 : 0.45}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
