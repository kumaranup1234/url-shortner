const express = require('express');
const router = express.Router();
const {
    getAllClicks,
    getClicksByDevice,
    getClicksByBrowser,
    getClicksByLocation,
    getClicksByReferrer,
    getClicksByOs,
    getAllUserClicks
} = require('../controllers/clickController');
const { authenticateUser } = require('../middleware/authenticate');

// Get All Clicks for a URL for a span of 10 days
router.get('/clicks/:shortUrlId', authenticateUser, getAllClicks);

// Get all Clicks for user a span of 10 days along with the total overall clicks
router.get('/clicks/getUsersClicks', authenticateUser, getAllUserClicks);

// Get Clicks by Device Type
router.get('/clicks/devices/:shortUrlId', authenticateUser, getClicksByDevice);

// Get Clicks by Browser
router.get('/clicks/browsers/:shortUrlId', authenticateUser, getClicksByBrowser);

// Get Clicks by Location
router.get('/clicks/locations/:shortUrlId', authenticateUser, getClicksByLocation);

// Get Clicks by Referrer
router.get('/clicks/referrers/:shortUrlId', authenticateUser, getClicksByReferrer);

// Get Clicks by OS
router.get('/clicks/os/:shortUrlId', authenticateUser, getClicksByOs);
module.exports = router;
