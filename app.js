require('dotenv').config();
const http = require('http');
const express = require('express');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth.routes');
const eventRoutes = require('./routes/events.routes');
const registrationRoutes = require('./routes/registration.routes');
const announcementRoutes = require('./routes/announcement.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utils/swagger');

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(mongoSanitize());
app.get('/health', (req, res) => res.json({ status: 'ok', environment: process.env.NODE_ENV || 'development', uptime: process.uptime(), database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' }));
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use((req, res) => res.status(404).json({ status: 'fail', message: 'Route not found' }));
app.use(errorHandler);

function configureSockets(io) {
  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    socket.on('join-event', (eventId) => socket.join(String(eventId)));
    socket.on('disconnect', () => console.log(`Socket disconnected: ${socket.id}`));
  });
}

if (require.main === module) {
  const server = http.createServer(app);
  const io = new Server(server, { cors: { origin: '*' } });
  app.set('io', io);
  configureSockets(io);
  connectDB().then(() => server.listen(process.env.PORT || 3000, () => console.log(`Server running on port ${process.env.PORT || 3000}`))).catch((error) => { console.error(error); process.exit(1); });
}

module.exports = { app, configureSockets };
