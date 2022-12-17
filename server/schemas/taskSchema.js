import Joi from "joi";

const taskSchema = Joi.object({
  name: Joi.string().required(),
  checked: Joi.boolean(),
  day: Joi.string().required(),
  user: Joi.string().hex().length(24).required(),
});

export default taskSchema;
