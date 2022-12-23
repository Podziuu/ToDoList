import express from "express";
import checkAuth from '../middlewares/check-auth.js'
import { createTask, getTasks } from "../controllers/tasks-controllers.js";

const router = express.Router();

router.use(checkAuth)

router.get("/", getTasks);

router.post("/", createTask);

export default router;
