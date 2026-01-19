const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
        trim: true,
        match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
        maxlength: 2048,
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true, // Add index for faster lookups
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true, // Add index for sorting
    },
    title: {
        type: String,
        required: true,
        maxlength: 200,
    },
    logo: {
        type: String,
        maxlength: 20000,
    },
    qrCode: {
        type: String,
        maxlength: 20000,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true, // Add index for user queries
    },
    totalClicks: {
        type: Number,
        default: 0,
        min: 0,
    },
    lastAccessed: {
        type: Date,
        default: null,
        index: true, // Add index for analytics
    },
    isOneLink: {
        type: Boolean,
        default: false,
        index: true,
    },
    isActive: {
        type: Boolean,
        default: true,
        index: true,
    },
    expiresAt: {
        type: Date,
        default: null,
        index: true,
    },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Compound indexes for better query performance
UrlSchema.index({ user: 1, createdAt: -1 });
UrlSchema.index({ user: 1, isActive: 1 });
UrlSchema.index({ shortUrl: 1, isActive: 1 });

// Virtual for click rate
UrlSchema.virtual('clickRate').get(function () {
    const daysSinceCreation = Math.max(1, Math.ceil((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24)));
    return this.totalClicks / daysSinceCreation;
});

// Optimized increment method
UrlSchema.methods.incrementClick = async function () {
    await mongoose.model('Url').updateOne(
        { _id: this._id },
        {
            $inc: { totalClicks: 1 },
            $set: { lastAccessed: new Date() }
        }
    );
};

// Static method for efficient user URL fetching
UrlSchema.statics.getUserUrls = async function (userId, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const query = {
        user: userId,
        $or: [{ isActive: true }, { isActive: { $exists: false } }],
        isOneLink: { $ne: true }
    };
    console.log(`Debug: fetching URLs for user ${userId} with query:`, JSON.stringify(query));
    const results = await this.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select('-__v')
        .lean();
    console.log(`Debug: Found ${results.length} URLs`);
    return results;
};

const Url = mongoose.model("Url", UrlSchema);

module.exports = Url;
