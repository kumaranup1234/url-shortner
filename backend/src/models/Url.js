import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
        trim: true,
        match: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, // Ensures valid URL format
    },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    qrCode: {
        type: String, // Store base64 or URL to the image
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    totalClicks: {
        type: Number,
        default: 0,
    },
    lastAccessed: {
        type: Date,
        default: null, // To track the last time the URL was accessed
    },
});

UrlSchema.methods.incrementClick = async function () {
    this.totalClicks += 1;
    this.lastAccessed = new Date();
    await this.save();
};

const Url = mongoose.model("Url", UrlSchema);

export default Url;
