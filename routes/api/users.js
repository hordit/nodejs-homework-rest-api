const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody, authenticate } = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const { schemas } = require("../../schemas/user");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.registerController)
);

router.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.loginController)
);

router.get("/logout", authenticate, ctrlWrapper(ctrl.logoutController));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrentController));

router.patch(
  "/",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  ctrlWrapper(ctrl.updateSubscriptionController)
);

module.exports = router;
