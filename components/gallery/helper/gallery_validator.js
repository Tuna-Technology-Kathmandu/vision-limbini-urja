const Joi = require("joi");

const ceoMessageValidation = Joi.object({
  altText: Joi.string().min(3).max(100).optional(),

  description: Joi.string().min(3).max(50).optional(),

  status: Joi.string()
    .valid("pending", "approved")
    .default("pending")
    .messages({
      "string.valid": "Status must be either 'pending' or 'approved'",
    }),
});

module.exports = ceoMessageValidation;
