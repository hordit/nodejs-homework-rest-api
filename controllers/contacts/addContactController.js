const { addContact } = require("../../services/contactsServices");

const addContactController = async (req, res) => {
  const { _id: owner } = req.user;
  const contactData = {...req.body, owner}
  const result = await addContact(contactData);
  res.status(201).json(result);
};

module.exports = addContactController;
