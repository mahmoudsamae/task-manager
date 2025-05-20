"use client";
import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../_context/TaskContext";
import Task from "../_components/TaskComponents/Task";
import Link from "next/link";
import { UserContext } from "../_context/UserProvider";
import EmptyState from "../_components/EmptyState";
import PagesTitle from "../_components/PagesTitle";

const Page = () => {
  const nowDate = new Date().toISOString();
  const { tasks, getAllTasks_ } = useContext(TaskContext);
  const { user } = useContext(UserContext);
  const [overDueTasks, setOverDueTasks] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token && user) {
        getAllTasks_();
      }
    }
  }, [user]);

  useEffect(() => {
    setOverDueTasks(tasks?.filter((ele) => ele.dueDate < nowDate));
  }, [tasks]);
  return (
    <div className="mx-2 mt-2 p-4 rounded-tl-3xl rounded-tr-3xl w-[100%] bg-gray-100 dark:bg-darkPrimary min-h-[88vh] ">
      {user?.user?.username && (
        <PagesTitle title={"Over Due Tasks"}/>
      )}
      {user?.user?.username ? (
        <div>
          {overDueTasks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {overDueTasks?.map((task) => (
                <Task key={task?._id} task={task} />
              ))}
            </div>
          ) : (
            <EmptyState
              title={"No OverDue Task."}
              path={"/"}
              linkText={"All Tasks"}
            />
          )}
        </div>
      ) : (
        <EmptyState
          title={"You Have No Tasks Yet."}
          text={"Let's do your first task."}
          path={"/auth/signin"}
          linkText={"Make Task"}
        />
      )}
    </div>
  );
};

export default Page;
