'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import { MICROSERVICIOS } from '@/config/microservicios.config';
import { AUTH_ENDPOINTS } from '@/api/auth.endpoints';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icono: 'space_dashboard' },
] as const;

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { usuario, empresa, servicios, limpiar } = useAuthStore();

  const microserviciosContratados = MICROSERVICIOS.filter((m) =>
    servicios.includes(m.key as unknown as typeof servicios[number])
  );

  const handleLogout = async () => {
    try {
      // TODO: Reemplazar con llamada real a la API
      await fetch(AUTH_ENDPOINTS.LOGOUT, {
        method: 'POST',
        credentials: 'include',
      });
    } finally {
      limpiar();
      router.push('/login');
    }
  };

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-primary shrink-0">

      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-white/10">
        {/* TODO: Reemplazar con logo oficial de Cistem Labs */}
        <span className="material-symbols-outlined text-white text-[26px]">hub</span>
        <span className="text-white font-bold text-base tracking-wide">Cistem Labs</span>
      </div>

      {/* Navegación principal */}
      <nav className="flex flex-col gap-1 px-3 pt-4">
        {NAV_ITEMS.map((item) => {
          const activo = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors
                ${activo
                  ? 'bg-white/15 text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icono}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Microservicios contratados */}
      <div className="flex flex-col gap-2 px-3 mt-6">
        <p className="px-3 text-xs font-semibold text-white/40 uppercase tracking-wider">
          Mis servicios
        </p>

        {microserviciosContratados.length === 0 ? (
          <p className="px-3 text-xs text-white/30 italic">
            Sin servicios contratados
          </p>
        ) : (
          microserviciosContratados.map((m) => (
            <a
              key={m.key}
              href={m.url}
              title={m.label}
              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">{m.icono}</span>
              {m.label}
            </a>
          ))
        )}
      </div>

      {/* Espaciador */}
      <div className="flex-1" />

      {/* Usuario y logout */}
      <div className="px-3 pb-4 border-t border-white/10 pt-3">
        {usuario && (
          <div className="flex items-center gap-2.5 px-3 py-2 mb-1">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <span className="text-white text-sm font-semibold">
                {usuario.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-white text-sm font-medium truncate">
                {usuario.name} {usuario.last_name}
              </span>
              <span className="text-white/50 text-xs truncate">{usuario.email}</span>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          Cerrar sesión
        </button>
      </div>

    </aside>
  );
}
