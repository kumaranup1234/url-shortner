const Url = require("../models/Url");
const Click = require("../models/Click");
const { getName } = require('country-list');
const User = require("../models/User");

async function getAllClicks(req, res) {
    const shortUrlId = req.params.shortUrlId;
    console.log("getAllClicks")

    try {
        // Find the URL document to get the ObjectId
        const urlDoc = await Url.findOne({ shortUrl: shortUrlId }).select('_id totalClicks');

        if (!urlDoc) {
            return res.status(404).json({
                error: true,
                message: 'URL not found',
            });
        }

        const totalClicks = urlDoc.totalClicks;
        let maxClick = 0;
        let maxClicksDate = 0;

        // Get today's date and calculate the date 10 days ago
        const today = new Date();
        const tenDaysAgo = new Date(today);
        tenDaysAgo.setDate(today.getDate() - 9);

        // Aggregate clicks for the past 7 days
        const clicks = await Click.aggregate([
            {
                $match: {
                    url: urlDoc._id,
                    timestamp: { $gte: tenDaysAgo }
                }
            },
            {
                $project: {
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } }
                }
            },
            {
                $group: {
                    _id: "$date",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        // Prepare data for the last 7 days
        const dateCounts = {};
        for (let i = 9; i >= 0; i--) {
            const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
            const dateString = date.toISOString().split('T')[0];
            dateCounts[dateString] = 0; // Default count is 0
        }

        // Fill the counts from the aggregation result
        clicks.forEach(click => {
            dateCounts[click._id] = click.count;
        });

        // Create an array of objects with dates and counts for the frontend
        const clicksByDate = Object.keys(dateCounts).map((date) => {
            const totalClicks = dateCounts[date];
            if (totalClicks > maxClick) {
                maxClick = totalClicks;
                maxClicksDate = date;
            }

            return {
                date,
                count: totalClicks
            }
        });

        return res.status(200).json({
            error: false,
            totalClicks,
            maxClick,
            maxClicksDate,
            clicksByDate
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            message: 'Internal server error',
        });
    }
}

// get All clicks for a user in a span of 10 days
async function getUserClicks(req, res) {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                error: true,
                message: 'User not found',
            })
        }
        const urlArray = user.urls;

        const totalClicks = await Click.countDocuments({ url: { $in: urlArray } });
        let maxClick = 0;
        let maxClicksDate = 0;

        // Get today's date and calculate the date 10 days ago
        const today = new Date();
        const tenDaysAgo = new Date(today);
        tenDaysAgo.setDate(today.getDate() - 9);

        // Aggregate clicks for the past 7 days
        const clicks = await Click.aggregate([
            {
                $match: {
                    timestamp: { $gte: tenDaysAgo },
                    url: { $in: urlArray },
                }
            },
            {
                $project: {
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } }
                }
            },
            {
                $group: {
                    _id: "$date",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        // Prepare data for the last 7 days
        const dateCounts = {};
        for (let i = 9; i >= 0; i--) {
            const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
            const dateString = date.toISOString().split('T')[0];
            dateCounts[dateString] = 0; // Default count is 0
        }

        // Fill the counts from the aggregation result
        clicks.forEach(click => {
            dateCounts[click._id] = click.count;
        });

        // Create an array of objects with dates and counts for the frontend
        const clicksByDate = Object.keys(dateCounts).map((date) => {
            const totalClicks = dateCounts[date];
            if (totalClicks > maxClick) {
                maxClick = totalClicks;
                maxClicksDate = date;
            }

            return {
                date,
                count: totalClicks
            }
        });

        return res.status(200).json({
            error: false,
            totalClicks,
            maxClick,
            maxClicksDate,
            clicksByDate
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error: true,
            message: 'Internal server error',
        });
    }
}

