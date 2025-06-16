const Url = require("../models/Url");
const User = require("../models/User");
const OneLink = require("../models/OneLink");
const {generate} = require("shortid");
const {generateQRCodeForUrl} = require("../utils/generateQrCode");
const {extractData} = require("../utils/extractMetaData");
const {uploadToCloudinary} = require("../utils/cloudinaryUploader");


const createOneLink = async (req, res) => {

    const userId = req.user._id;
    const { username, name, bio, templateId, links} = req.body;

    try {
        const user = await User.findById(userId);
        if (user.oneLinkPage) {
            return res.status(400).json({ error: true, message: 'User already has a OneLink page.' });
        }

        const existingOneLink = await OneLink.findOne({ username });
        if (existingOneLink) {
            return res.status(400).json({ error: true, message: 'Username is already taken.' });
        }

        if (!username || !name || !bio || !templateId) {
            return res.status(400).json({
                error: true,
                message: 'Username, name, bio, and templateId are required.'
            });
        }

        let profilePhotoUrl = '';
        if (req.files && req.files.profilePhoto && req.files.profilePhoto[0]) {
            const file = req.files.profilePhoto[0];
            profilePhotoUrl = await uploadToCloudinary(file.buffer, 'one-link/profile-photo', file.originalname);
        }

        const processedLinks = [];
        const newLinks = JSON.parse(links);
        if (newLinks && Array.isArray(newLinks)) {
            for(let i = 0; i < newLinks.length; i++) {
                const link = newLinks[i];

                if (!link.url || !link.label){
                    continue;
                }

                // Validate URL format
                if (!/^https?:\/\/.+$/.test(link.url)) {
                    return res.status(400).json({
                        error: true,
                        message: `Invalid URL provided for link ${i + 1}: ${link.url}`
                    });
                }

                const shortId = generate();
                const qrCode = await generateQRCodeForUrl(link.url, shortId);
                const { title, logo} = await extractData(link.url);
                console.log(title, logo);

                const urlData = {
                    originalUrl: link.url,
                    shortUrl: shortId,
                    user: userId,
                    qrCode: qrCode,
                    isOneLink: true,
                };

                if (title && title !== 'No title found') {
                    urlData.title = title;
                }

                if (logo && logo !== 'No logo found') {
                    urlData.logo = logo;
                }

                const newUrl = new Url(urlData);
                await newUrl.save();

                processedLinks.push({
                    label: link.label,
                    url: link.url,
                    shortUrl: shortId,
                    urlId: newUrl._id,
                    order: i
                });
            }
        }


        let processedImages = [];
        if (req.files && req.files.images) {
            for (const image of req.files.images) {
                const url = await uploadToCloudinary(image.buffer, 'one-link/images', image.originalname);
                processedImages.push(url);
            }
        }

        const oneLink = new OneLink({
            username,
            name,
            profilePhotoUrl,
            bio,
            templateId: parseInt(templateId),
            user: userId,
            links: processedLinks,
            images: processedImages,
        });


        await oneLink.save();

        // Update user document
        user.oneLinkPage = oneLink._id;
        await user.save();

        return res.status(201).json({
            success: true,
            message: 'OneLink page created successfully.',
            data: oneLink,
        });
    } catch (error) {
        console.error('Error creating OneLink page:', error);
        return res.status(500).json({ error: true, message: 'Internal server error.' });
    }
};


const deleteOneLink = async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if (!user.oneLinkPage) {
            return res.status(400).json({ error: true, message: 'No OneLink page to delete.' });
        }

        const oneLinkID = user.oneLinkPage;

        user.oneLinkPage = null;
        await user.save();

        await OneLink.findByIdAndDelete(oneLinkID);

        return res.status(200).json({
            success: true,
            message: 'OneLink page deleted successfully.',
        });
    } catch (error) {
        console.error('Error deleting OneLink page:', error);
        return res.status(500).json({ error: true, message: 'Internal server error.' });
    }
};

