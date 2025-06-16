const WebSocket = require('ws');
const express = require('express');
const path = require('path');
const logger = require('./logger');
const config = require('./config');

class ChatServer {
  constructor() {
    this.app = express();
    this.port = config.PORT;
    this.clients = new Set();
    this.setupMiddleware();
    this.setupStaticFiles();
    this.setupWebSocket();
  }

  setupMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  setupStaticFiles() {
    this.app.use(express.static(path.join(__dirname, '../public')));
  }

  setupWebSocket() {
    this.server = this.app.listen(this.port, () => {
      logger.info(`Server berjalan di http://localhost:${this.port}`);
    });

    this.wss = new WebSocket.Server({ server: this.server });

    this.wss.on('connection', (ws) => {
      this.handleConnection(ws);
    });
  }

  handleConnection(ws) {
    this.clients.add(ws);
    logger.info('Client baru terhubung');

    ws.on('message', (data) => {
      this.broadcastMessage(data.toString());
    });

    ws.on('close', () => {
      this.clients.delete(ws);
      logger.info('Client terputus');
    });

    ws.on('error', (error) => {
      logger.error('Error pada koneksi WebSocket:', error);
    });
  }

  broadcastMessage(message) {
    const timestamp = new Date().toISOString();
    const fullMessage = `[${timestamp}] ${message}`;
    
    logger.info(`Mengirim pesan: ${fullMessage}`);
    
    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(fullMessage);
      }
    });
  }
}

// Jalankan server
new ChatServer();