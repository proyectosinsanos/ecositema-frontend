'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { serviciosPorDia } from '../data/mock';

const hoy = new Date().getDay(); // 0=Dom, 1=Lun...
const diaIndex = [6, 0, 1, 2, 3, 4, 5][hoy]; // mapear a nuestro array Lun-Dom

export default function ServiciosPorDiaChart() {
  return (
    <div className="bg-surface-muted border border-line rounded-xl p-5">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-ink">Servicios por día</h3>
        <p className="text-xs text-ink-muted mt-0.5">Semana actual</p>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={serviciosPorDia} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
          <XAxis dataKey="dia" tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', fontSize: 12, color: 'var(--color-text)' }}
            cursor={{ fill: 'var(--color-border)', opacity: 0.3 }}
          />
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
    </div>
  );
}
