'use client';

import { useEffect } from 'react';
import { useAuthStore, useNotificacionesStore } from '@/store';
import { connectSocket, disconnectSocket, getSocket, sendAuthToken } from '@/lib/socket';
import { AUTH_ENDPOINTS } from '@/api';
import { Notificacion } from '@/types/models';

async function fetchAccessToken(): Promise<string | null> {
  const res = await fetch(AUTH_ENDPOINTS.REFRESH, {
    method: 'POST',
    credentials: 'include',
  });
  if (!res.ok) return null;
  const data = await res.json();
  return (data.access_token as string) ?? null;
}

export default function SocketInitializer() {
  const usuario = useAuthStore((s) => s.usuario);
  const agregar = useNotificacionesStore((s) => s.agregar);

  useEffect(() => {
    if (!usuario) return;

    const socket = getSocket();

    socket.on('connect_error', (err) => console.error('[socket] connect_error:', err.message));
    connectSocket(usuario.id_usuario);

    // El microservicio pide el token al montar su iframe
    socket.on('AUTH_READY', async () => {
      const token = await fetchAccessToken();
      if (token) sendAuthToken(token, usuario.id_usuario);
    });

    // El microservicio detectó que su token expiró y pide uno nuevo
    socket.on('TOKEN_EXPIRED', async () => {
      const token = await fetchAccessToken();
      if (token) sendAuthToken(token, usuario.id_usuario);
    });

    // El microservicio emite alertas nuevas
    socket.on('ALERT', (notificacion: Notificacion) => {
      agregar(notificacion);
    });

    return () => {
      socket.off('connect_error');
      socket.off('AUTH_READY');
      socket.off('TOKEN_EXPIRED');
      socket.off('ALERT');
      disconnectSocket();
    };
  }, [usuario, agregar]);

  return null;
}
