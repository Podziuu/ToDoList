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

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    console.log(err);
  }

  res.status(200).json({
    name: existingUser.name,
    email: existingUser.email,
    userId: existingUser._id,
  });
};
