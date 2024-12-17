const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const upload = require("../utils/multer");
const authorizedRole = require("../middleware/authorizedRole");

const userRouter = express.Router();

userRouter.post("/user/register", userController.register);
userRouter.post("/user/login", userController.login);
userRouter.post("/user/forgot-password", userController.forgotPassword);
userRouter.post(
  "/user/edit-profile",
  auth,
  authorizedRole("customer"),
  upload.single("photoUrl"),
  userController.editProfile
);
userRouter.post(
  "/user/change-password",
  auth,
  authorizedRole("customer"),
  userController.changePassword
);
userRouter.get(
  "/admin/get-all-user",
  auth,
  authorizedRole("admin"),
  userController.getAllUsers
);
userRouter.get(
  "/admin/box-info",
  auth,
  authorizedRole("admin"),
  userController.getSummary
);
userRouter.get(
  "/user/box-info",
  auth,
  authorizedRole("customer"),
  userController.getUserBoxInfo
);
userRouter.delete(
  "/admin/delete-user/:id",
  auth,
  authorizedRole("admin"),
  userController.deleteUser
);

module.exports = userRouter;
