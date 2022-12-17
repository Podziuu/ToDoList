import express from "express";
import { login, signup } from "../controllers/users-controllers.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

export default router;
