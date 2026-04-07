'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { useUiStore } from '@/store/ui.store';
import { MICROSERVICIOS } from '@/config/microservicios.config';
import { AUTH_ENDPOINTS } from '@/api/auth.endpoints';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icono: 'space_dashboard' },
  // TODO: Agregar las demás rutas del ecosistema
] as const;

export default function SidebarDrawer() {
  const pathname = usePathname();
  const router   = useRouter();
  const { usuario, empresa, servicios, limpiar } = useAuthStore();
  const { sidebarOpen } = useUiStore();

  const microserviciosContratados = MICROSERVICIOS.filter((m) =>
    servicios.includes(m.key as unknown as typeof servicios[number])
  );

  const itemActivo  = NAV_ITEMS.find((item) => item.href === pathname) ?? NAV_ITEMS[0];
  const itemsRestantes = NAV_ITEMS.filter((item) => item.href !== itemActivo.href);

  const handleLogout = async () => {
    try {
      // TODO: Reemplazar con llamada real a la API
      await fetch(AUTH_ENDPOINTS.LOGOUT, { method: 'POST', credentials: 'include' });
    } finally {
      limpiar();
      router.push('/login');
    }
  };

  return (
    <div
      className={`shrink-0 overflow-hidden transition-[width] duration-300 ease-in-out bg-bg border-r border-border
        ${sidebarOpen ? 'w-60' : 'w-0'}`}
    >
      <div className="w-60 h-full flex flex-col">

        {/* Opción activa — ocupa el lugar del header, mismo alto que el Header */}
        <div className="flex items-center gap-3 px-4 h-16 shrink-0 border-b border-border">
          <span className="material-symbols-outlined text-primary text-[22px] shrink-0">
            {itemActivo.icono}
          </span>
          <span className="text-primary font-semibold text-sm whitespace-nowrap">
            {itemActivo.label}
          </span>
        </div>

        {/* Resto de opciones de navegación */}
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

        {/* Microservicios */}
        {microserviciosContratados.length > 0 && (
          <div className="flex flex-col gap-1 px-3 mt-4">
            <p className="px-3 mb-1 text-xs font-semibold text-text-muted uppercase tracking-wider whitespace-nowrap">
              Mis servicios
            </p>
            {microserviciosContratados.map((m) => (
              <a
                key={m.key}
                href={m.url}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:bg-surface hover:text-text transition-colors whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-[20px] shrink-0">{m.icono}</span>
                {m.label}
              </a>
            ))}
          </div>
        )}

        <div className="flex-1" />

        {/* Usuario + empresa */}
        <div className="px-3 pb-4 border-t border-border pt-3 flex flex-col gap-1 shrink-0">
          {usuario && (
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-primary text-sm font-semibold">
                  {usuario.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-text text-sm font-medium truncate">
                  {usuario.name} {usuario.last_name}
                </span>
                {empresa && (
                  <span className="text-text-muted text-xs truncate">{empresa.name}</span>
                )}
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-text-muted hover:bg-surface hover:text-text transition-colors whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[20px] shrink-0">logout</span>
            Cerrar sesión
          </button>
        </div>

      </div>
    </div>
  );
}
