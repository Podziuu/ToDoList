import express from "express";
import checkAuth from "../middlewares/check-auth.js";
import {
  checkTask,
  createTask,
  getTasks,
} from "../controllers/tasks-controllers.js";

const router = express.Router();

router.use(checkAuth);

router.get("/:day", getTasks);

router.post("/", createTask);

router.post("/:id", checkTask);

export default router;
