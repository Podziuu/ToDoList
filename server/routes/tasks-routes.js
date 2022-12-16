import express from "express";
import { createTask } from "../controllers/tasks-controllers.js";

const router = express.Router();

router.post("/", createTask);

export default router;