async function getClicksByDevice(req, res) {
    const shortUrlId = req.params.shortUrlId;

    try {
        const urlDoc = await Url.findOne({ shortUrl: shortUrlId }).select('_id');
        if (!urlDoc) {
            return res.status(404).json({
                error: true,
                message: 'URL not found',
            });
        }

        const objectId = urlDoc._id;

        // Optimized: Use Aggregation instead of Find + Reduce
        const deviceStats = await Click.aggregate([
            { $match: { url: objectId } },
            { $group: { _id: "$deviceType", count: { $sum: 1 } } }
        ]);

        const deviceTypeCounts = deviceStats.reduce((acc, curr) => {
            acc[curr._id || 'Unknown'] = curr.count;
            return acc;
        }, {});

        return res.status(200).json({
            error: false,
            deviceTypeCounts
        });
    } catch (error) {
        console.log("Error fetching the clicks:", error);
        return res.status(500).json({
            error: true,
            message: 'Internal server error',
        });
    }
}

async function getUserDeviceClicks(req, res) {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                error: true,
                message: 'User not found',
            });
        }

        const urlArray = user.urls;

        // Check if user has any URLs
        if (urlArray.length === 0) {
            return res.status(200).json({
                error: false,
                deviceTypeCounts: {}, // No URLs, so return empty result
            });
        }

        // Optimized: Use Aggregation
        const deviceStats = await Click.aggregate([
            { $match: { url: { $in: urlArray } } },
            { $group: { _id: "$deviceType", count: { $sum: 1 } } }
        ]);

        const deviceTypeCounts = deviceStats.reduce((acc, curr) => {
            acc[curr._id || 'Unknown'] = curr.count;
            return acc;
        }, {});

        return res.status(200).json({
            error: false,
            deviceTypeCounts
        });
    } catch (error) {
        console.log("Error fetching the clicks:", error);
        return res.status(500).json({
            error: true,
            message: 'Internal server error',
            details: error.message
        });
    }
}


async function getClicksByBrowser(req, res) {
    const shortUrlId = req.params.shortUrlId;

    try {
        const urlDoc = await Url.findOne({ shortUrl: shortUrlId }).select('_id');
        if (!urlDoc) {
            return res.status(404).json({
                error: true,
                message: 'URL not found',
            });
        }

        const objectId = urlDoc._id;

        // Optimized: Aggregation
        const browserStats = await Click.aggregate([
            { $match: { url: objectId } },
            { $group: { _id: "$browser", count: { $sum: 1 } } }
        ]);

        const browserTypeCounts = browserStats.reduce((acc, curr) => {
            acc[curr._id || 'Unknown'] = curr.count;
            return acc;
        }, {});

        return res.status(200).json({
            error: false,
            browserTypeCounts
        });
    } catch (error) {
        console.log("Error fetching the clicks:", error);
        return res.status(500).json({
            error: true,
            message: 'Internal server error',
        });
    }
}

async function getUserClicksByBrowser(req, res) {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                error: true,
                message: 'User not found',
            });
        }

        const urlArray = user.urls;
        if (urlArray.length === 0) {
            return res.status(200).json({
                error: false,
                browserTypeCounts: {},
            });
        }

        // Optimized: Aggregation
        const browserStats = await Click.aggregate([
            { $match: { url: { $in: urlArray } } },
            { $group: { _id: "$browser", count: { $sum: 1 } } }
        ]);

        const browserTypeCounts = browserStats.reduce((acc, curr) => {
            acc[curr._id || 'Unknown'] = curr.count;
            return acc;
        }, {});

        return res.status(200).json({
            error: false,
            browserTypeCounts
        });
    } catch (error) {
        console.log("Error fetching the clicks:", error);
        return res.status(500).json({
            error: true,
            message: 'Internal server error',
        });
    }
}


