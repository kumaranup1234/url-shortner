const express = require('express');
const router = express.Router();
const {
    handleSignup,
    handleLogin,
    handleLogout,
    getUserProfile,
    updateUserProfile,
    getApiKey,
    regenerateApiKey,
    getAllCount,
    handleStatus,
    updateProfileImage,
    resetPassword,
    forgotPassword,
    forgotPasswordReset
} = require('../controllers/userController');

const { authenticateUser } = require('../middleware/authenticate');
const { checkAuthStatus } = require('../middleware/checkAuthStatus');
const resetPasswordLimiter = require("../middleware/resetPasswordRateLimiter");
const { validateEmail, sanitizeInput } = require('../middleware/validation');
const { strictLimiter } = require('../middleware/rateLimiter');

// User Registration
router.post('/signup', strictLimiter, validateEmail, sanitizeInput, handleSignup);

// User Login
router.post('/login', strictLimiter, validateEmail, sanitizeInput, handleLogin);

// User Logout
router.post("/logout", handleLogout);

// User Status
router.get("/status", checkAuthStatus, handleStatus)

// Get User Profile
router.get('/profile', authenticateUser, getUserProfile);

// Update User Profile
router.put('/profile', authenticateUser, sanitizeInput, updateUserProfile);

// Update Password Without Link
router.post("/password-reset", resetPasswordLimiter, authenticateUser, sanitizeInput, resetPassword)

// Update Password through Link
router.post("/reset", resetPasswordLimiter, validateEmail, sanitizeInput, forgotPassword);

// Update password through link
router.post("/reset/:resetToken", resetPasswordLimiter, sanitizeInput, forgotPasswordReset)

// Update User Image
router.post('/profile-image', authenticateUser, updateProfileImage)

// get API key
router.get('/get-api-key', authenticateUser, getApiKey);

// Regenerate API Key
router.post('/regenerate-api-key', authenticateUser, regenerateApiKey);

// Get all Links count and all total clicks count
router.get("/getAll", authenticateUser, getAllCount);

module.exports = router;
