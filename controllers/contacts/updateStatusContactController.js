const { updateStatusContact } = require("../../services/contactsServices");

const updateStatusContactController = async (req, res) => {
  const { contactId } = req.params;
  const result = await updateStatusContact(contactId, req.body);

  res.status(200).json(result);
};

module.exports = updateStatusContactController;
