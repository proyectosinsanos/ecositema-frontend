'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AUTH_ENDPOINTS } from '@/api';
import { RestablecerContrasenaDto } from '@/types/Auth';

const REQUISITOS = [
  { label: 'Mínimo 8 caracteres',                        test: (v: string) => v.length >= 8 },
  { label: 'Al menos una letra mayúscula',                test: (v: string) => /[A-Z]/.test(v) },
  { label: 'Al menos una letra minúscula',                test: (v: string) => /[a-z]/.test(v) },
  { label: 'Al menos un número',                         test: (v: string) => /[0-9]/.test(v) },
  { label: 'Al menos un carácter especial (!@#$%^&*...)', test: (v: string) => /[^A-Za-z0-9]/.test(v) },
] as const;

function passwordValida(v: string) {
  return REQUISITOS.every(r => r.test(v));
}

export default function RestablecerForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const [password, setPassword] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Token inválido
  if (!token) {
    return (
      <div className="flex flex-col gap-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-error/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-error text-[28px]">link_off</span>
          </div>
          <h3 className="text-lg font-semibold text-ink">Enlace inválido</h3>
          <p className="text-sm text-ink-muted">
            Este enlace de recuperación no es válido o ha expirado.
          </p>
        </div>
        <Link
          href="/recuperar-contrasena"
          className="text-sm text-primary-dark hover:text-primary-dark/70 transition-colors"
        >
          Solicitar un nuevo enlace
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!passwordValida(password)) {
      setError('La contraseña no cumple con todos los requisitos de seguridad.');
      return;
    }

    if (password !== confirmar) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setIsLoading(true);

    const dto: RestablecerContrasenaDto = { token, password };

    try {
      const res = await fetch(AUTH_ENDPOINTS.RESTABLECER_CONTRASENA, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.message ?? 'No se pudo restablecer la contraseña. El enlace puede haber expirado.');
        return;
      }

      router.push('/login?restablecida=1');
    } catch {
      setError('Error de conexión. Verifica tu red e intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full" noValidate>

      {/* Nueva contraseña */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-ink">
          Nueva contraseña
        </label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-ink-muted pointer-events-none">
            lock
          </span>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            required
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              if (error) setError('');
            }}
            placeholder="Crea una contraseña segura"
            className="w-full pl-10 pr-10 py-2.5 text-sm rounded-lg border border-line bg-surface-muted text-ink placeholder:text-ink-muted transition-colors focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">
              {showPassword ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        </div>

        {/* Checklist de requisitos */}
        {password.length > 0 && (
          <ul className="flex flex-col gap-1 mt-1">
            {REQUISITOS.map(r => {
              const cumple = r.test(password);
              return (
                <li key={r.label} className="flex items-center gap-1.5">
                  <span className={`material-symbols-outlined text-[16px] transition-colors ${cumple ? 'text-secondary' : 'text-ink-muted'}`}>
                    {cumple ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                  <span className={`text-xs transition-colors ${cumple ? 'text-secondary' : 'text-ink-muted'}`}>
                    {r.label}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Confirmar contraseña */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="confirmar" className="text-sm font-medium text-ink">
          Confirmar contraseña
        </label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-ink-muted pointer-events-none">
            lock_reset
          </span>
          <input
            id="confirmar"
            name="confirmar"
            type={showConfirmar ? 'text' : 'password'}
            autoComplete="new-password"
            required
            value={confirmar}
            onChange={e => {
              setConfirmar(e.target.value);
              if (error) setError('');
            }}
            placeholder="Repite la contraseña"
            className="w-full pl-10 pr-10 py-2.5 text-sm rounded-lg border border-line bg-surface-muted text-ink placeholder:text-ink-muted transition-colors focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
          />
          <button
            type="button"
            onClick={() => setShowConfirmar(prev => !prev)}
            aria-label={showConfirmar ? 'Ocultar confirmación' : 'Mostrar confirmación'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">
              {showConfirmar ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p role="alert" className="text-sm text-error bg-error/10 border border-error/20 px-3 py-2 rounded-md">
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading || !passwordValida(password)}
        className="w-full py-2.5 rounded-full bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-primary-ink font-semibold text-sm transition-colors"
      >
        {isLoading ? 'Guardando...' : 'Restablecer contraseña'}
      </button>

    </form>
  );
}
