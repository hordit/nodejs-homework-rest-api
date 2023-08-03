const { listContacts } = require("../../services/contactsServices");

const listContactsController = async (req, res) => {
  const result = await listContacts();
  res.status(200).json(result);
};

module.exports = listContactsController;
