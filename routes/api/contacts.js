const express = require("express");

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const schemas = require("../../schemas/contact");

const { validateBody } = require("../../middlewares");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContactsController));

router.get("/:contactId", ctrlWrapper(ctrl.getContactByIdController));

router.post(
  "/",
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.addContactController)
);

router.delete("/:contactId", ctrlWrapper(ctrl.removeContactController));

router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  ctrlWrapper(ctrl.updateContactController)
);

router.patch(
  "/:contactId/favorite",
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateStatusContactController)
);

module.exports = router;
