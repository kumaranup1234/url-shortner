const connectDB = require('../config/db');

const ensureDbConnection = async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error('Database connection failed in middleware:', error);
        res.status(500).json({ error: true, message: 'Database connection failed' });
    }
};

module.exports = ensureDbConnection;
