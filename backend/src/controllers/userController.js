const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ResponseAPI = require('../utils/response');
const sendMail = require('../utils/mailer');
const crypto = require('crypto');
const { jwtSecret, jwtExpiresIn } = require('../config/env');

const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, { expiresIn: jwtExpiresIn });
};

const userController = {
    async register(req, res) {
        try {
            const { name, email, password, confirmPassword } = req.body;

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return ResponseAPI.error(res, 'Email already exists', 409);
            }

            if (password !== confirmPassword) {
                return ResponseAPI.error(res, 'Passwords do not match', 400);
            }

            const user = await User.create({ name, email, password });

            ResponseAPI.success(res, {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    photo_url: user.photo_url
                }
            }, 'Registration successful', 201);
        } catch (error) {
            ResponseAPI.serverError(res, error);
        }
    },

    async forgotPassword(req, res) {
        try {
            const { email } = req.body;
    
            const user = await User.findOne({ email });
            if (!user) {
                return ResponseAPI.error(res, 'Email not found', 404);
            }
    
            const newPassword = crypto.randomBytes(4).toString('hex');
    
            user.password = newPassword;
            await user.save();
    
            const emailContent = `
                <h3>Password Reset</h3>
                <p>Your password has been reset. Here is your new password:</p>
                <p><strong>${newPassword}</strong></p>
                <p>Please log in and change your password immediately.</p>
            `;
    
            await sendMail(user.email, 'Password Reset Successful', emailContent);
    
            ResponseAPI.success(res, null, 'New password has been sent to your email');
        } catch (error) {
            ResponseAPI.serverError(res, error);
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                return ResponseAPI.error(res, 'Invalid email or password', 401);
            }

            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                return ResponseAPI.error(res, 'Invalid email or password', 401);
            }

            const token = generateToken(user._id);

            ResponseAPI.success(res, {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    photo_url: user.photo_url
                }
            });
        } catch (error) {
            ResponseAPI.serverError(res, error);
        }
    }
};

module.exports = userController;