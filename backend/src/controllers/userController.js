const jwt = require('jsonwebtoken');
const DB = require('../models');
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

            const existingUser = await DB.User.findOne({ email });
            if (existingUser) {
                return ResponseAPI.conflict(res, 'Email already exists');
            }

            if (password !== confirmPassword) {
                return ResponseAPI.badRequest(res, 'Passwords do not match');
            }

            const user = await DB.User.create({ name, email, password });

            return ResponseAPI.created(res, {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    photo_url: user.photo_url
                }
            }, 'Registration successful');
        } catch (error) {
            return ResponseAPI.serverError(res, error);
        }
    },

    async forgotPassword(req, res) {
        try {
            const { email } = req.body;
    
            const user = await DB.User.findOne({ email });
            if (!user) {
                return ResponseAPI.notFound(res, 'Email not found');
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
    
            return ResponseAPI.success(res, null, 'New password has been sent to your email');
        } catch (error) {
            return ResponseAPI.serverError(res, error);
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await DB.User.findOne({ email });
            if (!user) {
                return ResponseAPI.error(res, 'Invalid email or password', 401);
            }

            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                return ResponseAPI.error(res, 'Invalid email or password', 401);
            }

            const token = generateToken(user._id);

            return ResponseAPI.success(res, {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    photo_url: user.photo_url
                }
            }, 'Login successful');
        } catch (error) {
            return ResponseAPI.serverError(res, error);
        }
    },

    async editProfile(req, res) {
        try {
            const { name, photoUrl } = req.body;
            const userId = req.user.id;

            const user = await DB.User.findById(userId);
            if (!user) {
                return ResponseAPI.notFound(res, 'User not found');
            }

            if (name) user.name = name;
            if (photoUrl) user.photo_url = photoUrl;

            await user.save();

            return ResponseAPI.success(res, {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    photo_url: user.photo_url
                }
            }, 'Profile updated successfully');
        } catch (error) {
            return ResponseAPI.serverError(res, error);
        }
    },

    async changePassword(req, res) {
        try {
            const { oldPassword, newPassword, confirmNewPassword } = req.body;
            const userId = req.user.id;

            const user = await DB.User.findById(userId);
            if (!user) {
                return ResponseAPI.notFound(res, 'User not found');
            }

            const isOldPasswordValid = await user.comparePassword(oldPassword);
            if (!isOldPasswordValid) {
                return ResponseAPI.error(res, 'Old password is incorrect', 401);
            }

            if (newPassword !== confirmNewPassword) {
                return ResponseAPI.badRequest(res, 'New passwords do not match');
            }

            user.password = newPassword;
            await user.save();

            return ResponseAPI.success(res, null, 'Password changed successfully');
        } catch (error) {
            return ResponseAPI.serverError(res, error);
        }
    },

    async getAllUsers(req, res) {
        try {
          const users = await DB.User.aggregate([
            {
              $lookup: {
                from: 'transactions',
                localField: '_id',
                foreignField: 'customerId',
                as: 'transactions'
              }
            },
            {
              $unwind: {
                path: '$transactions',
                preserveNullAndEmptyArrays: true
              }
            },
            {
              $match: {
                'transactions.paymentStatus': 'completed'
              }
            },
            {
              $group: {
                _id: '$_id',
                name: { $first: '$name' },
                email: { $first: '$email' },
                transactionCount: { $sum: 1 }
              }
            },
            {
              $project: {
                _id: 1,
                name: 1,
                email: 1,
                transactionCount: 1
              }
            }
          ]);
      
          return ResponseAPI.success(res, users, 'Users with completed transactions');
        } catch (error) {
          console.error('Error getting users with completed transactions:', error);
          return ResponseAPI.serverError(res, error.message || 'Error retrieving users');
        }
      },
};

module.exports = userController;