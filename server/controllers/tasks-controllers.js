import mongoose from "mongoose";
import { Task } from "../models/task.js";

export const createTask = async (req, res, next) => {
  const { name, day } = req.body;

  const createdTask = new Task({
    name,
    day,
  });

  await createdTask.save();

  res.status(200).json({ task: createdTask });
};
