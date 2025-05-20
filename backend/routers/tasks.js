import express from "express";
import { getTasks, createTasks, deleteTask, updateTask, deleteAllTasks } from "../controllers/tasks.js";
import verifyToken from "../middleware/verifyToken.js";


const router = express.Router();

router.get("/", verifyToken, getTasks);
router.post("/", verifyToken, createTasks);
router.delete("/:id", verifyToken, deleteTask);
router.put("/:id", verifyToken, updateTask);
router.delete("/", verifyToken, deleteAllTasks);

export default router;