const updateOneLink = async (req, res) => {
    const userId = req.user._id;
    const { name, bio, links } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user.oneLinkPage) {
            return res.status(404).json({ error: true, message: 'OneLink page not found.' });
        }

        const oneLink = await OneLink.findById(user.oneLinkPage);
        if (!oneLink) {
            return res.status(404).json({ error: true, message: 'OneLink page not found.' });
        }

        // Update profile photo if new one is uploaded
        if (req.files && req.files.profilePhoto && req.files.profilePhoto[0]) {
            const file = req.files.profilePhoto[0];
            const profilePhotoUrl = await uploadToCloudinary(file.buffer, 'one-link/profile-photo', file.originalname);
            oneLink.profilePhotoUrl = profilePhotoUrl;
        }

        // Process updated links
        if (links) {
            // Delete old URL documents for links that are being removed
            const oldUrlIds = oneLink.links.map(link => link.urlId).filter(id => id);
            await Url.deleteMany({ _id: { $in: oldUrlIds }, isOneLink: true });

            // Process new links
            const processedLinks = [];
            const newLinks = JSON.parse(links);
            if (newLinks && Array.isArray(newLinks)) {
                for (let i = 0; i < newLinks.length; i++) {
                    const link = newLinks[i];

                    if (!link.url || !link.label) {
                        continue;
                    }

                    // Validate URL format
                    if (!/^https?:\/\/.+$/.test(link.url)) {
                        return res.status(400).json({
                            error: true,
                            message: `Invalid URL provided for link ${i + 1}: ${link.url}`
                        });
                    }

                    const shortId = generate();
                    const qrCode = await generateQRCodeForUrl(link.url, shortId);
                    const { title, logo } = await extractData(link.url);
                    console.log(title, logo);

                    const urlData = {
                        originalUrl: link.url,
                        shortUrl: shortId,
                        user: userId,
                        qrCode: qrCode,
                        isOneLink: true,
                    };

                    if (title && title !== 'No title found') {
                        urlData.title = title;
                    }

                    if (logo && logo !== 'No logo found') {
                        urlData.logo = logo;
                    }

                    const newUrl = new Url(urlData);
                    await newUrl.save();

                    processedLinks.push({
                        label: link.label,
                        url: link.url,
                        shortUrl: shortId,
                        urlId: newUrl._id,
                        order: i
                    });
                }
            }

            oneLink.links = processedLinks;
        }

        // Update images if new ones are uploaded
        if (req.files && req.files.images && req.files.images.length > 0) {
            let processedImages = [];
            for (const image of req.files.images) {
                const url = await uploadToCloudinary(image.buffer, 'one-link/images', image.originalname);
                processedImages.push(url);
            }
            oneLink.images = processedImages;
        }

        // Update basic fields
        if (name) oneLink.name = name;
        if (bio) oneLink.bio = bio;

        await oneLink.save();

        return res.status(200).json({
            success: true,
            message: 'OneLink page updated successfully.',
            data: oneLink,
        });
    } catch (error) {
        console.error('Error updating OneLink page:', error);
        return res.status(500).json({ error: true, message: 'Internal server error.' });
    }
};

const getOneLink = async (req, res) => {
    const { username } = req.params;
    try {
        const oneLink = await OneLink.findOneAndUpdate(
            { username },
            { $inc: { pageViews: 1 } },
            { new: true }
        ).populate('links');

        if (!oneLink) {
            return res.status(404).json({ error: true, message: 'OneLink page not found.' });
        }
        oneLink.pageView = oneLink.pageView++;

        return res.status(200).json({ success: true, data: oneLink });
    } catch (error) {
        console.error('Error fetching OneLink page:', error);
        return res.status(500).json({ error: true, message: 'Internal server error.' });
    }
};

const trackPageView = async (req, res) => {
    const { username } = req.params;

    try {
        const oneLink = await OneLink.findOneAndUpdate(
            { username },
            { $inc: { pageViews: 1 } },
            { new: true }
        );

        if (!oneLink) {
            return res.status(404).json({ error: true, message: 'OneLink page not found.' });
        }

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error tracking page view:', error);
        return res.status(500).json({ error: true, message: 'Internal server error.' });
    }
};


const checkUserName = async (req, res) => {
    const { username } = req.body;

    try {
        const check = await OneLink.findOne({ username});
        if (check) {
            return res.status(400).json({ error: true, message: 'Username is already taken.' });
        }

        return res.status(200).json({ success: true, message: 'Username is available' });

    } catch (error){
        console.error('Error tracking page view:', error);
        return res.status(500).json({ error: true, message: 'Internal server error.' });
    }
}

const getMyPage = async (req, res) => {
    try {
        const oneLink = await OneLink.findOne({ user: req.user._id }).populate('links.urlId');
        if (!oneLink) {
            return res.status(404).json({ error: true, message: 'No OneLink page found.' });
        }
        res.status(200).json({ success: true, data: oneLink });
    } catch (error) {
        console.error('Error fetching OneLink:', error);
        res.status(500).json({ error: true, message: 'Server error' });
    }
}

module.exports = {
    getOneLink,
    trackPageView,
    updateOneLink,
    createOneLink,
    deleteOneLink,
    checkUserName,
    getMyPage
}


