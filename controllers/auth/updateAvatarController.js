const { updateAvatar } = require("../../services/authServices");

const updateAvatarController = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  const result = await updateAvatar(_id, tempUpload, originalname);

  res.json(result);
};

module.exports = updateAvatarController;
