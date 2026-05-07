'use client';

import { useAuthStore } from '@/store';
import StatCard               from './components/StatCard';
import ServiciosPorHoraChart  from './components/ServiciosPorHoraChart';
import ServiciosPorDiaChart   from './components/ServiciosPorDiaChart';
import DispensarioChart       from './components/DispensarioChart';
import DistribucionTiemposChart from './components/DistribucionTiemposChart';
import TasaAtencionChart      from './components/TasaAtencionChart';
import { kpis }               from './data/mock';

function IconGas() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 22V6a2 2 0 012-2h8a2 2 0 012 2v16"/><path d="M17 22V11l4-4v15"/><line x1="3" y1="22" x2="21" y2="22"/>
    </svg>
  );
}
function IconClock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}
function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  );
}
function IconAlert() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  );
}
function IconUser() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  );
}

export default function DashboardPage() {
  const { empresa } = useAuthStore();

  return (
    <div className="h-full overflow-y-auto p-6 bg-surface">
      <div className="mb-6">
        <h1 className="text-5xl font-bold text-ink">Dashboard</h1>
        <p className="text-sm text-ink-muted mt-0.5">
          {empresa?.name ?? 'Ecosistema'} · Cistem Vision — resumen operativo
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-5">
        <StatCard
          label="Servicios hoy"
          value={kpis.serviciosHoy}
          delta="vs ayer"
          deltaUp={true}
          icon={<IconGas />}
          accent="primary"
        />
        <StatCard
          label="Tiempo promedio"
          value={`${kpis.tiempoPromedioMin} min`}
          delta="0.2 min"
          deltaUp={false}
          icon={<IconClock />}
          accent="warning"
        />
        <StatCard
          label="Tasa de atención"
          value={`${kpis.tasaAtencion}%`}
          delta="1.2%"
          deltaUp={true}
          icon={<IconCheck />}
          accent="success"
        />
        <StatCard
          label="Vehículos stuck"
          value={kpis.vehiculosStuck}
          delta="hoy"
          deltaUp={false}
          icon={<IconAlert />}
          accent="error"
        />
      </div>

      {/* Fila 2: hora pico + distribución */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2">
          <ServiciosPorHoraChart />
        </div>
        <DistribucionTiemposChart />
      </div>

      {/* Fila 3: dispensarios + día de semana */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <DispensarioChart />
        <ServiciosPorDiaChart />
      </div>

      {/* Fila 4: calidad de atención */}
      <TasaAtencionChart />

    </div>
  );
}
