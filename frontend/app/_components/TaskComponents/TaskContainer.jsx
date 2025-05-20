"use client";
import React, { useContext, useEffect } from "react";
import Task from "./Task";
import AddTaskForm from "./AddTaskForm";
import { TaskContext } from "@/app/_context/TaskContext";
import { UserContext } from "@/app/_context/UserProvider";
import Link from "next/link";
import TaskPointer from "./TaskPointer";

const filterData = [
  {
    id: 1,
    text: "all",
  },
  {
    id: 2,
    text: "low",
  },
  {
    id: 3,
    text: "medium",
  },
  {
    id: 4,
    text: "high",
  },
];

const TaskContainer = () => {
  const { user } = useContext(UserContext);
  const {
    tasks,
    addTask,
    setAddTask,
    getAllTasks_,
    setfilterPriority,
    filterPriority,
    setShowAddTask,
  } = useContext(TaskContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setShowAddTask(true);
      getAllTasks_();
    }
  }, [filterPriority, user]);

  const isLoggedIn = !!user?.user?.username;

  return (
    <div className="mx-2 mt-2 p-4 rounded-tl-3xl rounded-tr-3xl w-[100%] bg-gray-100 dark:bg-darkPrimary min-h-[88vh] ">
      {isLoggedIn && (
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-2 sm:gap-0 ">
            <h1 className="font-bold text-2xl dark:text-white">All Tasks</h1>
            {/* Filter Buttons */}
            <div className="bg-white dark:bg-darkSecondary px-2 py-1 rounded-2xl flex items-center gap-3">
              {filterData?.map((priority) => (
                <button
                  onClick={() => setfilterPriority(priority?.text)}
                  className={`capitalize ${
                    priority?.text === filterPriority
                      ? "bg-primary text-white"
                      : "text-primary hover:bg-hover hover:text-white dark:text-white"
                  } border-2 border-primary text-[12px] px-1.5 sm:px-2 py-0.1 sm:py-0.5 rounded-3xl cursor-pointer transition`}
                  key={priority?.id}
                >
                  {priority?.text}
                </button>
              ))}
            </div>
          </div>
          {/* Mobile View Pointer */}
          <div className="sm:hidden">
            <TaskPointer type={"sm"} />
          </div>
          <hr className="my-3 text-gray-200 dark:text-darkSecondary" />
        </div>
      )}
      {isLoggedIn ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {tasks?.map((task) => (
            <Task key={task?._id} task={task} />
          ))}

          {/* Add Task Button */}
          <div
            onClick={() => setAddTask(true)}
            className="border-2 border-primary rounded-2xl flex justify-center items-center flex-col flex-1 h-[170px] text-primary cursor-pointer border-dotted font-bold text-[18px]"
          >
            + Add Task
          </div>
          {/* Add Task Form */}
          {addTask && <AddTaskForm />}
        </div>
      ) : (
        <div className=" w-[100%] h-[30vh] sm:h-[50vh] md:h-[60vh] flex flex-col justify-center items-center gap-3">
          <div className="w-[300px] gap-4 flex flex-col justify-center items-center h-[200px] bg-white dark:bg-darkSecondary rounded-4xl shadow-2xl">
            <h1 className="text-2xl font-bold dark:text-white">
              You Have No Task Yet.
            </h1>
            <p className="dark:text-gray-300">Let's do your first.</p>
            <Link
              href={"/auth/signin"}
              className="rounded-4xl cursor-pointer bg-primary border-2 w-fit hover:bg-hover px-3 py-1 text-white"
            >
              Make Task
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskContainer;
