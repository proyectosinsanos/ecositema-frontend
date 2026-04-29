'use client';

import { useRef, useEffect } from 'react';
import { useAuthStore } from '@/store';
import { AUTH_ENDPOINTS } from '@/api';
import { IframeAuthMessage } from '@/types/Auth';

interface MicroservicioFrameProps {
  fallback: React.ReactNode;
}

export default function MicroservicioFrame({ fallback }: MicroservicioFrameProps) {
  const { microservicioActivo, usuario, navegacion, setNavegacion } = useAuthStore();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!navegacion || !iframeRef.current?.contentWindow || !microservicioActivo) return;
    const targetOrigin = new URL(microservicioActivo.url).origin;
    iframeRef.current.contentWindow.postMessage({ type: 'NAVIGATE', link: navegacion }, targetOrigin);
    setNavegacion(null);
  }, [navegacion, microservicioActivo, setNavegacion]);

  if (!microservicioActivo) {
    return <div className="h-full bg-surface p-6 overflow-auto">{fallback}</div>;
  }

  const targetOrigin = new URL(microservicioActivo.url).origin;

  const handleLoad = async () => {
    if (!usuario || !iframeRef.current?.contentWindow) return;

    // TODO: descomentar cuando el backend implemente POST /auth/iframe-token
    // const res = await fetch(AUTH_ENDPOINTS.IFRAME_TOKEN, {
    //   method: 'POST',
    //   credentials: 'include',
    // });
    // const { token } = await res.json();

    const token = 'TODO_EPHEMERAL_TOKEN'; // reemplazar con la llamada al backend

    const message: IframeAuthMessage = {
      type: 'CISTEM_AUTH',
      token,
      usuario: {
        id_usuario: usuario.id_usuario,
        name:       usuario.name,
        last_name:  usuario.last_name,
        email:      usuario.email,
      },
    };

    iframeRef.current.contentWindow.postMessage(message, targetOrigin);
  };

  return (
    <iframe
      ref={iframeRef}
      key={microservicioActivo.key}
      src={microservicioActivo.url}
      title={microservicioActivo.label}
      className="w-full h-full border-0"
      onLoad={handleLoad}
    />
  );
}
