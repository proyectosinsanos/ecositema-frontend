'use client';

import { useEffect } from 'react';
import { useAuthStore, useNotificacionesStore } from '@/store';
import { connectSocket, disconnectSocket, getSocket } from '@/lib/socket';
import { Notificacion } from '@/types/models';
import { NOTIFICACIONES_ENDPOINTS } from '@/api';


export default function SocketInitializer() {
  const usuario = useAuthStore((s) => s.usuario);
  const agregar = useNotificacionesStore((s) => s.agregar);
  const { setNotificaciones } = useNotificacionesStore();


  useEffect(() => {
    if (!usuario) return;

    const socket = getSocket();

    socket.on('connect_error', (err) => console.error('[socket] connect_error:', err.message));
    connectSocket(usuario.id_usuario);

    socket.on('RELOAD_NOTIFICATIONS', () => {
      fetch(NOTIFICACIONES_ENDPOINTS.LISTAR, {
        credentials: 'include',
        method: 'GET',
      })
        .then((res) => res.json() as Promise<Notificacion[]>)
        .then((data) => {
          setNotificaciones(data);
          return data;
        })
        .catch(() => []);
    });

    return () => {
      socket.off('connect_error');
      socket.off('ALERT');
      disconnectSocket();
    };
  }, [usuario, agregar]);

  return null;
}
