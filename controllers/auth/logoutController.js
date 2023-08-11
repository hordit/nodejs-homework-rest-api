const { logout } = require("../../services/authServices");

const logoutController = async (req, res) => {
  const { _id } = req.user;
  await logout(_id);
  res
    .status(204)
    .json({
      message: "No Content",
    })
    .end();
};

module.exports = logoutController;
