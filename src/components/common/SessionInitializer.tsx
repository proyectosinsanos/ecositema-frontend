'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore, useNotificacionesStore } from '@/store';
import { AUTH_ENDPOINTS, NOTIFICACIONES_ENDPOINTS } from '@/api';
import { SesionDto } from '@/types/Auth';
import { MOCK_USUARIO, MOCK_EMPRESA, MOCK_PRODUCTOS, MOCK_NOTIFICACIONES } from '@/mocks';

export default function SessionInitializer() {
  const router = useRouter();
  const { setUsuario, setEmpresa, setProductos } = useAuthStore();
  const { setNotificaciones } = useNotificacionesStore();

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_USE_MOCKS === 'true') {
      setUsuario(MOCK_USUARIO);
      setEmpresa(MOCK_EMPRESA);
      setProductos(MOCK_PRODUCTOS);
      setNotificaciones(MOCK_NOTIFICACIONES);
      return;
    }

    fetch(AUTH_ENDPOINTS.ME, { credentials: 'include', method: 'POST' })
      .then((res) => {
        if (res.status === 401) {
          router.replace('/login');
          return null;
        }
        return res.json() as Promise<SesionDto>;
      })
      .then((data) => {
        if (!data) return;
  
        setUsuario(data.usuario);
        setEmpresa(data.empresa);
        setProductos(data.productos);
        setNotificaciones(data.notificaciones);
      })
      .catch(() => router.replace('/login'));
  }, [setUsuario, setEmpresa, setProductos, setNotificaciones, router]);

  return null;
}
