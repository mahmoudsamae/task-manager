"use client";
import { TaskContext } from "@/app/_context/TaskContext";
import tasksApis from "@/app/_utilte/tasksApis";
import { Album, Star, Trash2 } from "lucide-react";
import React, { memo, useContext } from "react";
import { toast } from "react-toastify";
import UpdateForm from "./UpdateForm";
import { motion } from "framer-motion";


const Task = memo(({ task }) => {
  const { getAllTasks_, updateTask, setUpdateTask } = useContext(TaskContext);

  const createdAt = new Date(task?.createdAt);
  const now = new Date();
  const diffInMs = now - createdAt;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  const handleDeleteTask = (e, id) => {
    e.stopPropagation();
    try {
      tasksApis.deleteTask(id).then((res) => {
        getAllTasks_();
        toast.success(res.data.message);
      });
    } catch (error) {
      toast.error(error.respons.data.message);
    }
  };

  return (
    <>
      {updateTask?._id === task._id && (
        <UpdateForm task={updateTask} setUpdateTask={setUpdateTask} />
      )}
      <motion.div
        onClick={() => setUpdateTask(task)}
        className="bg-white dark:bg-darkSecondary rounded-2xl p-3 flex flex-col flex-1 cursor-pointer hover:shadow-primary transition duration-300 hover:scale-105"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="h-[120px]">
          <h1 className="font-bold text-[18px] dark:text-white">
            {task.title}
          </h1>
          <p className="text-[13px] font-normal text-gray-500 dark:text-gray-300">
            {task?.description}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-[14px] text-gray-400 font-medium">
            {diffInDays === 0
              ? "today"
              : diffInDays === 1
              ? "yasterday"
              : `${diffInDays} ago`}
          </p>
          <p
            className={`text-[14px] ${
              task?.priority === "low"
                ? "text-sky-500"
                : task?.priority === "medium"
                ? "text-amber-500"
                : "text-primary"
            } font-medium `}
          >
            {task?.priority}
          </p>
          <div className="flex items-center gap-1">
            <div className="sticky inset-x-0 bottom-0  border-gray-100 dark:border-darkPrimary bg-white dark:bg-darkSecondary ">
              <button
                aria-label="Edit Task"
                className="group relative flex w-full justify-center rounded-lg text-sm text-gray-500  hover:text-primary"
              >
                <Album className="w-[20px] text-sky-500 cursor-pointer" />

                <span className="invisible w-[95px] p-1 absolute start-full top-10 -left-15 ms-4 -translate-y-1/2 rounded-sm bg-gray-900  py-1.5 text-xs font-medium text-white group-hover:visible">
                  Edit Task
                </span>
              </button>
            </div>
            <div className="sticky inset-x-0 bottom-0  border-gray-100 dark:border-darkPrimary bg-white dark:bg-darkSecondary">
              <button
                aria-label="Delete task"
                className="group relative flex w-full justify-center rounded-lg text-sm text-gray-500  hover:text-primary"
              >
                <Trash2
                  onClick={(e) => handleDeleteTask(e, task?._id)}
                  className="group relative w-[20px] text-primary cursor-pointer"
                />

                <span className="invisible w-[95px] p-1 absolute start-full top-10 -left-20 ms-4 -translate-y-1/2 rounded-sm bg-gray-900  py-1.5 text-xs font-medium text-white group-hover:visible">
                  Delete task
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
});

export default Task;
