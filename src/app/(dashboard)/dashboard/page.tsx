'use client';

import { useAuthStore } from '@/store';

export default function DashboardPage() {
  const { productoActivo } = useAuthStore();

  // TODO: Implementar estadísticas del dashboard según productoActivo
  return (
    <div>
    </div>
  );
}
