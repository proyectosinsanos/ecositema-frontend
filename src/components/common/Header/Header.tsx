'use client';

import { useState } from 'react';
import { useAuthStore } from '@/store';
import Notifications from './Notifications';
import UserMenu from './UserMenu';

export default function Header() {
  const { productoActivo } = useAuthStore();
  const [userOpen, setUserOpen] = useState(false);

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-bg border-b border-border shrink-0">

      {/* Producto activo */}
      <div className="flex items-center gap-3">
        {productoActivo ? (
          <>
            {/* TODO: Reemplazar inicial con logo oficial del producto */}
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
              <span className="text-white text-sm font-bold">
                {productoActivo.nombre.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-base font-semibold text-text">
              {productoActivo.nombre}
            </span>
          </>
        ) : (
          <span className="text-base font-semibold text-text-muted">
            Selecciona un producto
          </span>
        )}
      </div>

      {/* Acciones del lado derecho */}
      <div className="flex items-center gap-2">

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
