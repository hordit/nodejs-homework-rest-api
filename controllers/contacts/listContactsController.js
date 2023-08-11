const { listContacts } = require("../../services/contactsServices");

const listContactsController = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;

  const result = await listContacts(
    owner,
    page,
    limit,
    { favorite },
    "-createAt -updatedAt"
  );
  res.status(200).json(result);
};

module.exports = listContactsController;
