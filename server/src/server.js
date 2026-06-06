require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const leadRoutes = require('./routes/leadRoutes');
const errorHandler = require('./middleware/errorHandler');
const apiResponse = require('./utils/apiResponse');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware Stack
app.use(helmet());

// Configure CORS
const allowedOrigins = [];
if (process.env.CORS_ORIGIN) {
  // Normalize by removing trailing slash if present
  allowedOrigins.push(process.env.CORS_ORIGIN.replace(/\/$/, ''));
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);
      
      // Normalize origin
      const cleanOrigin = origin.replace(/\/$/, '');

      // Allow if it matches CORS_ORIGIN, local host, or is a vercel.app preview URL
      const isAllowed = 
        allowedOrigins.includes(cleanOrigin) ||
        cleanOrigin.startsWith('http://localhost:') ||
        cleanOrigin.startsWith('http://127.0.0.1:') ||
        cleanOrigin.endsWith('.vercel.app');

      if (isAllowed) {
        return callback(null, true);
      } else {
        const msg = `The CORS policy for this site does not allow access from origin: ${origin}`;
        return callback(new Error(msg), false);
      }
    },
    credentials: true,
  })
);

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Base test route
app.get('/api/health', (req, res) => {
  res.status(200).json(apiResponse(true, { uptime: process.uptime() }, 'API is healthy and online'));
});

// API Routes
app.use('/api/leads', leadRoutes);

// Fallback 404 Route
app.use((req, res, next) => {
  res.status(404).json(apiResponse(false, null, `Route ${req.originalUrl} not found`));
});

// Global Error Handler Middleware (Must be last)
app.use(errorHandler);

// Start Server
const server = app.listen(PORT, () => {
  console.log(`[Server] running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`[Unhandled Rejection] Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
