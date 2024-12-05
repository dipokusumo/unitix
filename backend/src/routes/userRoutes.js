const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const authorizedRole = require('../middleware/authorizedRole');

const userRouter = express.Router();

userRouter.post('/user/register', userController.register);
userRouter.post('/user/login', userController.login);
userRouter.post('/user/forgot-password', userController.forgotPassword);
userRouter.post('/user/edit-profile', auth, authorizedRole('user'), userController.editProfile);
userRouter.post('/user/change-password', auth, authorizedRole('user'), userController.changePassword);
userRouter.get('/get-all-user', auth, authorizedRole('admin'), userController.getAllUsers);

module.exports = userRouter;