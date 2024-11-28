const nodemailer = require('nodemailer');
const { unitixEmail, unitixPassword } = require('../config/env');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: unitixEmail,
        pass: unitixPassword
    }
});

/**
 * @param {string} to
 * @param {string} subject
 * @param {string} html
 * @returns {Promise<void>}
 */
const sendMail = async (to, subject, html) => {
    const mailOptions = {
        from: unitixEmail,
        to,
        subject,
        html
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email could not be sent');
    }
};

module.exports = sendMail;
