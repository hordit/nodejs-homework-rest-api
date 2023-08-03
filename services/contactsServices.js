const { Contact } = require("../models/contacts");
const { RequestError } = require("../helpers/RequestError");

const listContacts = async () => {
  const result = await Contact.find();
  return result;
};

const getContactById = async (contactId) => {
  const result = await Contact.findById(contactId);

  if (!result) {
    throw RequestError(404);
  }
  return result;
};

const addContact = async (contactData) => {
  const result = await Contact.create(contactData);
  return result;
};

const updateContact = async (contactId, contactData) => {
  const result = await Contact.findByIdAndUpdate(contactId, contactData, {
    new: true,
  });
  if (!result) {
    throw RequestError(404);
  }
  return result;
};

const updateStatusContact = async (contactId, dataToUpdate) => {
  if (dataToUpdate.favorite === undefined) {
    throw RequestError(400, "Missing field favorite");
  }

  const result = await Contact.findByIdAndUpdate(contactId, dataToUpdate, {
    new: true,
  });
  if (!result) {
    throw RequestError(404);
  }

  return result;
};

const removeContact = async (contactId) => {
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    throw RequestError(404);
  }
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact,
};
