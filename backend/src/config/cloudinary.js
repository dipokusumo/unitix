const { cldCloudName, cldApiKey, cldApiSecret } = require("./env");

const cloudinary = require("cloudinary").v2;

const initCloudinary = () => {
  cloudinary.config({
    cloud_name: cldCloudName,
    api_key: cldApiKey,
    api_secret: cldApiSecret,
  });

  return cloudinary;
};

module.exports = initCloudinary;
