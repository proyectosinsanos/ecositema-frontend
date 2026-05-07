'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useAuthStore } from '@/store';
import { assetUrl } from '@/lib/assets';

export default function ProductoBar() {
  const { productos, productoActivo, setProductoActivo } = useAuthStore();

  // Selecciona el primer producto por defecto si no hay ninguno activo
  useEffect(() => {
    if (productos.length > 0 && !productoActivo) {
      setProductoActivo(productos[0]);
    }
  }, [productos, productoActivo, setProductoActivo]);

  return (
    <aside className="flex flex-col items-center w-16 bg-surface border-l border-line py-3 gap-2 shrink-0">

      {productos.map((producto) => {
        const activo = productoActivo?.id_producto === producto.id_producto;
        const inicial = producto.nombre.charAt(0).toUpperCase();

        return (
          <button
            key={producto.id_producto}
            onClick={() => setProductoActivo(producto)}
            title={producto.nombre}
            className={`group relative flex items-center justify-center w-full transition-all
              ${activo ? '' : 'opacity-50 hover:opacity-100'}`}
          >
            {producto.logoIcono ? (
              <Image
                src={assetUrl(producto.logoIcono)!}
                alt={producto.nombre}
                width={48}
                height={48}
                className="w-12 h-12 object-contain transition-transform duration-200 hover:scale-110"
              />
            ) : (
              <span className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-semibold ${activo ? 'bg-primary text-primary-ink' : 'bg-surface-muted text-ink-muted'}`}>
                {inicial}
              </span>
            )}

            {/* Tooltip hacia la izquierda */}
            <span className="pointer-events-none absolute right-full mr-3 px-2 py-1 rounded-md bg-gray-900 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50">
              {producto.nombre}
            </span>
          </button>
        );
      })}

      {/* Sin productos */}
      {productos.length === 0 && (
        <div className="group relative flex items-center justify-center w-10 h-10">
          <span className="material-symbols-outlined text-[22px] text-line">inventory_2</span>
          <span className="pointer-events-none absolute right-full mr-3 px-2 py-1 rounded-md bg-gray-900 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50">
            Sin productos
          </span>
        </div>
      )}

    </aside>
  );
}
