import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (typeof window === 'undefined') {
    throw new Error('getSocket() solo puede llamarse en el cliente');
  }
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_API_BASE_URL ?? '', {
      withCredentials: true,
      autoConnect: false,
    });
  }
  return socket;
}

export function connectSocket(userId: number): void {
  const s = getSocket();
  s.once('connect', () => {
    console.log('[socket] conectado, id:', s.id);
    s.emit('join_room', { id: userId, module: 'ECOSYSTEM' });
  });
  s.on('disconnect', (reason) => console.log('[socket] desconectado:', reason));
  if (!s.connected) {
    s.connect();
  } else {
    console.log('[socket] ya conectado, id:', s.id);
    s.emit('join_room', { id: userId, module: 'ECOSYSTEM' });
  }
}

export function disconnectSocket(): void {
  if (socket?.connected) {
    socket.disconnect();
  }
}
