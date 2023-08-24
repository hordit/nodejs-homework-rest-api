const registerController = require("./registerController");
const verifyController = require("./verifyController");
const loginController = require("./loginController");
const getCurrentController = require("./getCurrentController");
const logoutController = require("./logoutController");
const updateSubscriptionController = require("./updateSubscriptionController");
const updateAvatarController = require("./updateAvatarController");
const resendEmailController = require("./resendEmailController");

module.exports = {
  registerController,
  verifyController,
  resendEmailController,
  loginController,
  getCurrentController,
  logoutController,
  updateSubscriptionController,
  updateAvatarController,
};
