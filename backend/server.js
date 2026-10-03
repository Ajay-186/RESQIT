const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const connectDB = require('./config/db');
const { initSocketIO } = require('./services/socketService');

// Routes
const authRoutes = require('./routes/authRoutes');
const incidentRoutes = require('./routes/incidentRoutes');
const responderRoutes = require('./routes/responderRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

const app = express();
const server = http.createServer(app);

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/incidents', incidentRoutes);
app.use('/api/responders', responderRoutes);
app.use('/api/analytics', analyticsRoutes);

// Healthcheck & Metadata
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'ResQNet AI Hyperlocal Emergency Response Platform',
    version: '1.0.0-production',
    timestamp: new Date().toISOString()
  });
});

// Setup Socket.IO Server
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH']
  }
});
initSocketIO(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`  🚨 ResQNet AI Emergency Backend Server Running   `);
  console.log(`  PORT: ${PORT} | Realtime Socket.IO: ACTIVE        `);
  console.log(`====================================================`);
});

module.exports = { app, server };
