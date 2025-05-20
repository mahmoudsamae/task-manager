import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: " low",
  },
  status: {
    type: String,
    enum: ["pending", "in progress", "completed"],
    default: "pending",
  },
  dueDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // 🔗 نفس اسم الـ model المستخدم
    required: true,
  },
});

const TaskSchema = mongoose.model("task", taskSchema);

export default TaskSchema;