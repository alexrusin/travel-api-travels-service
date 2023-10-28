import Joi from "joi";

export const createTravelSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string(),
  number_of_days: Joi.number().integer().greater(0).required(),
  is_public: Joi.bool().default(true),
});

export const updateTravelSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  description: Joi.string(),
  number_of_days: Joi.number().integer().greater(0),
  is_public: Joi.bool(),
}).or("name", "description", "number_of_days", "is_public");
