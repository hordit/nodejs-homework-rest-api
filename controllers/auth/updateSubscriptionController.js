const { updateSubscription } = require("../../services/authServices");

const updateSubscriptionController = async (req, res) => {
  const { subscription } = req.body;
  const { _id } = req.user;

  const updateUser = await updateSubscription(_id, subscription);
  res.json(updateUser);
};

module.exports = updateSubscriptionController;
