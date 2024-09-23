const QRCode = require('qrcode');
const baseUrl = "https://url-shortner-yi5l.onrender.com/"

async function generateQRCodeForUrl(shortUrl) {
    const url = baseUrl + shortUrl;
    try {
        // Generate QR code as a data URL (base64 string
        const qrCodeDataUrl = await QRCode.toDataURL(url);
        return qrCodeDataUrl;
    } catch (err) {
        console.error('Failed to generate QR Code', err);
        throw err;
    }
}

module.exports = {
    generateQRCodeForUrl
}