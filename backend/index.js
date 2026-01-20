require('dotenv').config();
const validateEnv = require('./src/utils/validateEnv');
validateEnv();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const compression = require('compression');

const userRoutes = require('./src/routes/userRoutes');
const urlRoutes = require('./src/routes/urlRoutes');
const oneLinkRoutes = require('./src/routes/oneLinkRoutes');
const apiRoutes = require('./src/routes/apiRoutes');
const clickRoutes = require('./src/routes/clickRoutes');
const redirectRoutes = require('./src/routes/redirectRoutes');

const { authenticateUser } = require('./src/middleware/authenticate');
const { authenticateApiKey } = require('./src/middleware/authenticate');
const errorHandler = require('./src/middleware/errorHandler');
const { globalLimiter } = require('./src/middleware/rateLimiter');

const app = express();
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
app.use(compression());
app.use(globalLimiter);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));

const allowedOrigins = [
  "http://localhost:5173",
  "https://trimat.vercel.app",
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true,
  optionsSuccessStatus: 200
}));

// Connect to MongoDB with proper configuration
mongoose.connect(process.env.MONGODB_URI, {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  bufferCommands: false
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Handle MongoDB connection events
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// User-related routes (for internal use)
app.use('/api/users', userRoutes);

// URL-related routes (for internal use)
app.use('/api/urls/manage', urlRoutes);

// Click analytics routes (for internal use, nested under URL management routes)
app.use('/api/urls', authenticateUser, clickRoutes);

// oneLink routes
app.use('/api/onelink', oneLinkRoutes);

// Public API routes (for external users using API key)
// Place this AFTER specific /api/ routes to avoid middleware conflict
app.use('/api', authenticateApiKey, apiRoutes);

// URL redirection route (publicly accessible)
app.use('/', redirectRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Handle server errors
server.on('error', (err) => {
  console.error('Server error:', err);
});
