'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AUTH_ENDPOINTS } from '@/api/auth.endpoints';
import { LoginDto } from '@/types/Auth/dto/Login.dto';
import { useAuthStore } from '@/store/auth.store';
import { MOCK_USUARIO, MOCK_EMPRESA, MOCK_PRODUCTOS } from '@/mocks/mock.data';

export default function LoginForm() {
  const router = useRouter();
  const { setUsuario, setEmpresa, setProductos } = useAuthStore();
  const [form, setForm] = useState<LoginDto>({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (process.env.NEXT_PUBLIC_USE_MOCKS === 'true') {
        // Modo mock: simular login exitoso con datos de prueba
        await new Promise((r) => setTimeout(r, 600));
        setUsuario(MOCK_USUARIO);
        setEmpresa(MOCK_EMPRESA);
        setProductos(MOCK_PRODUCTOS);
        router.push('/dashboard');
        return;
      }

      // TODO: Reemplazar con llamada real a la API
      const res = await fetch(AUTH_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.message ?? 'Correo o contraseña incorrectos');
        return;
      }

      router.push('/dashboard');
    } catch {
      setError('Error de conexión. Verifica tu red e intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

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
            onChange={handleChange}
            placeholder="usuario@ejemplo.com"
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-md border border-border bg-bg text-text placeholder:text-text-muted transition-colors focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Contraseña */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-sm font-medium text-text">
          Contraseña
        </label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-text-muted pointer-events-none">
            lock
          </span>
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            required
            value={form.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full pl-10 pr-10 py-2.5 text-sm rounded-md border border-border bg-bg text-text placeholder:text-text-muted transition-colors focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">
              {showPassword ? 'visibility_off' : 'visibility'}
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
        disabled={isLoading}
        className="w-full py-2.5 rounded-md bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed text-text-inverse font-semibold text-sm transition-colors"
      >
        {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
      </button>

      {/* Olvidé mi contraseña */}
      <Link
        href="/recuperar-contrasena"
        className="text-center text-sm text-primary hover:text-primary-dark transition-colors"
      >
        ¿Olvidaste tu contraseña?
      </Link>

    </form>
  );
}
