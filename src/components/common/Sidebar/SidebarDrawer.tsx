'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useAuthStore, useUiStore } from '@/store';
import { navigateMicroservicio } from '@/lib/socket';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icono: 'space_dashboard' },
] as const;

export default function SidebarDrawer() {
  const pathname = usePathname();
  const { microservicioActivo, usuario } = useAuthStore();
  const { sidebarOpen } = useUiStore();
  const [linkActivo, setLinkActivo] = useState<string | null>(
    microservicioActivo?.menu[0]?.link ?? null
  );

  useEffect(() => {
    setLinkActivo(microservicioActivo?.menu[0]?.link ?? null);
  }, [microservicioActivo]);

  const itemActivo     = NAV_ITEMS.find((item) => item.href === pathname) ?? NAV_ITEMS[0];
  const itemsRestantes = NAV_ITEMS.filter((item) => item.href !== itemActivo.href);

  return (
    <div
      className={`shrink-0 overflow-hidden transition-[width] duration-300 ease-in-out bg-surface
        ${sidebarOpen ? 'w-60' : 'w-0'}`}
    >
      <div className="w-60 h-full flex flex-col border-r border-line">

        {microservicioActivo ? (
          <>
            {/* Título del microservicio activo */}
            <div className="flex items-center gap-3 px-4 h-16 shrink-0 border-b border-line">
              <span className="material-symbols-outlined text-ink text-[22px] shrink-0 bg-surface-alt p-1.5 rounded-lg">
                {microservicioActivo.icono}
              </span>
              <span className="text-ink font-bold text-base whitespace-nowrap">
                {microservicioActivo.label}
              </span>
            </div>

            {/* Opciones del microservicio */}
            <nav className="flex flex-col gap-1 px-3 pt-3">
              {microservicioActivo.menu.map((item) => {
                const activo = linkActivo === item.link;
                return (
                  <button
                    key={item.label}
                    onClick={() => {
                      setLinkActivo(item.link);
                      if (usuario) navigateMicroservicio(usuario.id_usuario, item.link);
                    }}
                    className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors whitespace-nowrap w-full text-left
                      ${activo
                        ? 'bg-primary text-primary-ink rounded-lg'
                        : 'text-gray-700 hover:bg-surface-alt hover:text-ink rounded-xl'
                      }`}
                  >
                    <span className="material-symbols-outlined text-[20px] shrink-0">{item.icono}</span>
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </>
        ) : (
          <>
            {/* Opción activa del ecosistema */}
            <div className="flex items-center gap-3 px-4 h-16 shrink-0 border-b border-line">
              <span className="material-symbols-outlined text-ink text-[22px] shrink-0 bg-surface-alt p-1.5 rounded-lg">
                {itemActivo.icono}
              </span>
              <span className="text-ink font-bold text-base whitespace-nowrap">
                {itemActivo.label}
              </span>
            </div>

            {/* Resto de rutas del ecosistema */}
            <nav className="flex flex-col gap-1 px-3 pt-3">
              {itemsRestantes.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-surface-alt hover:text-ink transition-colors whitespace-nowrap"
                >
                  <span className="material-symbols-outlined text-[20px] shrink-0">{item.icono}</span>
                  {item.label}
                </Link>
              ))}
            </nav>
          </>
        )}

        <div className="flex-1" />

      </div>
    </div>
  );
}
