const mongoose = require("mongoose");

const OneLinkSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true }, // Added name field
    profilePhotoUrl: { type: String },
    bio: { type: String, required: true }, // Made bio required
    templateId: { type: Number, required: true }, // Template ID to identify which template is used
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to user who owns this OneLink

    // Links array - structured for template-based approach
    links: [{
        label: { type: String, required: true },
        url: { type: String, required: true },
        shortUrl: { type: String }, // Generated short URL
        urlId: { type: mongoose.Schema.Types.ObjectId, ref: 'Url' }, // Reference to Url model
        order: { type: Number, default: 0 }
    }],

    // Images array - for additional template images
    images: [{ type: String }], // Array of image URLs

    // Optional: Keep theme for future customization
    theme: { type: String, default: '1' },

    pageViews: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

const OneLink = mongoose.model('OneLink', OneLinkSchema);

module.exports = OneLink;