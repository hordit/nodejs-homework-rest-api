const Joi = require("joi");

const emailRegExp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

const addSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(30)
    .pattern(/^[A-Za-z ]+$/)
    .messages({
      "string.pattern.base":
        "Invalid name. The name must be written only in letters and contain from 2 to 30 characters.",
    })
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: false } })
    .pattern(emailRegExp)
    .messages({
      "string.pattern.base": "Invalid email. The email must be valid.",
    })
    .required(),
  phone: Joi.string()
    .trim()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .messages({
      "string.pattern.base":
        "Invalid phone number format. The format should be (XXX) XXX-XXXX.",
    })
    .required(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

module.exports = {
  addSchema,
  updateFavoriteSchema,
};
