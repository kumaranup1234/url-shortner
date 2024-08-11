const shortid = require('shortid');
const Url = require("../models/Url");
const User = require("../models/User");

async function createShortUrl(req, res) {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: true, message: 'URL is required' });
    }
    const shortId = shortid.generate(); // Generate a short ID

    try {
        // Check if the URL already exists for the user
        const existingUrl = await Url.findOne({ originalUrl: url, user: req.user._id });
        if (existingUrl) {
            return res.status(200).json({
                success: true,
                message: 'URL already shortened',
                data: {
                    originalUrl: existingUrl.originalUrl,
                    shortUrl: existingUrl.shortUrl,
                }
            });
        }

        // Create a new shortened URL entry
        const newUrl = new Url({
            originalUrl: url,
            shortUrl: shortId,
            user: req.user._id,
        });

        // Save the URL to the database
        await newUrl.save();

        // Update the user's URLs array with the new URL ID
        await User.findByIdAndUpdate(
            req.user._id,
            { $push: { urls: newUrl._id } },
            { new: true } // Return the updated user document
        );

        // Respond with the shortened URL
        return res.status(201).json({
            success: true,
            message: 'URL shortened successfully',
            data: {
                originalUrl: newUrl.originalUrl,
                shortUrl: newUrl.shortUrl,
            }
        });
    } catch (error) {
        console.error('Error creating shortened URL:', error);
        return res.status(500).json({
            error: true,
            message: 'Internal server error',
        });
    }
}

module.exports = {
    createShortUrl
};
