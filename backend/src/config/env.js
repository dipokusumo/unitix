require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    mongodbUri: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    unitixEmail: process.env.EMAIL_USER,
    unitixPassword: process.env.EMAIL_PASS,
    midtransServerKey: process.env.MIDTRANS_SERVER,
    midtransClientKey: process.env.MIDTRANS_CLIENT
};