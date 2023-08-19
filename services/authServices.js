const { User } = require("../models/user");
const { RequestError } = require("../helpers");
const path = require("path");
const fs = require("fs/promises");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const { SECRET_KEY } = process.env;

const register = async (email, password) => {
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw RequestError(409, "Email in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const avatarURL = gravatar.url(email, { default: "wavatar" });

  const newUser = await User.create({
    email,
    password: hashPassword,
    subscription: "starter",
    avatarURL,
  });

  return {
    email: newUser.email,
    subscription: newUser.subscription,
    avatarURL: newUser.avatarURL,
  };
};

const login = async (email, password) => {
  const error = RequestError(401, "Email or password wrong");
  const user = await User.findOne({ email });

  if (!user) {
    throw error;
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw error;
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

  await User.findByIdAndUpdate(user._id, { token });

  return {
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  };
};

const getCurrent = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(401, "Not authorized");
  }

  return user;
};

const logout = async (userId) => {
  await User.findByIdAndUpdate(userId, { token: "" });
};

const updateSubscription = async (userId, subscription) => {
  const updateUser = await User.findByIdAndUpdate(
    userId,
    { subscription },
    { new: true }
  );

  return {
    email: updateUser.email,
    subscription: updateUser.subscription,
  };
};

const updateAvatar = async (userId, tempUpload, originalname) => {
  const extention = originalname.split(".").pop();
  const filename = `${userId}.${extention}`;
  const resultUpload = path.join(avatarsDir, filename);

  await fs.rename(tempUpload, resultUpload);

  const avatarURL = path.join("avatars", filename);

  const image = await Jimp.read(resultUpload);
  await image.resize(250, 250).writeAsync(resultUpload);

  await User.findByIdAndUpdate(userId, { avatarURL });

  return {
    avatarURL,
  };
};

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
};
