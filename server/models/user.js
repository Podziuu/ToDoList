import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  tasks: [{ type: mongoose.Types.ObjectId, required: true, ref: "Task" }],
});

export const User = mongoose.model("User", userSchema);
