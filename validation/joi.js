const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/)
    .messages({
      "string.min": "Name must be at least 3 characters",
      "string.max": "Name must not be more than 30 characters",
      "string.pattern.base":
        "Name must contain only letters and spaces between words",
    }),
  email: Joi.string().email().messages({
    "string.email": "Invalid email format",
  }),
  phone: Joi.string()
    .pattern(/^[0-9]{3}-[0-9]{3}-[0-9]{3}$/)
    .messages({
      "string.pattern.base": "Invalid phone format. Use XXX-XXX-XXX",
    }),
});

module.exports = schema;
