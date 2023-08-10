const { Contact } = require("../models/contact");
const { RequestError } = require("../helpers/RequestError");

const listContacts = async (owner, page = 1, limit = 10, filters = {}) => {
  const query = { owner };
  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    populate: {
      path: "owner",
      select: "email",
    },
    sort: { name: 1 },
  };

  if (filters.favorite !== undefined) {
    query.favorite = filters.favorite === "true";
  }

  return await Contact.paginate(query, options);
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

const updateStatusContact = async (contactId, updateData) => {
  if (updateData.favorite === undefined) {
    throw RequestError(400, "Missing field favorite");
  }

  const result = await Contact.findByIdAndUpdate(contactId, updateData, {
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
