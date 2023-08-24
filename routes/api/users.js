const express = require("express");

const ctrl = require("../../controllers/auth");

const { validateBody, authenticate, upload } = require("../../middlewares");

const { ctrlWrapper } = require("../../helpers");

const { schemas } = require("../../schemas/user");

const router = express.Router();

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.registerController)
);

router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyController));

router.post(
  "/verify/",
  validateBody(schemas.verifyEmailSchema),
  ctrlWrapper(ctrl.resendEmailController)
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

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrl.updateAvatarController)
);

module.exports = router;
