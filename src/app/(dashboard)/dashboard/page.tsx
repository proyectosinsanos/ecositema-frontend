'use client';

import { useAuthStore } from '@/store';
import StatCard         from './components/StatCard';
import ActivityChart    from './components/ActivityChart';
import AlertsBarChart   from './components/AlertsBarChart';
import ServiceStatusList from './components/ServiceStatusList';
import RecentAlerts     from './components/RecentAlerts';

// Icons
function IconCamera() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M23 7l-7 5 7 5V7z" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
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
function IconUptime() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  );
}
function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  );
}

export default function DashboardPage() {
  const { empresa } = useAuthStore();

  return (
    <div className="h-full overflow-y-auto p-6 bg-surface">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-ink">Dashboard</h1>
        <p className="text-sm text-ink-muted mt-0.5">
          {empresa?.name ?? 'Ecosistema'} — resumen del sistema
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Cámaras activas"
          value="18 / 20"
          delta="2 offline"
          deltaUp={false}
          icon={<IconCamera />}
          accent="primary"
        />
        <StatCard
          label="Alertas hoy"
          value={9}
          delta="vs ayer"
          deltaUp={false}
          icon={<IconAlert />}
          accent="error"
        />
        <StatCard
          label="Uptime promedio"
          value="99.2%"
          delta="0.3%"
          deltaUp={true}
          icon={<IconUptime />}
          accent="success"
        />
        <StatCard
          label="Usuarios activos"
          value={7}
          delta="3 nuevos"
          deltaUp={true}
          icon={<IconUsers />}
          accent="info"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-2">
          <ActivityChart />
        </div>
        <div>
          <AlertsBarChart />
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ServiceStatusList />
        <RecentAlerts />
      </div>

    </div>
  );
}
