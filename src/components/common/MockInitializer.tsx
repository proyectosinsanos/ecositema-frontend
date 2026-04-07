'use client';

import { useEffect } from 'react';
import { useNotificacionesStore } from '@/store/notificaciones.store';
import { useAuthStore }           from '@/store/auth.store';
import { MOCK_NOTIFICACIONES, MOCK_USUARIO, MOCK_EMPRESA, MOCK_PRODUCTOS } from '@/mocks/mock.data';

export default function MockInitializer() {
  const { setNotificaciones }                        = useNotificacionesStore();
  const { setUsuario, setEmpresa, setProductos } = useAuthStore();

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_USE_MOCKS !== 'true') return;
    setUsuario(MOCK_USUARIO);
    setEmpresa(MOCK_EMPRESA);
    setProductos(MOCK_PRODUCTOS);
    setNotificaciones(MOCK_NOTIFICACIONES);
  }, [setUsuario, setEmpresa, setProductos, setNotificaciones]);

  return null;
}
