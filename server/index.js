const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { addUser, findUser, getRoomUsers, removeUser } = require('./users');
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

    const { user, isExist } = addUser({ name, room });

    const userMessage = isExist ? `${user.name}, here you go again` : `Hello ${user.name} !`;

    socket.emit('message', {
      data: { user: { name: 'Admin' }, message: userMessage },
    });

    socket.broadcast.to(user.room).emit('message', {
      data: { user: { name: 'Admin' }, message: `${user.name} has joined` },
    });

    io.to(user.room).emit('room', { data: { users: getRoomUsers(user.room) } });
  });

  socket.on('sendMessage', ({ message, params }) => {
    const user = findUser(params);

    if (user) {
      io.to(user.room).emit('message', { data: { user, message } });
    }
  });

  socket.on('leftRoom', ({ params }) => {
    const user = removeUser(params);

    if (user) {
      const { room, name } = user;

      io.to(room).emit('message', {
        data: {
          user: { name: 'Admin' },
          message: `${name} has left room "${room}"`,
        },
      });

      io.to(user.room).emit('room', {
        data: {
          users: getRoomUsers(room),
        },
      });
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