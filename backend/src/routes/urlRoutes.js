const express = require('express');
const router = express.Router();
const {
    createShortUrl,
    redirectShortUrl,
    getUrlDetails,
    deleteUrl,
    getUserUrls,
    getClicksAnalytics,
} = require('../controllers/urlController');
const { authenticateUser } = require('../middleware/authenticate');

// Create Short URL
router.post('/shorten', authenticateUser, createShortUrl);

// Redirect Short URL
//router.get('/:shortUrl', redirectShortUrl);

// Get URL Details
//router.get('/details/:shortUrlId', authenticateUser, getUrlDetails);

// Delete URL
//router.delete('/:shortUrlId', authenticateUser, deleteUrl);

// Get User's URLs
//router.get('/user-urls', authenticateUser, getUserUrls);

// Get Clicks Analytics for a URL
//router.get('/analytics/:shortUrlId', authenticateUser, getClicksAnalytics);

module.exports = router;
