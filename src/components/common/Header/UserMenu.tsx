'use client';
import { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store';
import { AUTH_ENDPOINTS } from '@/api';
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
            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors
          ${isOpen ? 'bg-surface' : 'hover:bg-surface'}`}
        >
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-semibold">{inicial}</span>
          </div>
        </button>
        {/* Dropdown */}
        {isOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 z-50">
              <div className="bg-bg rounded-2xl border border-border p-4 shadow-lg">

                {/* Banner + Avatar */}
                <div className="relative pb-8">
                  <div className="h-24 rounded-xl overflow-hidden bg-gradient-to-br from-primary to-primary-dark" />
                  <div className="absolute bottom-0 left-3">
                    <div className="w-16 h-16 rounded-full bg-primary border-4 border-bg flex items-center justify-center">
                      <span className="text-text-inverse text-2xl font-bold">{inicial}</span>
                    </div>
                  </div>
                </div>

                {/* Info del usuario */}
                <div className="px-1 pb-3 border-b border-border-strong">
                  <p className="text-xl font-semibold text-text leading-snug">{nombreCompleto}</p>
                  <p className="text-sm text-info mt-0.5">{usuario?.email ?? ''}</p>
                  {usuario && (
                      <p className="text-sm text-text-muted mt-0.5">ID: {usuario.id_usuario}</p>
                  )}
                </div>

                {/* Botón cerrar sesión */}
                <div className="pt-3">
                  <button
                      onClick={handleLogout}
                      className="w-full py-2.5 rounded-full bg-primary hover:bg-primary-dark text-text-inverse text-base font-semibold transition-colors"
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