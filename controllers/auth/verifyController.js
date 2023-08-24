const { verify } = require("../../services/authServices");

const verifyController = async (req, res) => {
  const { verificationToken  } = req.params;
 
  const result = await verify(verificationToken);
  res.status(200).json(result);
};

module.exports = verifyController;




