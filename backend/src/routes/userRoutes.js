const express = require('express');
const router = express.Router();
const {
    handleSignup,
    handleLogin,
    getUserProfile,
    updateUserProfile,
    generateApiKey,
    regenerateApiKey,
} = require('../controllers/userController');

const { authenticateUser } = require('../middleware/authenticate');

// User Registration
router.post('/signup', handleSignup);

// User Login
router.post('/login', handleLogin);

// Get User Profile
router.get('/profile', authenticateUser, getUserProfile);

// Update User Profile
router.put('/profile', authenticateUser, updateUserProfile);

// Generate New API Key
router.post('/generate-api-key', authenticateUser, generateApiKey);

// Regenerate API Key
//router.post('/regenerate-api-key', regenerateApiKey);

module.exports = router;
