'use client';

import { useState } from 'react';
import { useAuthStore, useUiStore } from '@/store';
import { assetUrl } from '@/lib/assets';
import Notifications from './Notifications';
import UserMenu from './UserMenu';

export default function Header() {
  const { productoActivo } = useAuthStore();
  const { theme, toggleTheme } = useUiStore();
  const [userOpen, setUserOpen] = useState(false);

  return (
    <header className="flex items-center justify-between h-16 pl-6 pr-3 bg-surface border-b border-line shrink-0">

      {/* Producto activo */}
      <div className="flex items-center gap-3">
        {productoActivo ? (
          productoActivo.logoCompleto ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={assetUrl(theme === 'dark' ? productoActivo.logoCompletoDark : productoActivo.logoCompleto)!}
              alt={productoActivo.nombre}
              className="h-14 w-auto object-contain"
            />
          ) : (
            <>
              <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shrink-0">
                <span className="text-primary-ink text-lg font-bold">
                  {productoActivo.nombre.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-xl font-bold text-ink">{productoActivo.nombre}</span>
            </>
          )
        ) : (
          <span className="text-base font-semibold text-ink-muted">
            Selecciona un producto
          </span>
        )}
      </div>

      {/* Acciones del lado derecho */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-9 h-9 rounded-lg text-ink-muted hover:bg-surface-muted transition-colors"
          title={theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
        >
          <span className="material-symbols-outlined text-[22px]">
            {theme === 'light' ? 'dark_mode' : 'light_mode'}
          </span>
        </button>
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
