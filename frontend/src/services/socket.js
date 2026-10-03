import { io } from 'socket.io-client';

const SOCKET_SERVER_URL = import.meta.env?.VITE_SOCKET_URL || 'http://localhost:5000';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect(role, userId) {
    if (this.socket) return this.socket;

    this.socket = io(SOCKET_SERVER_URL, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5
    });

    this.socket.on('connect', () => {
      console.log('[Socket] Connected to ResQNet real-time server:', this.socket.id);
      this.socket.emit('join_channel', { role, userId });
    });

    return this.socket;
  }

  onNewEmergency(callback) {
    if (!this.socket) return;
    this.socket.on('responder_new_emergency', callback);
    this.socket.on('admin_critical_alert', callback);
  }

  onStatusUpdate(callback) {
    if (!this.socket) return;
    this.socket.on('incident_status_changed', callback);
    this.socket.on('incident_status_updated', callback);
  }

  sendTelemetry(data) {
    if (!this.socket) return;
    this.socket.emit('responder_telemetry', data);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export default new SocketService();
