import mongoose from "mongoose";

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: { type: String, required: true },
  checked: { type: Boolean, required: true, default: false },
  day: { type: String, required: true },
});

export const Task = mongoose.model("Task", taskSchema);
