const { updateStatusContact } = require("../../services/contactsServices");

const updateStatusContactController = async (req, res) => {
  const { contactId } = req.params;
  const updateData = req.body;

  const result = await updateStatusContact(contactId, updateData);

  res.status(200).json(result);
};

module.exports = updateStatusContactController;
