
require('dotenv').config();
const myConnectiontoDB = require('./db');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const app = express();

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

//userschema: hum jo communication krwa rhy cors package ko use krky, express aur frontend ki json mein 

// Track DB connection status for the health endpoint
let dbConnected = false;

async function init() {
	try {
		// `myConnectiontoDB` (BackEnd-Project/db.js) returns a Promise that resolves when connected
		await myConnectiontoDB();
		dbConnected = true;
		console.log('DB connected');
	} catch (err) {
		dbConnected = false;
		console.error('DB connection failed:', err);
		// don't exit here; allow server to run but health will report disconnected
	}
}
// initialize DB connection but do not block module export
init();

// Import health monitor
const healthMonitor = require('./utils/healthMonitor');

// Health endpoint to verify server + DB status
app.get('/health', async (req, res) => {
	try {
		const healthStatus = await healthMonitor.getHealthStatus();
		res.json(healthStatus);
	} catch (error) {
		res.status(500).json({
			status: 'unhealthy',
			message: 'Health check failed',
			error: error.message
		});
	}
});

// Detailed health endpoint for monitoring
app.get('/health/detailed', async (req, res) => {
	try {
		const detailedHealth = await healthMonitor.getDetailedHealth();
		res.json(detailedHealth);
	} catch (error) {
		res.status(500).json({
			status: 'unhealthy',
			message: 'Detailed health check failed',
			error: error.message
		});
	}
});

// Mount API routes
app.use('/api', require('./myFiles/register'));
app.use('/api', require('./myFiles/auth'));
app.use('/api', require('./myFiles/users'));
app.use('/api', require('./myFiles/analytics'));

const PORT = process.env.PORT || 5000;

// Export app so tests can import without starting listener
module.exports = app;

// Only start server when run directly
if (require.main === module) {
	app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}