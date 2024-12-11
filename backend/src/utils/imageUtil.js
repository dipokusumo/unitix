const fs = require("fs");
const initCloudinary = require("../config/cloudinary");

const imageUpload = async (reqFile) => {
  const cld = initCloudinary();

  try {
    const uploadResult = await cld.uploader.upload(reqFile.path);
    fs.unlinkSync(reqFile.path);

    return {
      success: true,
      message: "Image uploaded successfully",
      data: { url: uploadResult.secure_url },
    };
  } catch (error) {
    return {
      success: false,
      message: "Server error",
      error: error.message,
    };
  }
};

module.exports = { imageUpload };
