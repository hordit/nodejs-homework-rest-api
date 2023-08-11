const express = require("express");

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const schemas = require("../../schemas/contact");

const { validateBody, authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.listContactsController));

router.get(
  "/:contactId",
  authenticate,
  ctrlWrapper(ctrl.getContactByIdController)
);

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.addContactController)
);

router.delete(
  "/:contactId",
  authenticate,
  ctrlWrapper(ctrl.removeContactController)
);

router.put(
  "/:contactId",
  authenticate,
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateContactController)
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContactController)
);

module.exports = router;
