'use client';

import { useAuthStore } from '@/store/auth.store';

export default function DashboardPage() {
  const { productoActivo } = useAuthStore();

  // TODO: Implementar estadísticas del dashboard según productoActivo
  return (
    <div>
    </div>
  );
}
