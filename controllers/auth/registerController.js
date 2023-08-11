const { register } = require("../../services/authServices");

const registerController = async (req, res) => {
  const { email, password } = req.body;
  const result = await register(email, password);
  res.status(201).json(result);
};

module.exports = registerController;
