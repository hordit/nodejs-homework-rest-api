const { login } = require("../../services/authServices");

const loginController = async (req, res) => {
  const { email, password } = req.body;
  const result = await login(email, password);
  res.json(result);
};

module.exports = loginController;
