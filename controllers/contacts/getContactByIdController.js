const { getContactById } = require("../../services/contactsServices");

const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;

  const result = await getContactById(contactId);

  res.status(200).json(result);
};

module.exports = getContactByIdController;
