const QRCode = require('qrcode');

async function generateQRCodeForUrl(shortUrl) {
    try {
        // Generate QR code as a data URL (base64 string)
        const qrCodeDataUrl = await QRCode.toDataURL(shortUrl);
        return qrCodeDataUrl;
    } catch (err) {
        console.error('Failed to generate QR Code', err);
        throw err;
    }
}

module.exports = {
    generateQRCodeForUrl
}