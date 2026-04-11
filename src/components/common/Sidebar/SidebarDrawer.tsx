'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuthStore, useUiStore } from '@/store';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icono: 'space_dashboard' },
  // TODO: Agregar las demás rutas del ecosistema
] as const;

export default function SidebarDrawer() {
  const pathname = usePathname();
  const { microservicioActivo } = useAuthStore();
  const { sidebarOpen } = useUiStore();
  const [linkActivo, setLinkActivo] = useState<string | null>(null);

  const itemActivo     = NAV_ITEMS.find((item) => item.href === pathname) ?? NAV_ITEMS[0];
  const itemsRestantes = NAV_ITEMS.filter((item) => item.href !== itemActivo.href);

  return (
    <div
      className={`shrink-0 overflow-hidden transition-[width] duration-300 ease-in-out bg-bg border-r border-border
        ${sidebarOpen ? 'w-60' : 'w-0'}`}
    >
      <div className="w-60 h-full flex flex-col">

        {microservicioActivo ? (
          <>
            {/* Título del microservicio activo */}
            <div className="flex items-center gap-3 px-4 h-16 shrink-0 border-b border-border">
              <span className="material-symbols-outlined text-primary text-[22px] shrink-0">
                {microservicioActivo.icono}
              </span>
              <span className="text-primary font-semibold text-sm whitespace-nowrap">
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
                      const iframe = document.querySelector<HTMLIFrameElement>('iframe');
                      iframe?.contentWindow?.postMessage(
                        { type: 'NAVIGATE', link: item.link },
                        microservicioActivo.url
                      );
                    }}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap w-full text-left
                      ${activo
                        ? 'bg-surface text-text'
                        : 'text-text-muted hover:bg-surface hover:text-text'
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
            <div className="flex items-center gap-3 px-4 h-16 shrink-0 border-b border-border">
              <span className="material-symbols-outlined text-primary text-[22px] shrink-0">
                {itemActivo.icono}
              </span>
              <span className="text-primary font-semibold text-sm whitespace-nowrap">
                {itemActivo.label}
              </span>
            </div>

            {/* Resto de rutas del ecosistema */}
            <nav className="flex flex-col gap-1 px-3 pt-3">
              {itemsRestantes.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:bg-surface hover:text-text transition-colors whitespace-nowrap"
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
