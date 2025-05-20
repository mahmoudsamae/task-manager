import { createContext, useState } from "react";
import tasksApis from "../_utilte/tasksApis";
import { toast } from "react-toastify";

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [addTask, setAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [filterPriority, setfilterPriority] = useState("all");
  const [showAddTask, setShowAddTask] = useState(false);
  const [updateTask, setUpdateTask] = useState(null);
  const [isDeleteAll, setIsDeleteAll] = useState(false);

  
    const getAllTasks_ = async () => {
      await tasksApis
        .getAllTasks()
        .then((data) => {
          setAllTasks(data?.data);
          if (filterPriority && filterPriority !== "all") {
            setTasks(data?.data.filter((ele) => ele?.priority === filterPriority));
          
          }else if(filterPriority === "all"){
            setTasks(data?.data);
          } 
        })
        .catch((error) => {
          toast(error.message);
        });
    };


  return (
    <TaskContext.Provider
      value={{
        addTask,
        setAddTask,
        getAllTasks_,
        setfilterPriority,
        filterPriority,
        tasks,
        setTasks,
        showAddTask,
        setShowAddTask,
        updateTask,
        setUpdateTask,
        allTasks,
        isDeleteAll,
        setIsDeleteAll,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider