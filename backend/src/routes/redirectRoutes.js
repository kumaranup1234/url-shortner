const express = require('express');
const router = express.Router();
const Url = require('../models/Url');
const Click = require('../models/Click');
const AnonymousUrl = require('../models/AnonymousUrl');
const { getDeviceType } = require('../utils/deviceUtils');
const { getClientIp } = require('../utils/ipFinder');
const uaParser = require('ua-parser-js');
const geoip = require('geoip-lite');

// Handle Redirection
router.get('/:shortUrlId', async (req, res) => {
    try {
        const { shortUrlId } = req.params;
        // Optimized: Use .lean() for faster read (we don't need hydration here since we manually update later)
        let url = await Url.findOne({ shortUrl: shortUrlId }).lean();

        if (!url) {
            url = await AnonymousUrl.findOne({ shortUrl: shortUrlId }).lean();
            if (!url) {
                return res.status(404).json({ success: false, message: 'URL not found' });
            }
            return res.redirect(url.originalUrl);
        }

        // Get the real IP address
        const ipAddress = getClientIp(req);

        // Parse user agent for browser and OS information
        const userAgentData = uaParser(req.headers['user-agent']);
        const browser = userAgentData.browser.name;
        const os = userAgentData.os.name;

        // Determine if the request is coming from localhost
        let location = {};
        if (ipAddress === '::1' || ipAddress === '127.0.0.1') {
            // Mock location data for localhost
            location = {
                country: 'Local Country',
                city: 'Local City',
                lat: 0.0,
                lng: 0.0,
            };
        } else {
            // Get location based on IP address
            const geo = geoip.lookup(ipAddress);
            if (geo) {
                location = {
                    country: geo.country,
                    city: geo.city,
                    lat: geo.ll[0],
                    lng: geo.ll[1],
                };
            }
        }

        // Parallelize writes for speed
        const writePromises = [];

        // 1. Record the click
        const click = new Click({
            url: url._id,
            timestamp: new Date(),
            ipAddress,
            userAgent: req.headers['user-agent'],
            deviceType: getDeviceType(req.headers['user-agent']),
            browser,
            os,
            location,
            referrer: req.get('Referrer') || 'Direct Access',
        });
        writePromises.push(click.save());

        // 2. Increment URL stats (Direct DB update instead of document method)
        writePromises.push(Url.updateOne(
            { _id: url._id },
            {
                $inc: { totalClicks: 1 },
                $set: { lastAccessed: new Date() }
            }
        ));

        // Await both writes in parallel
        await Promise.all(writePromises);

        // Redirect to the original URL
        res.redirect(url.originalUrl);
    } catch (error) {
        console.error('Redirection error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
