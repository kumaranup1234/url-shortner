const jwt = require('jsonwebtoken');
const User = require('../models/User');

const ApiKey = require('../models/ApiKey');

const authenticateUser = async (req, res, next) => {
    try {
        // Get the token from the cookies
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({
                error: true,
                message: 'Authentication required',
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({
                error: true,
                message: 'Invalid token',
            });
        }

        // Attach user information to the request
        req.user = user;
        next();
    } catch (error) {
        console.error('Authentication Error:', error);
        return res.status(401).json({
            error: true,
            message: 'Authentication failed',
        });
    }
};

const authenticateApiKey = async (req, res, next) => {
    try {
        const apiKey = req.header('x-api-key');
        if (!apiKey) {
            return res.status(401).json({ error: true, message: 'API key required' });
        }

        const keyRecord = await ApiKey.findOne({ key: apiKey }).populate('user');
        if (!keyRecord) {
            return res.status(401).json({ error: true, message: 'Invalid API key' });
        }

        if (keyRecord.expiresAt && keyRecord.expiresAt < new Date()) {
            return res.status(401).json({ error: true, message: 'API key expired' });
        }

        req.user = keyRecord.user;
        next();
    } catch (error) {
        console.error('API Key Auth Error:', error);
        res.status(500).json({ error: true, message: 'Server error' });
    }
};

module.exports = {
    authenticateUser,
    authenticateApiKey
}
