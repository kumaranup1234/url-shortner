const express = require('express');
const router = express.Router();
const Url = require('../models/Url'); // Your URL model
const Click = require('../models/Click'); // Your Click model
const { getDeviceType } = require('../utils/deviceUtils'); // Utility to determine device type

// Handle Redirection
router.get('/:shortUrlId', async (req, res) => {
    try {
        const { shortUrlId } = req.params;
        const url = await Url.findOne({ shortUrl: shortUrlId });

        if (!url) {
            return res.status(404).json({ success: false, message: 'URL not found' });
        }

        // Record the click
        const click = new Click({
            url: url._id,
            timestamp: new Date(),
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'],
            deviceType: getDeviceType(req.headers['user-agent']),
            referrer: req.get('Referrer') || 'Direct Access',
        });

        await click.save();

        // Redirect to the original URL
        res.redirect(url.originalUrl);
    } catch (error) {
        console.error('Redirection error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
