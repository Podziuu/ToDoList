import { User } from "../models/user.js";

export const signup = async (req, res, next) => {
  const { name, email, password } = req.body;

  const createdUser = new User({
    name,
    email,
    password,
    tasks: [],
  });

  await createdUser.save();

  res.status(200).json({ user: createdUser });
};
