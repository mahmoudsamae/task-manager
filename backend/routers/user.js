import express from "express";
import { loginUser, signUp, updateUser } from "../controllers/user.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signUp);
router.put("/update/:id", updateUser);

export default router