'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore, useUiStore } from '@/store';
import { MICROSERVICIOS } from '@/config';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icono: 'space_dashboard' },
] as const;

interface SidebarItemProps {
  icono: string;
  label: string;
  activo?: boolean;
  onClick?: () => void;
  href?: string;
  external?: boolean;
  rounded?: 'lg' | 'full';
}

function SidebarItem({ icono, label, activo, onClick, href, external, rounded = 'lg' }: SidebarItemProps) {
  const base = `group relative flex items-center justify-center w-10 h-10 rounded-${rounded} transition-colors
    ${activo
      ? 'bg-primary text-primary-ink'
      : 'text-black hover:bg-surface-muted hover:text-black'
    }`;

  const tooltip = (
    <span className="pointer-events-none absolute left-full ml-3 px-2 py-1 rounded-md bg-gray-900 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-50">
      {label}
    </span>
  );

  const indicator = activo && (
    <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
  );

  if (href && external) {
    return <a href={href} className={base}><span className="material-symbols-outlined text-[22px]">{icono}</span>{tooltip}{indicator}</a>;
  }
  if (href) {
    return <Link href={href} onClick={onClick} className={base}><span className="material-symbols-outlined text-[22px]">{icono}</span>{tooltip}{indicator}</Link>;
  }
  return (
    <button onClick={onClick} className={base}>
      <span className="material-symbols-outlined text-[22px]">{icono}</span>
      {tooltip}
      {indicator}
    </button>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const { productoActivo, microservicioActivo, setMicroservicioActivo } = useAuthStore();
  const { toggleSidebar } = useUiStore();

  const microserviciosActivos = MICROSERVICIOS.filter((m) =>
    productoActivo?.microservicios.includes(m.key)
  );

  return (
    <aside className="flex flex-col items-center w-16 bg-surface border-r border-line py-3 gap-2 shrink-0">

      {/* Hamburguesa */}
      <SidebarItem icono="menu" label="Menú" onClick={toggleSidebar} rounded="full" />

      <div className="w-8 h-px bg-line" />

      {/* Navegación principal del ecosistema */}
      <nav className="flex flex-col items-center gap-1">
        {NAV_ITEMS.map((item) => (
          <SidebarItem
            key={item.href}
            href={item.href}
            icono={item.icono}
            label={item.label}
            activo={pathname === item.href && !microservicioActivo}
            onClick={() => setMicroservicioActivo(null)}
          />
        ))}
      </nav>

      {/* Microservicios del producto activo */}
      {microserviciosActivos.length > 0 && (
        <>
          <div className="w-8 h-px bg-line" />
          <div className="flex flex-col items-center gap-1">
            {microserviciosActivos.map((m) => (
              <SidebarItem
                key={m.key}
                icono={m.icono}
                label={m.label}
                activo={microservicioActivo?.key === m.key}
                onClick={() => setMicroservicioActivo(m)}
              />
            ))}
          </div>
        </>
      )}

      <div className="flex-1" />

    </aside>
  );
}
