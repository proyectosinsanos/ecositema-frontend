'use client';

import { useAuthStore } from '@/store/auth.store';

interface MicroservicioFrameProps {
  fallback: React.ReactNode;
}

export default function MicroservicioFrame({ fallback }: MicroservicioFrameProps) {
  const { microservicioActivo } = useAuthStore();

  if (!microservicioActivo) {
    return <div className="h-full bg-surface p-6 overflow-auto">{fallback}</div>;
  }

  return (
    <iframe
      key={microservicioActivo.key}
      src={microservicioActivo.url}
      title={microservicioActivo.label}
      className="w-full h-full border-0"
    />
  );
}
