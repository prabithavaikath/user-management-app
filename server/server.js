const jsonServer = require('json-server');
const path = require('path');
const cors = require('cors');

// Create server
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// Enable CORS for frontend
server.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

// Add middleware
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Add timestamp to responses
server.use((req, res, next) => {
  res.header('X-Powered-By', 'User Management API');
  next();
});

// Validation middleware for POST and PUT
server.use((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    const { firstName, lastName, email, phoneNumber } = req.body;
    
    // Basic validation
    if (!firstName || !lastName || !email || !phoneNumber) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['firstName', 'lastName', 'email', 'phoneNumber']
      });
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    // Phone validation
    if (phoneNumber.length < 10) {
      return res.status(400).json({ error: 'Phone number must be at least 10 characters' });
    }
  }
  next();
});

// Health check endpoint
server.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Custom endpoint for statistics
server.get('/api/stats', (req, res) => {
  const db = router.db;
  const users = db.get('users').value();
  res.json({
    totalUsers: users.length,
    timestamp: new Date().toISOString()
  });
});

// Use default router
server.use('/api', router);

// Error handling middleware
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Get port from environment
const PORT = process.env.PORT || 3001;

// Start server
server.listen(PORT, () => {
  console.log(`🚀 JSON Server is running on port ${PORT}`);
  console.log(`📊 API URL: http://localhost:${PORT}/api`);
  console.log(`❤️  Health check: http://localhost:${PORT}/health`);
});