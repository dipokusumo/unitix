const QRCode = require("qrcode");
const { imageUpload } = require("./imageUtil");
const path = require("path");
const fs = require("fs");

/**
 * @param {string} text
 * @returns {Promise<string>}
 */

const generateQRCode = async (text) => {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(text);

    const tempFilePath = path.join(__dirname, "temp_qrcode.png");
    const base64Data = qrCodeDataUrl.split(",")[1];
    fs.writeFileSync(tempFilePath, base64Data, "base64");

    const file = { path: tempFilePath };
    const uploadResult = await imageUpload(file);

    return uploadResult.success ? uploadResult.data.url : null;
  } catch (error) {
    console.error("Error generating QR Code:", error);
    throw new Error("Failed to generate QR Code");
  }
};

module.exports = generateQRCode;
