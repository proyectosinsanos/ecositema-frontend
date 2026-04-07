
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AUTH_ENDPOINTS } from '@/api/auth.endpoints';
import { RecuperarContrasenaDto } from '@/types/Auth/dto/RecuperarContrasena.dto';

export default function RecuperarForm() {
  const [form, setForm] = useState<RecuperarContrasenaDto>({ email: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // TODO: Reemplazar con llamada real a la API
      const res = await fetch(AUTH_ENDPOINTS.RECUPERAR_CONTRASENA, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.message ?? 'No se pudo enviar el correo. Intenta de nuevo.');
        return;
      }

      setEnviado(true);
    } catch {
      setError('Error de conexión. Verifica tu red e intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  if (enviado) {
    return (
      <div className="flex flex-col gap-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-secondary text-[28px]">mark_email_read</span>
          </div>
          <h3 className="text-lg font-semibold text-text">Revisa tu correo</h3>
          <p className="text-sm text-text-muted max-w-xs">
            Si <span className="font-medium text-text">{form.email}</span> está registrado,
            recibirás un enlace para restablecer tu contraseña en los próximos minutos.
          </p>
        </div>
        <Link
          href="/login"
          className="text-sm text-primary hover:text-primary-dark transition-colors"
        >
          Volver al inicio de sesión
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full" noValidate>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-medium text-text">
          Correo electrónico
        </label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-text-muted pointer-events-none">
            mail
          </span>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={e => {
              setForm({ email: e.target.value });
              if (error) setError('');
            }}
            placeholder="usuario@ejemplo.com"
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-md border border-border bg-bg text-text placeholder:text-text-muted transition-colors focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
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
        disabled={isLoading}
        className="w-full py-2.5 rounded-md bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-text-inverse font-semibold text-sm transition-colors"
      >
        {isLoading ? 'Enviando enlace...' : 'Enviar enlace de recuperación'}
      </button>

      {/* Volver al login */}
      <Link
        href="/login"
        className="flex items-center justify-center gap-1.5 text-sm text-text-muted hover:text-text transition-colors"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Volver al inicio de sesión
      </Link>

    </form>
  );
}