async function getClicksByLocation(req, res) {
    const shortUrlId = req.params.shortUrlId;

    try {
        const urlDoc = await Url.findOne({ shortUrl: shortUrlId }).select('_id');
        if (!urlDoc) {
            return res.status(404).json({
                error: true,
                message: 'URL not found',
            });
        }

        const objectId = urlDoc._id;

        // Optimized: Aggregation
        const locationStats = await Click.aggregate([
            { $match: { url: objectId } },
            {
                $group: {
                    _id: {
                        country: "$location.country",
                        city: "$location.city"
                    },
                    count: { $sum: 1 }
                }
            }
        ]);

        const locationCounts = locationStats.reduce((acc, curr) => {
            const country = getName(curr._id.country) || curr._id.country || 'Unknown Country';
            const city = curr._id.city || 'Unknown City';
            const locationKey = `${country}, ${city}`;
            acc[locationKey] = curr.count;
            return acc;
        }, {});

        return res.status(200).json({
            error: false,
            locationCounts
        });
    } catch (error) {
        console.log("Error fetching the clicks:", error);
        return res.status(500).json({
            error: true,
            message: 'Internal server error',
        });
    }
}

async function getClicksByCountry(req, res) {
    const shortUrlId = req.params.shortUrlId;

    try {
        const urlDoc = await Url.findOne({ shortUrl: shortUrlId }).select('_id');
        if (!urlDoc) {
            return res.status(404).json({
                error: true,
                message: 'URL not found',
            });
        }

        const objectId = urlDoc._id;

        // Optimized: Aggregation
        const countryStats = await Click.aggregate([
            { $match: { url: objectId } },
            { $group: { _id: "$location.country", count: { $sum: 1 } } }
        ]);

        const countryCounts = countryStats.reduce((acc, curr) => {
            const country = curr._id || 'Unknown Country';
            acc[country] = curr.count;
            return acc;
        }, {});

        return res.status(200).json({
            error: false,
            countryCounts
        });
    } catch (error) {
        console.log("Error fetching the clicks:", error);
        return res.status(500).json({
            error: true,
            message: 'Internal server error',
        });
    }
}

async function getUserClicksByCountry(req, res) {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                error: true,
                message: 'User not found',
            });
        }

        const urlArray = user.urls;
        if (urlArray.length === 0) {
            return res.status(200).json({
                error: false,
                countryCounts: {},
            });
        }

        // Optimized: Aggregation
        const countryStats = await Click.aggregate([
            { $match: { url: { $in: urlArray } } },
            { $group: { _id: "$location.country", count: { $sum: 1 } } }
        ]);

        const countryCounts = countryStats.reduce((acc, curr) => {
            const country = curr._id || 'Unknown Country';
            acc[country] = curr.count;
            return acc;
        }, {});

        return res.status(200).json({
            error: false,
            countryCounts
        });
    } catch (error) {
        console.log("Error fetching the clicks:", error);
        return res.status(500).json({
            error: true,
            message: 'Internal server error',
        });
    }
}

async function getUserClicksByLocation(req, res) {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                error: true,
                message: 'User not found',
            });
        }

        const urlArray = user.urls;
        if (urlArray.length === 0) {
            return res.status(200).json({
                error: false,
                locationCounts: {},
            });
        }

        // Optimized: Aggregation
        const locationStats = await Click.aggregate([
            { $match: { url: { $in: urlArray } } },
            {
                $group: {
                    _id: {
                        country: "$location.country",
                        city: "$location.city"
                    },
                    count: { $sum: 1 }
                }
            }
        ]);

        const locationCounts = locationStats.reduce((acc, curr) => {
            const country = getName(curr._id.country) || curr._id.country || 'Unknown Country';
            const city = curr._id.city || 'Unknown City';
            const locationKey = `${country}, ${city}`;
            acc[locationKey] = curr.count;
            return acc;
        }, {});

        return res.status(200).json({
            error: false,
            locationCounts
        });
    } catch (error) {
        console.log("Error fetching the clicks:", error);
        return res.status(500).json({
            error: true,
            message: 'Internal server error',
        });
    }
}




