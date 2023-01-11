import mongoose, { isObjectIdOrHexString } from "mongoose";
import HttpError from "../models/HttpError.js";
import { Task } from "../models/task.js";
import { User } from "../models/user.js";
import taskSchema from "../schemas/taskSchema.js";

export const getTasks = async (req, res, next) => {
  const { day } = req.params;
  let tasks;
  try {
    tasks = await Task.find({ user: req.userData.userId });
  } catch (err) {
    return next(
      new HttpError("Something went wrong, please try again later.", 500)
    );
  }

  if (!tasks) {
    return next(
      new HttpError(
        "Could not find tasks for provided user, please try again later.",
        500
      )
    );
  }

  const dayTasks = tasks.filter((task) => {
    return task.day === day;
  });

  res.status(200).json({ dayTasks });
};

export const createTask = async (req, res, next) => {
  const { name, day } = req.body;
  const { error } = taskSchema.validate({
    name,
    day,
    user: req.userData.userId,
  });

  if (error) {
    const msg = error.details.map((e) => e.message).join(",");
    return next(new HttpError(msg, 400));
  }

  const createdTask = new Task({
    name,
    day,
    user: req.userData.userId,
  });

  let existingUser;
  try {
    existingUser = await User.findById(req.userData.userId);
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

export const checkTask = async (req, res, next) => {
  const { id } = req.params;

  let task;
  try {
    task = await Task.findById(id);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, please try again later.", 500)
    );
  }

  if (!task) {
    return next(
      new HttpError(
        "Could not find task for provided id, please try again later.",
        404
      )
    );
  }

  task.checked = !task.checked;

  task.save();

  res.status(200).json({ task });
};

export const deleteCompleted = async (req, res, next) => {
  let completedTasks;
  try {
    completedTasks = await Task.find({
      user: req.userData.userId,
      checked: true,
    });
  } catch (err) {
    return next(
      new HttpError("Something went wrong, please try again later.", 500)
    );
  }

  if (!completedTasks) {
    return next(
      new HttpError(
        "Could not find any completed tasks, please try again later.",
        404
      )
    );
  }

  const Ids = completedTasks.map((t) => t._id);

  const sess = await mongoose.startSession();
  sess.startTransaction();
  try {
    const deletedCount = await Task.deleteMany(
      {
        user: req.userData.userId,
        checked: true,
        _id: { $in: Ids },
      },
      { sess }
    );
    const deletedUsersTasks = await User.updateMany(
      { _id: req.userData.userId },
      {
        $pull: {
          tasks: {
            $in: Ids,
          },
        },
      }
    );
    await sess.commitTransaction();
    sess.endSession();
  } catch (err) {
    await sess.abortTransaction();
    sess.endSession();
    return next(
      new HttpError("Deleting tasks went wrong, please try again later.", 500)
    );
  }
};
