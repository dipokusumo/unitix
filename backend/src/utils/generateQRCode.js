const QRCode = require('qrcode');

/**
 * Generate QR Code dari string
 * @param {string} text 
 * @returns {Promise<string>}
 */
const generateQRCode = async (text) => {
    try {
        return await QRCode.toDataURL(text);
    } catch (error) {
        console.error('Error generating QR Code:', error);
        throw new Error('Failed to generate QR Code');
    }
};

module.exports = generateQRCode;
