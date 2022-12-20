import mongoose, { mongo } from "mongoose";
import HttpError from "../models/HttpError.js";
import { Task } from "../models/task.js";
import { User } from "../models/user.js";
import taskSchema from "../schemas/taskSchema.js";

export const getTasks = async (req, res, next) => {
  const { day, userId } = req.body;

  let tasks;
  try {
    tasks = await Task.find({ user: userId });
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not find a place.", 500)
    );
  }

  res.status(200).json({ tasks });
};

export const createTask = async (req, res, next) => {
  const { name, day, user } = req.body;
  const { error } = taskSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((e) => e.message).join(",");
    return next(new HttpError(msg, 400));
  }

  const createdTask = new Task({
    name,
    day,
    user,
  });

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return next(
      new HttpError("Creating task failed, please try again later.", 500)
    );
  }

  if (!existingUser) {
    return next(new HttpError("Could not find user for provided id", 404));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdTask.save({ session: sess });
    existingUser.tasks.push(createdTask);
    await existingUser.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError("Creating task failed, please try again later.", 500)
    );
  }

  res.status(200).json({ task: createdTask });
};
