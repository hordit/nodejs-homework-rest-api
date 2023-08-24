const nodemailer = require("nodemailer");
const RequestError = require("./RequestError");
require("dotenv").config();

const { SENDGMAIL_KEY } = process.env;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "horditan@gmail.com",
    pass: SENDGMAIL_KEY,
  },
});

const sendEmail = async (data) => {
  const mail = { ...data, from: "horditan@gmail.com" };
  await transporter
    .sendMail(mail)
    .then(() => console.log("success"))
    .catch((error) => {
        throw RequestError(error.message)
    });
  return true;
};

module.exports = sendEmail;