async function getClicksByReferrer(req, res) {
    const shortUrlId = req.params.shortUrlId;

    try {
        const urlDoc = await Url.findOne({ shortUrl: shortUrlId }).select('_id');
        if (!urlDoc) {
            return res.status(404).json({
                error: true,
                message: 'URL not found',
            });
        }

        const objectId = urlDoc._id;

        // Optimized: Aggregation
        const referrerStats = await Click.aggregate([
            { $match: { url: objectId } },
            { $group: { _id: "$referrer", count: { $sum: 1 } } }
        ]);

        const referrerCounts = referrerStats.reduce((acc, curr) => {
            acc[curr._id || 'Unknown'] = curr.count;
            return acc;
        }, {});

        return res.status(200).json({
            error: false,
            referrerCounts
        });
    } catch (error) {
        console.log("Error fetching the clicks:", error);
        return res.status(500).json({
            error: true,
            message: 'Internal server error',
        });
    }
}

async function getUserClicksByReferrer(req, res) {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                error: true,
                message: 'User not found',
            });
        }

        const urlArray = user.urls;
        if (urlArray.length === 0) {
            return res.status(200).json({
                error: false,
                referrerCounts: {},
            });
        }

        // Optimized: Aggregation
        const referrerStats = await Click.aggregate([
            { $match: { url: { $in: urlArray } } },
            { $group: { _id: "$referrer", count: { $sum: 1 } } }
        ]);

        const referrerCounts = referrerStats.reduce((acc, curr) => {
            acc[curr._id || 'Unknown'] = curr.count;
            return acc;
        }, {});

        return res.status(200).json({
            error: false,
            referrerCounts
        });
    } catch (error) {
        console.log("Error fetching the clicks:", error);
        return res.status(500).json({
            error: true,
            message: 'Internal server error',
        });
    }
}

async function getClicksByOs(req, res) {
    const shortUrlId = req.params.shortUrlId;

    try {
        const urlDoc = await Url.findOne({ shortUrl: shortUrlId }).select('_id');
        if (!urlDoc) {
            return res.status(404).json({
                error: true,
                message: 'URL not found',
            });
        }

        const objectId = urlDoc._id;

        // Optimized: Aggregation
        const osStats = await Click.aggregate([
            { $match: { url: objectId } },
            { $group: { _id: "$os", count: { $sum: 1 } } }
        ]);

        const osCounts = osStats.reduce((acc, curr) => {
            acc[curr._id || 'Unknown'] = curr.count;
            return acc;
        }, {});

        return res.status(200).json({
            error: false,
            osCounts
        });
    } catch (error) {
        console.log("Error fetching the clicks:", error);
        return res.status(500).json({
            error: true,
            message: 'Internal server error',
        });
    }
}

async function getUserClicksByOs(req, res) {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                error: true,
                message: 'User not found',
            });
        }

        const urlArray = user.urls;
        if (urlArray.length === 0) {
            return res.status(200).json({
                error: false,
                osCounts: {},
            });
        }

        // Optimized: Aggregation
        const osStats = await Click.aggregate([
            { $match: { url: { $in: urlArray } } },
            { $group: { _id: "$os", count: { $sum: 1 } } }
        ]);

        const osCounts = osStats.reduce((acc, curr) => {
            acc[curr._id || 'Unknown'] = curr.count;
            return acc;
        }, {});

        return res.status(200).json({
            error: false,
            osCounts
        });
    } catch (error) {
        console.log("Error fetching the clicks:", error);
        return res.status(500).json({
            error: true,
            message: 'Internal server error',
        });
    }
}






module.exports = {
    getAllClicks,
    getClicksByDevice,
    getClicksByBrowser,
    getClicksByLocation,
    getClicksByReferrer,
    getClicksByOs,
    getUserClicks,
    getUserDeviceClicks,
    getUserClicksByOs,
    getUserClicksByReferrer,
    getUserClicksByLocation,
    getUserClicksByBrowser,
    getClicksByCountry,
    getUserClicksByCountry
}