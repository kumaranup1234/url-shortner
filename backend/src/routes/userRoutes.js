const express = require('express');
const router = express.Router();
const {
    handleSignup,
    handleLogin,
    handleLogout,
    getUserProfile,
    updateUserProfile,
    generateApiKey,
    regenerateApiKey,
    getAllCount,
    handleStatus
} = require('../controllers/userController');

const { authenticateUser } = require('../middleware/authenticate');
const { checkAuthStatus } = require('../middleware/checkAuthStatus');

// User Registration
router.post('/signup', handleSignup);

// User Login
router.post('/login', handleLogin);

// User Logout
router.post("/logout", handleLogout);

// User Status
router.get("/status", checkAuthStatus, handleStatus)

// Get User Profile
router.get('/profile', authenticateUser, getUserProfile);

// Update User Profile
router.put('/profile', authenticateUser, updateUserProfile);

// Generate New API Key
router.post('/generate-api-key', authenticateUser, generateApiKey);

// Regenerate API Key
router.post('/regenerate-api-key', authenticateUser, regenerateApiKey);

// Get all Links count and all total clicks count
router.get("/getAll", authenticateUser, getAllCount);

module.exports = router;
