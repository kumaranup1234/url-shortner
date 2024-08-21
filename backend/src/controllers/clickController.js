const Url = require("../models/Url");
const Click = require("../models/Click");

async function getAllClicks(req, res) {
    const shortUrlId = req.params.shortUrlId;

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

        // Get today's date and calculate the date 7 days ago
        const today = new Date();
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);

        // Aggregate clicks for the past 7 days
        const clicks = await Click.aggregate([
            {
                $match: {
                    url: urlDoc._id,
                    timestamp: { $gte: sevenDaysAgo }
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
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
            const dateString = date.toISOString().split('T')[0];
            dateCounts[dateString] = 0; // Default count is 0
        }

        // Fill the counts from the aggregation result
        clicks.forEach(click => {
            dateCounts[click._id] = click.count;
        });

        // Create an array of objects with dates and counts for the frontend
        const clicksByDate = Object.keys(dateCounts).map(date => ({
            date,
            count: dateCounts[date]
        }));

        return res.status(200).json({
            error: false,
            totalClicks,
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
        const clicks = await Click.find({ url: objectId });

        // Count the occurrences of each deviceType
        const deviceTypeCounts = clicks.reduce((acc, click) => {
            const deviceType = click.deviceType || 'Unknown'; // Default to 'Unknown' if deviceType is missing
            acc[deviceType] = (acc[deviceType] || 0) + 1;
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


async function getClicksByBrowser(req, res){
    const shortUrlId = req.params.shortUrlId;

    try {
        // Find the URL document to get the ObjectId
        const urlDoc = await Url.findOne({ shortUrl: shortUrlId }).select('_id');

        if (!urlDoc) {
            return res.status(404).json({
                error: true,
                message: 'URL not found',
            });
        }

        const objectId = urlDoc._id;
        const clicks = await Click.find({ url: objectId });


        // Count the occurrences of each deviceType
        const browserTypeCounts = clicks.reduce((acc, click) => {
            const deviceType = click.browser || 'Unknown'; // Default to 'Unknown' if browser is missing
            acc[deviceType] = (acc[deviceType] || 0) + 1;
            return acc;
        }, {});

        // Log the retrieved clicks to see the actual data
        // console.log("Retrieved clicks:", browsers);

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
        // Find the URL document to get the ObjectId
        const urlDoc = await Url.findOne({ shortUrl: shortUrlId }).select('_id');

        if (!urlDoc) {
            return res.status(404).json({
                error: true,
                message: 'URL not found',
            });
        }

        const objectId = urlDoc._id;
        const clicks = await Click.find({ url: objectId });

        // Aggregate the locations by country and city
        const locationCounts = clicks.reduce((acc, click) => {
            const country = click.location?.country || 'Unknown Country';
            const city = click.location?.city || 'Unknown City';

            const locationKey = `${country}, ${city}`;

            if (!acc[locationKey]) {
                acc[locationKey] = 0;
            }

            acc[locationKey]++;
            return acc;
        }, {});

        // Check if any clicks are found
        if (Object.keys(locationCounts).length === 0) {
            return res.status(404).json({
                error: true,
                message: 'No clicks found for the given URL',
            });
        }

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


async function getClicksByReferrer(req, res){
    const shortUrlId = req.params.shortUrlId;

    try {
        // Find the URL document to get the ObjectId
        const urlDoc = await Url.findOne({ shortUrl: shortUrlId }).select('_id');

        if (!urlDoc) {
            return res.status(404).json({
                error: true,
                message: 'URL not found',
            });
        }

        const objectId = urlDoc._id;
        const clicks = await Click.find({ url: objectId });

        // Count the occurrences of each deviceType
        const referrerCounts = clicks.reduce((acc, click) => {
            const deviceType = click.referrer || 'Unknown'; // Default to 'Unknown' if browser is missing
            acc[deviceType] = (acc[deviceType] || 0) + 1;
            return acc;
        }, {});

        // Log the retrieved clicks to see the actual data
        // console.log("Retrieved clicks:", referrerCounts);

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



module.exports = {
    getAllClicks,
    getClicksByDevice,
    getClicksByBrowser,
    getClicksByLocation,
    getClicksByReferrer
}