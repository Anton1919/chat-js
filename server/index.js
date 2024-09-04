const express = require('express')
const cors = require('cors')
const expressWs = require('express-ws');

const _PORT_ = process.env.PORT || 8000;
const route = require('./route')

const app = express()
expressWs(app);

const corsOptions = {
  origin: ['http://localhost:5173'],
  optionsSuccessStatus: 200,
  credentials: true,
};

// middlewares
app.use(cors(corsOptions));
app.use(route);

// Обработка WebSocket соединений
app.ws('/ws', (ws, req) => {
  console.log('websocket connection open');

  ws.on('message', (msg) => {
    console.log('Received message:', msg);

    // Отправка ответа обратно клиенту
    ws.send(msg);
  });

  // Обработка закрытия соединения
  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

const startApp = async () => {
  try {
    app.listen(_PORT_, () => {
      console.log(`Server is ready on port: ${_PORT_}`);
    });
  } catch (e) {
    console.log(e);
  }
}

startApp()