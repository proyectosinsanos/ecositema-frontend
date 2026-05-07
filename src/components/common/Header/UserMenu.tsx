'use client';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store';
import { AUTH_ENDPOINTS } from '@/api';

const AVATAR = '/user.jpeg';
interface UserMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}
export default function UserMenu({ isOpen, onToggle, onClose }: UserMenuProps) {
  const router  = useRouter();
  const ref     = useRef<HTMLDivElement>(null);
  const { usuario, limpiar } = useAuthStore();
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return ()  => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);
  const handleLogout = async () => {
    onClose();
    try {
      await fetch(AUTH_ENDPOINTS.LOGOUT, { method: 'POST', credentials: 'include' });
    } finally {
      limpiar();
      router.push('/login');
    }
  };
  const inicial        = usuario?.name.charAt(0).toUpperCase() ?? '?';
  const nombreCompleto = usuario ? `${usuario.name} ${usuario.last_name}` : 'Usuario';
  return (
      <div ref={ref} className="relative">
        {/* Botón avatar */}
        <button
            onClick={onToggle}
            className="group transition-transform hover:scale-95"
        >
          <div className={`w-10 h-10 rounded-full overflow-hidden shrink-0 transition-shadow
            ${isOpen
              ? 'shadow-[0_0_0_3px_rgba(189,210,84,0.35),0_0_12px_4px_rgba(189,210,84,0.25)]'
              : 'group-hover:shadow-[0_0_0_3px_rgba(189,210,84,0.35),0_0_12px_4px_rgba(189,210,84,0.25)]'
            }`}>
            <Image src={AVATAR} alt={nombreCompleto} width={40} height={40} className="w-full h-full object-cover" />
          </div>
        </button>
        {/* Dropdown */}
        {isOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 z-50">
              <div className="bg-surface rounded-2xl border border-line p-4 shadow-lg">

                {/* Banner + Avatar */}
                <div className="relative pb-8">
                  <div className="h-24 rounded-xl overflow-hidden bg-gradient-to-br from-primary to-primary-dark" />
                  <div className="absolute bottom-0 left-3">
                    <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-surface">
                      <Image src={AVATAR} alt={nombreCompleto} width={64} height={64} className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>

                {/* Info del usuario */}
                <div className="px-1 pb-3 border-b border-line-strong">
                  <p className="text-xl font-semibold text-ink leading-snug">{nombreCompleto}</p>
                  <p className="text-sm text-info mt-0.5">{usuario?.email ?? ''}</p>
                  {usuario && (
                      <p className="text-sm text-ink-muted mt-0.5">ID: {usuario.id_usuario}</p>
                  )}
                </div>

                {/* Botón cerrar sesión */}
                <div className="pt-3">
                  <button
                      onClick={handleLogout}
                      className="w-full py-2.5 rounded-full bg-primary hover:bg-primary-dark text-primary-ink text-base font-semibold transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </div>

              </div>
            </div>
        )}
      </div>
  );
}
