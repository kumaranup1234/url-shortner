const express = require('express');
const router = express.Router();
const Url = require('../models/Url');
const Click = require('../models/Click');
const { getDeviceType } = require('../utils/deviceUtils');
const {getClientIp} = require("../utils/ipFinder"); // Utility to determine device type

// Handle Redirection
router.get('/:shortUrlId', async (req, res) => {
    try {
        const { shortUrlId } = req.params;
        const url = await Url.findOne({ shortUrl: shortUrlId });

        if (!url) {
            return res.status(404).json({ success: false, message: 'URL not found' });
        }

        // Get the real IP address
        const ipAddress = getClientIp(req);

        // Record the click
        const click = new Click({
            url: url._id,
            timestamp: new Date(),
            ipAddress,
            userAgent: req.headers['user-agent'],
            deviceType: getDeviceType(req.headers['user-agent']),
            referrer: req.get('Referrer') || 'Direct Access',
        });

        await click.save();

        await url.incrementClick();

        // Redirect to the original URL
        res.redirect(url.originalUrl);
    } catch (error) {
        console.error('Redirection error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
