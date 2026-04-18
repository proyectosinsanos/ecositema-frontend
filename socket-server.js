const { createServer } = require('http');
const { Server } = require('socket.io');

const PORT = process.env.SOCKET_PORT || 3001;

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('[socket-server] cliente conectado:', socket.id);

  // El shell se une a un room identificado por userId
  socket.on('join', ({ room }) => {
    socket.join(room);
    console.log(`[socket-server] ${socket.id} se unió al room: ${room}`);
  });

  // El microservicio anuncia que está listo — broadcast al shell
  socket.on('AUTH_READY', (data) => {
    console.log(`[socket-server] AUTH_READY → broadcast`);
    socket.broadcast.emit('AUTH_READY', data);
  });

  // El shell responde con el token y el userId — broadcast al microservicio
  // El microservicio usará el userId para unirse al room correcto
  socket.on('AUTH_TOKEN', ({ userId, ...data }) => {
    console.log(`[socket-server] AUTH_TOKEN → broadcast | userId: ${userId}`);
    socket.broadcast.emit('AUTH_TOKEN', { ...data, userId });
  });

  // El shell navega al microservicio via room
  socket.on('NAVIGATE', ({ room, link }) => {
    console.log(`[socket-server] NAVIGATE → room ${room} | link: ${link}`);
    socket.to(room).emit('NAVIGATE', { link });
  });

  // El microservicio envía alertas al shell via room
  socket.on('ALERT', ({ room, ...data }) => {
    console.log(`[socket-server] ALERT → room ${room}`);
    socket.to(room).emit('ALERT', data);
  });

  socket.on('disconnect', () => {
    console.log('[socket-server] cliente desconectado:', socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`[socket-server] corriendo en http://localhost:${PORT}`);
});
