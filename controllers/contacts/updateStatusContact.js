const { Contact } = require("../../models/contacts");

const { RequestError } = require("../../helpers");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  if (!favorite) {
    throw RequestError(400, "missing field favorite");
  }

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw RequestError(404);
  }

  res.status(200).json(result);
};

module.exports = updateStatusContact;
