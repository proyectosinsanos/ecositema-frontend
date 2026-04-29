'use client';

import { useEffect } from 'react';
import { useAuthStore, useNotificacionesStore } from '@/store';
import { connectSocket, disconnectSocket, getSocket } from '@/lib/socket';
import { Notificacion } from '@/types/models';


export default function SocketInitializer() {
  const usuario = useAuthStore((s) => s.usuario);
  const agregar = useNotificacionesStore((s) => s.agregar);

  useEffect(() => {
    if (!usuario) return;

    const socket = getSocket();

    socket.on('connect_error', (err) => console.error('[socket] connect_error:', err.message));
    connectSocket(usuario.id_usuario);

    socket.on('ALERT', (notificacion: Notificacion) => {
      agregar(notificacion);
    });

    return () => {
      socket.off('connect_error');
      socket.off('ALERT');
      disconnectSocket();
    };
  }, [usuario, agregar]);

  return null;
}
