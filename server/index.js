import mongoose from "mongoose";
import express from "express";
import cors from "cors";

import { default as taskRouter } from "./routes/tasks-routes.js";
import { default as usersRouter } from "./routes/users-routes.js";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/tasks", taskRouter);
app.use("/api/users", usersRouter);

app.use((err, req, res, next) => {
  res
    .status(err.code || 500)
    .json({ message: err.message || "An unkown error occurred!" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.5sji96i.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("Listening on port 5000 and database connected");
    });
  })
  .catch((err) => {
    console.log(err);
  });
