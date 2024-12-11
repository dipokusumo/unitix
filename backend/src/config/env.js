require("dotenv").config();

module.exports = {
  port: process.env.PORT,
  mongodbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  unitixEmail: process.env.EMAIL_USER,
  unitixPassword: process.env.EMAIL_PASS,
  cldCloudName: process.env.CLOUDINARY_CLOUD_NAME,
  cldApiKey: process.env.CLOUDINARY_API_KEY,
  cldApiSecret: process.env.CLOUDINARY_API_SECRET,
  midtransServerKey: process.env.MIDTRANS_SERVER,
  midtransClientKey: process.env.MIDTRANS_CLIENT,
};
