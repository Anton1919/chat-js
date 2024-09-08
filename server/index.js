const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { addUser, findUser } = require('./users');
const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:5173'],
  optionsSuccessStatus: 200,
  credentials: true,
};

const _PORT_ = process.env.PORT || 8000;
const route = require('./route');

const app = express();
const server = http.createServer(app);

// middlewares
app.use(cors(corsOptions));
app.use(route);

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  socket.on('join', ({ name, room }) => {
    socket.join(room);

    const { user } = addUser({ name, room });

    socket.emit('message', {
      data: { user: { name: 'Admin' }, message: `Hello ${user.name} !` },
    });

    socket.broadcast.to(user.room).emit('message', {
      data: { user: { name: 'Admin' }, message: `${user.name} has joined` },
    });
  });

  socket.on('sendMessage', ({ message, params }) => {
    const user = findUser(params);

    if (user) {
      io.to(user.room).emit('message', { data: { user, message } });
    }
  });

  io.on('disconnect', () => {
    console.log('Disconnect');
  });
});

const startApp = async () => {
  try {
    server.listen(_PORT_, () => {
      console.log(`Server is ready on port: ${_PORT_}`);
    });
  } catch (e) {
    console.error(e);
  }
};

startApp();