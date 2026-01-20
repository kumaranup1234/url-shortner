const Url = require('../models/Url');
const shortid = require('shortid');
const { generateQRCodeForUrl } = require('../utils/generateQrCode');
const { extractData } = require('../utils/extractMetaData');

// Create a new short URL
const createShortUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;
        const userId = req.user._id;

        if (!originalUrl) {
            return res.status(400).json({ error: true, message: 'originalUrl is required' });
        }

        // Check if URL already exists for this user
        const existingUrl = await Url.findOne({ originalUrl, user: userId, isActive: true });
        if (existingUrl) {
            return res.status(200).json({
                success: true,
                message: 'URL already shortened',
                data: {
                    originalUrl: existingUrl.originalUrl,
                    shortUrl: existingUrl.shortUrl,
                    shortUrlFull: `${process.env.FRONTEND_URL}/${existingUrl.shortUrl}`
                }
            });
        }

        const shortId = shortid.generate();

        // Generate QR and Metadata
        const [qrCode, { title, logo }] = await Promise.all([
            generateQRCodeForUrl(shortId),
            extractData(originalUrl)
        ]);

        const newUrl = new Url({
            originalUrl,
            shortUrl: shortId,
            user: userId,
            qrCode,
            title: title || 'Untitled',
            logo,
            isActive: true
        });

        await newUrl.save();

        // Add to user's urls array (optional if using virtuals/queries, but good for consistency)
        // req.user.urls.push(newUrl._id);
        // await req.user.save(); 
        // Note: urlController updates User model via findByIdAndUpdate. We can assume the relationship is maintained by the 'user' field in Url model mainly.

        res.status(201).json({
            success: true,
            message: 'URL shortened successfully',
            data: {
                originalUrl: newUrl.originalUrl,
                shortUrl: newUrl.shortUrl,
                shortUrlFull: `${process.env.FRONTEND_URL}/${newUrl.shortUrl}`,
                qrCode: newUrl.qrCode
            }
        });

    } catch (error) {
        console.error('API Create URL Error:', error);
        res.status(500).json({ error: true, message: 'Internal server error' });
    }
};

// Get URL Details
const getShortUrlDetails = async (req, res) => {
    try {
        const { shortUrlId } = req.params;
        const userId = req.user._id;

        const url = await Url.findOne({
            shortUrl: shortUrlId,
            user: userId,
            $or: [{ isActive: true }, { isActive: { $exists: false } }]
        }).select('-__v -user -_id');

        if (!url) {
            return res.status(404).json({ error: true, message: 'URL not found or unauthorized' });
        }

        res.status(200).json({
            success: true,
            data: url
        });

    } catch (error) {
        console.error('API Get Details Error:', error);
        res.status(500).json({ error: true, message: 'Internal server error' });
    }
};

// Get Analytics
const getAnalytics = async (req, res) => {
    try {
        const { shortUrlId } = req.params;
        const userId = req.user._id;

        const url = await Url.findOne({
            shortUrl: shortUrlId,
            user: userId,
            $or: [{ isActive: true }, { isActive: { $exists: false } }]
        });

        if (!url) {
            return res.status(404).json({ error: true, message: 'URL not found' });
        }

        res.status(200).json({
            success: true,
            data: {
                totalClicks: url.totalClicks,
                lastAccessed: url.lastAccessed || null,
                createdAt: url.createdAt
            }
        });

    } catch (error) {
        console.error('API Analytics Error:', error);
        res.status(500).json({ error: true, message: 'Internal server error' });
    }
};

// Update Short URL
const updateShortUrl = async (req, res) => {
    try {
        const { shortUrlId } = req.params;
        const { originalUrl } = req.body;
        const userId = req.user._id;

        if (!originalUrl) {
            return res.status(400).json({ error: true, message: 'originalUrl is required' });
        }

        const url = await Url.findOne({
            shortUrl: shortUrlId,
            user: userId,
            $or: [{ isActive: true }, { isActive: { $exists: false } }]
        });

        if (!url) {
            return res.status(404).json({ error: true, message: 'URL not found' });
        }

        url.originalUrl = originalUrl;

        // Re-extract metadata if valid URL
        const { title, logo } = await extractData(originalUrl);
        if (title) url.title = title;
        if (logo) url.logo = logo;

        await url.save();

        res.status(200).json({
            success: true,
            message: 'URL updated successfully',
            data: {
                shortUrl: url.shortUrl,
                originalUrl: url.originalUrl
            }
        });

    } catch (error) {
        console.error('API Update Error:', error);
        res.status(500).json({ error: true, message: 'Internal server error' });
    }
};

// Delete Short URL
const deleteShortUrl = async (req, res) => {
    try {
        const { shortUrlId } = req.params;
        const userId = req.user._id;

        const url = await Url.findOne({
            shortUrl: shortUrlId,
            user: userId,
            $or: [{ isActive: true }, { isActive: { $exists: false } }]
        });

        if (!url) {
            return res.status(404).json({ error: true, message: 'URL not found' });
        }

        // Soft delete
        url.isActive = false;
        url.deletedAt = new Date();
        await url.save();

        res.status(200).json({
            success: true,
            message: 'URL deleted successfully'
        });

    } catch (error) {
        console.error('API Delete Error:', error);
        res.status(500).json({ error: true, message: 'Internal server error' });
    }
};

module.exports = {
    createShortUrl,
    getShortUrlDetails,
    getAnalytics,
    updateShortUrl,
    deleteShortUrl
};
