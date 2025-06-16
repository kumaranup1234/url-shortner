const cloudinary = require('../config/cloudinaryConfig');
const { Readable } = require('stream');

function bufferToStream(buffer) {
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    return stream;
}

const uploadToCloudinary = (buffer, folder, filename) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                public_id: `${Date.now()}_${filename}`
            },
            (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
            }
        );
        bufferToStream(buffer).pipe(stream);
    });
};

module.exports = { uploadToCloudinary };
