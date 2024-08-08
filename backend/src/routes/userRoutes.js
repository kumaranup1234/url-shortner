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

// User Registration
router.post('/signup', handleSignup);

// User Login
router.post('/login', handleLogin);

// Get User Profile
router.get('/profile', getUserProfile);

// Update User Profile
router.put('/profile', updateUserProfile);

// Generate New API Key
router.post('/generate-api-key', generateApiKey);

// Regenerate API Key
router.post('/regenerate-api-key', regenerateApiKey);

module.exports = router;
