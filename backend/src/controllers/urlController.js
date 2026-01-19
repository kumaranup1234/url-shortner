const shortid = require('shortid');
const Url = require("../models/Url");
const User = require("../models/User");
const AnonymousUrl = require("../models/AnonymousUrl");
const { generateQRCodeForUrl } = require("../utils/generateQrCode");
const { extractData } = require("../utils/extractMetaData");

async function createShortUrlAnon(req, res, next) {
    try {
        const { originalUrl } = req.body;
        
        if (!originalUrl) {
            return res.status(400).json({ error: 'URL is required' });
        }

        const shortId = shortid.generate();

        // Check if URL already exists in anonymous URLs
        const existingUrl = await AnonymousUrl.findOne({ originalUrl });
        if (existingUrl) {
            return res.status(200).json({
                success: true,
                message: 'URL already shortened',
                originalUrl: existingUrl.originalUrl,
                shortUrl: existingUrl.shortUrl,
            });
        }

        const newUrl = new AnonymousUrl({
            originalUrl,
            shortUrl: shortId,
        });

        await newUrl.save();
        
        res.status(201).json({
            success: true,
            message: 'URL shortened successfully',
            originalUrl: newUrl.originalUrl,
            shortUrl: newUrl.shortUrl,
        });
    } catch (error) {
        next(error);
    }
}

async function createShortUrl(req, res, next) {
    try {
        const { originalUrl } = req.body;
        const userId = req.user._id;
        
        if (!originalUrl) {
            return res.status(400).json({ error: 'URL is required' });
        }

        // Check if URL already exists for this user
        const existingUrl = await Url.findOne({ originalUrl, user: userId, isActive: true });
        if (existingUrl) {
            return res.status(200).json({
                success: true,
                message: 'URL already shortened',
                originalUrl: existingUrl.originalUrl,
                shortUrl: existingUrl.shortUrl,
            });
        }

        const shortId = shortid.generate();
        
        // Generate QR code and extract metadata in parallel
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
        });

        await newUrl.save();

        // Update user's URL count (optimized)
        await User.findByIdAndUpdate(
            userId,
            { $push: { urls: newUrl._id } },
            { new: false } // Don't return updated document
        );

        res.status(201).json({
            success: true,
            message: 'URL shortened successfully',
            originalUrl: newUrl.originalUrl,
            shortUrl: newUrl.shortUrl,
            qrCode: newUrl.qrCode,
            title: newUrl.title,
            logo: newUrl.logo,
        });
    } catch (error) {
        next(error);
    }
}

async function getUrlDetails(req, res, next) {
    try {
        const { shortUrlId } = req.params;
        
        const urlDetails = await Url.findOne({ 
            shortUrl: shortUrlId, 
            user: req.user._id,
            isActive: true 
        }).select('-__v');

        if (!urlDetails) {
            return res.status(404).json({ error: 'URL not found' });
        }

        res.status(200).json({
            success: true,
            details: urlDetails
        });
    } catch (error) {
        next(error);
    }
}

async function UpdateUrl(req, res, next) {
    try {
        const { shortUrlId } = req.params;
        const { originalUrl: newUrl } = req.body;
        const userId = req.user._id;

        if (!newUrl) {
            return res.status(400).json({ error: 'New URL is required' });
        }

        const updateResult = await Url.updateOne(
            { shortUrl: shortUrlId, user: userId, isActive: true },
            { $set: { originalUrl: newUrl, updatedAt: new Date() } }
        );

        if (updateResult.matchedCount === 0) {
            return res.status(404).json({ error: 'URL not found' });
        }

        if (updateResult.modifiedCount === 0) {
            return res.status(400).json({ error: 'No changes made' });
        }

        res.status(200).json({
            success: true,
            message: 'URL updated successfully',
        });
    } catch (error) {
        next(error);
    }
}

async function deleteUrl(req, res, next) {
    try {
        const { shortUrlId } = req.params;
        const userId = req.user._id;

        // Soft delete by setting isActive to false
        const deleteResult = await Url.updateOne(
            { shortUrl: shortUrlId, user: userId, isActive: true },
            { $set: { isActive: false, deletedAt: new Date() } }
        );

        if (deleteResult.matchedCount === 0) {
            return res.status(404).json({ error: 'URL not found' });
        }

        res.status(200).json({
            success: true,
            message: 'URL deleted successfully',
        });
    } catch (error) {
        next(error);
    }
}

async function getUserUrls(req, res, next) {
    try {
        const userId = req.user._id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // Use the optimized static method
        const userUrls = await Url.getUserUrls(userId, page, limit);
        
        // Get total count for pagination
        const totalUrls = await Url.countDocuments({ 
            user: userId, 
            isOneLink: false, 
            isActive: true 
        });

        if (!userUrls || userUrls.length === 0) {
            return res.status(200).json({
                success: true,
                userUrls: [],
                pagination: {
                    page,
                    limit,
                    total: totalUrls,
                    pages: Math.ceil(totalUrls / limit)
                }
            });
        }

        res.status(200).json({
            success: true,
            userUrls,
            pagination: {
                page,
                limit,
                total: totalUrls,
                pages: Math.ceil(totalUrls / limit)
            }
        });
    } catch (error) {
        next(error);
    }
}

async function getClicksAnalytics(req, res, next) {
    try {
        const { shortUrlId } = req.params;
        const userId = req.user._id;

        const urlData = await Url.findOne({
            shortUrl: shortUrlId,
            user: userId,
            isActive: true
        }).select('totalClicks lastAccessed createdAt');

        if (!urlData) {
            return res.status(404).json({ error: 'URL not found' });
        }

        res.status(200).json({
            success: true,
            analytics: {
                totalClicks: urlData.totalClicks,
                lastAccessed: urlData.lastAccessed,
                createdAt: urlData.createdAt,
                clickRate: urlData.clickRate // Virtual field
            }
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createShortUrlAnon,
    createShortUrl,
    getUrlDetails,
    deleteUrl,
    getUserUrls,
    getClicksAnalytics,
    UpdateUrl
};
