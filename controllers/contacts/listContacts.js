const { Contact } = require("../../models/contacts.js");

const listContacts = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

module.exports = listContacts;
