const mongoose = require("mongoose");

const ClickSchema = new mongoose.Schema({
    url: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Url",
        required: true,
        index: true // Index for fast lookup by URL
    },
    timestamp: {
        type: Date,
        default: Date.now,
        index: true // Index for date range filtering
    },
    ipAddress: {
        type: String,
    },
    userAgent: {
        type: String,
    },
    deviceType: {
        type: String, // 'mobile', 'desktop', 'tablet', etc.
        index: true // Index for device analytics
    },
    browser: {
        type: String, // E.g., 'Chrome', 'Firefox'
        index: true // Index for browser analytics
    },
    os: {
        type: String, // Operating system, e.g., 'Windows', 'iOS'
        index: true // Index for OS analytics
    },
    location: {
        country: { type: String },
        city: { type: String },
        lat: { type: Number },
        lng: { type: Number },
    },
    referrer: {
        type: String,
        index: true // Index for referrer analytics
    },
});

// Compound indexes for common queries
ClickSchema.index({ url: 1, timestamp: -1 }); // Optimize "last 7 days" queries
ClickSchema.index({ url: 1, deviceType: 1 });
ClickSchema.index({ url: 1, browser: 1 });
ClickSchema.index({ url: 1, os: 1 });
ClickSchema.index({ url: 1, "location.country": 1 });

const Click = mongoose.model("Click", ClickSchema);

module.exports = Click;
