const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const urlRoutes = require('./routes/urlRoutes');
const apiRoutes = require('./routes/apiRoutes'); // For public API
const clickRoutes = require('./routes/clickRoutes'); // For click analytics
const redirectRoutes = require('./routes/redirectRoutes'); // For URL redirection
const { authenticateUser } = require('./middleware/auth');
const { authenticateApiKey } = require('./middleware/authenticate'); // Middleware for API key authentication

const app = express();

// Middleware for parsing JSON request bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:7635074651@cluster0.8rccap1.mongodb.net/urlShortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// User-related routes (for internal use)
app.use('/api/users', userRoutes);

// URL-related routes (for internal use)
app.use('/api/urls/manage', authenticateUser, urlRoutes);

// Public API routes (for external users using API key)
app.use('/api', authenticateApiKey, apiRoutes);

// Click analytics routes (for internal use, nested under URL management routes)
app.use('/api/urls/:shortUrlId', authenticateUser, clickRoutes);

// URL redirection route (publicly accessible)
app.use('/', redirectRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
