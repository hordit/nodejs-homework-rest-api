const { updateContact } = require("../../services/contactsServices");

const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);

  res.status(200).json(result);
};

module.exports = updateContactController;
