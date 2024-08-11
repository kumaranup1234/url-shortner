const express = require('express');
const router = express.Router();
const {
    getAllClicks,
    getClicksByDevice,
    getClicksByBrowser,
    getClicksByLocation,
    getClicksByReferrer,
} = require('../controllers/clickController');
const { authenticateUser } = require('../middleware/authenticate');

// Get All Clicks for a URL
//router.get('/:shortUrlId/clicks', authenticateUser, getAllClicks);

// Get Clicks by Device Type
//router.get('/:shortUrlId/clicks/devices', authenticateUser, getClicksByDevice);

// Get Clicks by Browser
//router.get('/:shortUrlId/clicks/browsers', authenticateUser, getClicksByBrowser);

// Get Clicks by Location
//router.get('/:shortUrlId/clicks/locations', authenticateUser, getClicksByLocation);

// Get Clicks by Referrer
//router.get('/:shortUrlId/clicks/referrers', authenticateUser, getClicksByReferrer);

module.exports = router;
