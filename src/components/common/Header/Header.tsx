'use client';

import { useAuthStore } from '@/store/auth.store';

export default function Header() {
  const { empresa, productoActivo } = useAuthStore();

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
