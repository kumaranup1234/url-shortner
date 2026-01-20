const express = require('express');
const router = express.Router();
const {
    createShortUrl,
    getUrlDetails,
    deleteUrl,
    getUserUrls,
    getClicksAnalytics,
    UpdateUrl,
    createShortUrlAnon
} = require('../controllers/urlController');
const { authenticateUser } = require('../middleware/authenticate');
const { validateUrl, sanitizeInput } = require('../middleware/validation');
const { strictLimiter } = require('../middleware/rateLimiter');

// Create Short URL Anonymous (with stricter rate limiting)
router.post('/anon/shorten', strictLimiter, validateUrl, sanitizeInput, createShortUrlAnon);

// Create Short URL (authenticated)
router.post('/shorten', authenticateUser, validateUrl, sanitizeInput, createShortUrl);

// Get URL Details
router.get('/details/:shortUrlId', authenticateUser, getUrlDetails);

// Update URL
router.put('/update/:shortUrlId', authenticateUser, sanitizeInput, UpdateUrl);

// Delete URL
router.delete('/delete/:shortUrlId', authenticateUser, deleteUrl);

// Get User's URLs with pagination
router.get('/user-urls', authenticateUser, getUserUrls);

// Get Total Clicks for a URL
router.get('/total-clicks/:shortUrlId', authenticateUser, getClicksAnalytics);

module.exports = router;
