const { addContact } = require("../../services/contactsServices");

const addContactController = async (req, res) => {
  const result = await addContact(req.body);
  res.status(201).json(result);
};

module.exports = addContactController;
