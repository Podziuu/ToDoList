import express from "express";
import { checkAuth } from "../middlewares/check-auth.js";
import { createTask, getTasks } from "../controllers/tasks-controllers.js";

const router = express.Router();

router.get("/", checkAuth, getTasks);

router.post("/", checkAuth, createTask);

export default router;
