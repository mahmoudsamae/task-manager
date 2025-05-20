import TaskSchema from "../models/task.js";

// get all tasks depending on user id
export const getTasks = async (req, res) => {
  try {
    const tasks = await TaskSchema.find({ user: req.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(tasks)
  } catch (error) {
    res.status(404).json({massage: error.massage})
  }
};

// create task 
export const createTasks = async (req, res) => {
  const { title, description, priority, dueDate, status } = req.body;
const userId = req.userId;
  try {
    const newTask = new TaskSchema({
      title,
      description,
      priority,
      dueDate,
      status,
      user: userId,
    });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(409).json({massage: error.massage})
  }
}

// delete 1 task 
export const deleteTask = async (req, res) => {
  const taskID = req.params.id;
  try {
    const deletedTask = await TaskSchema.findByIdAndDelete(taskID);
    if(!deletedTask){
      return res.status(404).json({message: "Task not found"})
    }

    res.status(200).json({ message: "Task deleted successfully", task: deletedTask});
  } catch (error) {
    res.status(500).json({message: "Error deleting task", error})
  }
}

// delete all task
export const deleteAllTasks = async (req, res) => {
  try {
    await TaskSchema.deleteMany({});
    res.status(200).json({ message: "All tasks deleted successfully." });
  } catch (error) {
    res.status(500).json({message: "Error while deleting tasks."})
  }
}

// update task 
export const updateTask = async (req, res) => {
  const data = req.body;
  const taskID = req.params.id;
  try {
    const updatedTask = await TaskSchema.findByIdAndUpdate(taskID, data, {new: true});

    if (!updatedTask) {
      res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({message: "Task Updated" , task: updateTask});

  } catch (error) {
    res.status(500).json({message: error.message});
  }
}