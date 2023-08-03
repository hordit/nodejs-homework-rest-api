const { Contact } = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    throw RequestError(400, "Missing field favorite");
  }

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw RequestError(404);
  }

  res.json(result);
};

module.exports = updateStatusContact;
