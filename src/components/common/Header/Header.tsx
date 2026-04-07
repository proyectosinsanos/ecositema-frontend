'use client';

import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';

const TITULOS: Record<string, string> = {
  '/dashboard': 'Dashboard',
  // TODO: Agregar títulos de las demás rutas del ecosistema
};

function obtenerTitulo(pathname: string): string {
  return TITULOS[pathname] ?? 'Ecosistema';
}

export default function Header() {
  const pathname = usePathname();
  const { empresa } = useAuthStore();

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-bg border-b border-border shrink-0">

      {/* Título de la página actual */}
      <h1 className="text-base font-semibold text-text">
        {obtenerTitulo(pathname)}
      </h1>

      {/* Lado derecho */}
      <div className="flex items-center gap-4">
        {empresa && (
          <span className="text-sm text-text-muted hidden sm:block">
            {empresa.name}
          </span>
        )}

        {/* TODO: Agregar notificaciones, perfil u otros controles del header */}
      </div>

    </header>
  );
}
