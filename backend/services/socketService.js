/**
 * ResQNet AI - Socket.IO Real-Time Dispatch Pipeline
 */

let ioInstance = null;

const initSocketIO = (io) => {
  ioInstance = io;

  io.on('connection', (socket) => {
    console.log(`[Socket.IO] Client connected: ${socket.id}`);

    // Join specific role channel (e.g., 'CITIZEN', 'RESPONDER', 'ADMIN')
    socket.on('join_channel', ({ role, userId }) => {
      socket.join(role);
      if (userId) socket.join(`user_${userId}`);
      console.log(`[Socket.IO] Socket ${socket.id} joined room ${role}`);
    });

    // Realtime responder GPS telemetry
    socket.on('responder_telemetry', (data) => {
      // Broadcast live coordinates to assigned citizen and admin
      socket.to('ADMIN').emit('responder_location_update', data);
      if (data.incidentId) {
        socket.to(`incident_${data.incidentId}`).emit('live_responder_eta', data);
      }
    });

    // Incident status transition broadcast
    socket.on('status_transition', (data) => {
      io.emit('incident_status_changed', data);
    });

    socket.on('disconnect', () => {
      console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
    });
  });
};

// Dispatch helper functions
const notifyNewEmergency = (incident) => {
  if (!ioInstance) return;
  ioInstance.to('ADMIN').emit('admin_critical_alert', incident);
  ioInstance.to('RESPONDER').emit('responder_new_emergency', incident);
};

const notifyResponderAssigned = (incident, responder) => {
  if (!ioInstance) return;
  ioInstance.emit('incident_assigned', { incident, responder });
};

const notifyStatusUpdate = (incidentId, status) => {
  if (!ioInstance) return;
  ioInstance.emit('incident_status_updated', { incidentId, status });
};

module.exports = {
  initSocketIO,
  notifyNewEmergency,
  notifyResponderAssigned,
  notifyStatusUpdate
};
