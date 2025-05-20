import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import taskRouter from "./routers/tasks.js";
import userRouter from "./routers/user.js"
import dotenv from "dotenv"

dotenv.config()
const app = express();

app.set("view engin", "ejs")
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/tasks", taskRouter);
app.use("/auth", userRouter);

const PORT = process.env.PORT || 5000;
const connectURL = process.env.MONGO_URL || "mongodb+srv://taskManager:taskMagaer123@cluster0.3wyrau5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(connectURL).then(() => app.listen(PORT, () => {
  console.log("Server is running on prot " + PORT);
})).catch(error => console.log("error to connect " + error.message))
