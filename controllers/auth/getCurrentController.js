const { getCurrent } = require("../../services/authServices");

const getCurrentController = async (req, res) => {
  const { email, subscription } = req.user;
  await getCurrent(email);

  res.json({
    email,
    subscription,
  });
};

module.exports = getCurrentController;
