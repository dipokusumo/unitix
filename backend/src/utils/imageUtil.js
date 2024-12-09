const fs = require('fs');
const initCloudinary = require('../config/cloudinary');
const ResponseAPI = require('./response');

const imageUpload = async (reqFile, res) => {
    const cld = initCloudinary();

    try {
        const uploadResult = await cld.uploader.upload(reqFile.path);

        fs.unlinkSync(reqFile.path);

        return ResponseAPI.success(res, { url: uploadResult.secure_url }, 'Image uploaded successfully');
    } catch (error) {
        return ResponseAPI.serverError(res, error);
    }
};

module.exports = {
    imageUpload
};