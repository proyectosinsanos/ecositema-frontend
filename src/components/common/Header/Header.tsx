'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store';
import Notifications from './Notifications';
import UserMenu from './UserMenu';

export default function Header() {
  const { productoActivo } = useAuthStore();
  const [userOpen, setUserOpen] = useState(false);

  return (
    <header className="flex items-center justify-between h-16 pl-6 pr-3 bg-surface border-b border-line shrink-0">

      {/* Producto activo */}
      <div className="flex items-center gap-3">
        {productoActivo ? (
          <>
            <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shrink-0">
              <span className="text-primary-ink text-lg font-bold">
                {productoActivo.nombre.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-xl font-bold text-ink">
              {productoActivo.nombre}
            </span>
          </>
        ) : (
          <span className="text-base font-semibold text-ink-muted">
            Selecciona un producto
          </span>
        )}
      </div>

      {/* Acciones del lado derecho */}
      <div className="flex items-center gap-4">
        <Notifications />
        <UserMenu
          isOpen={userOpen}
          onToggle={() => setUserOpen((v) => !v)}
          onClose={() => setUserOpen(false)}
        />
      </div>

    </header>
  );
}
