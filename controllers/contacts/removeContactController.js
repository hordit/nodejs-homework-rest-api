const { removeContact } = require("../../services/contactsServices");

const removeContactController = async (req, res) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);

  res.status(200).json({ message: "Contact deleted", result });
};

module.exports = removeContactController;
