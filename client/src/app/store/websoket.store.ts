import { makeAutoObservable } from 'mobx';

class WebSocketStore {
  socket: WebSocket | null = null;
  messages: string[] = [];
  connected: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  connect() {
    this.socket = new WebSocket('ws://localhost:8000/ws');

    this.socket.onopen = () => {
      this.connected = true;
      console.log('WebSocket connection established');
    };

    this.socket.onmessage = (event) => {
      console.log('message:', event);
      this.addMessage(event.data);
    };

    this.socket.onclose = () => {
      this.connected = false;
      console.log('WebSocket connection closed');
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  addMessage(message: string) {
    this.messages.push(message);
  }

  sendMessage(message: string) {
    if (this.socket && this.connected) {
      console.log('send');
      this.socket.send(message);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export const webSocketStore = new WebSocketStore();
