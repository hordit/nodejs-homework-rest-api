const Joi = require("joi");

const emailRegExp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const allSubscriptions = ["starter", "pro", "business"];

const registerSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .pattern(emailRegExp)
    .messages({
      "string.pattern.base": "Invalid email. The email must be valid.",
    })
    .required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .pattern(emailRegExp)
    .messages({
      "string.pattern.base": "Invalid email. The email must be valid.",
    })
    .required(),
  password: Joi.string().min(6).required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid(...allSubscriptions).required()
});

const schemas = {
  registerSchema,
  loginSchema,
  subscriptionSchema,
};

module.exports = { schemas };
