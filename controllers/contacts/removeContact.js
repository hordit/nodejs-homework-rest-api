const { Contact } = require("../../models/contacts");

const { RequestError } = require("../../helpers");

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw RequestError(404);
  }
  res.status(200).json({ message: "Contact deleted" });
};

module.exports = removeContact;
