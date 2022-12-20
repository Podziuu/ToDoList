import Joi from "joi";
import taskSchema from "./taskSchema.js";

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ tlds: { allow: false } }).required(),
  password: Joi.string().required(),
  tasks: Joi.array().items(taskSchema),
});

export default userSchema;
