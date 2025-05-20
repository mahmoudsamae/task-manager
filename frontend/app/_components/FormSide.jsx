"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TaskContext } from "../_context/TaskContext";
import TaskPointer from "./TaskComponents/TaskPointer";
import TaskChart from "./TaskChart";
import { UserContext } from "../_context/UserProvider";
import { toast } from "react-toastify";

const FormSide = () => {
  const { allTasks, setTasks } = useContext(TaskContext);
  const { user, userLogout } = useContext(UserContext);

  if (!user?.user?.username) return null;

  const avatar = user?.user?.username
    .split(" ")
    .map((ele) => ele?.charAt(0).toUpperCase());

  const handleLogout = async () => {
    try {
      await userLogout(setTasks);
    } catch (error) {
      toast.error("Logout failed");
    }
  };
  return (
    <>
      {user?.user?.username && (
        <div className="hidden sm:flex h-[89vh] flex-col justify-between border-t border-gray-100 dark:border-darkPrimary bg-white dark:bg-darkSecondary fixed top-16 right-0 sm:w-[28vw] lg:w-[20vw] z-40">
          <div className="w-full px-2">
            {/* User info */}
            <div className="mt-2 flex items-center gap-2 bg-gray-100 dark:bg-darkPrimary w-full rounded-2xl p-2">
              <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-full bg-primary">
                <span className="font-medium text-white uppercase sm:text-[14px] md:text-[16px]">
                  {avatar.join("")}
                </span>
              </div>

              <div>
                <p className="text-xs">
                  <strong className="block font-bold text-[15px] capitalize dark:text-white">
                    Hello,
                  </strong>

                  <span className="sm:text-[12px] capitalize md:text-[15px] dark:text-gray-300">
                    {user?.user?.username}
                  </span>
                </p>
              </div>
            </div>

            <TaskPointer type={"lg"} />

            {/* completed VS pending tasks */}
            <div className="w-full flex flex-col justify-center items-center bg-gray-100 dark:bg-darkPrimary  p-2 rounded-md md:mt-1">
              <div className="flex flex-col items-center">
                <h1 className="font-bold text-center text-[11px] md:text-[13px] dark:text-white">
                  Completed vs Pending Tasks
                </h1>
                <h1 className="font-medium text-center text-gray-400 text-[10px]">
                  Completed vs Pending Tasks
                </h1>
              </div>
              <TaskChart allTasks={allTasks} />
              <div className="flex flex-col items-center">
                <p className="text-[12px] text-center font-medium dark:text-white">
                  Task Completion improved by 12% this month
                </p>
                <p className="text-[10px] text-center font-medium text-gray-400">
                  Analysis based on tasks completed in the last 30 days.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full pb-3">
            <button
              onClick={handleLogout}
              className="rounded-4xl cursor-pointer bg-primary border-2 w-fit hover:bg-hover px-3 py-1 text-white"
            >
              {user?.user?.username ? "Sign Out" : "Sign In"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FormSide;
