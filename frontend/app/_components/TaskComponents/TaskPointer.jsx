import { TaskContext } from "@/app/_context/TaskContext";
import React, { useContext } from "react";

const TaskPointer = ({ type }) => {
  const { allTasks = []} = useContext(TaskContext);
  const inProgressTasks = allTasks?.filter((ele) => ele.status === "in progress");
  const pendingTasks = allTasks?.filter((ele) => ele.status === "pending");
  const completedTasks = allTasks?.filter((ele) => ele.status === "completed");
  return (
    <div
      className={`flex ${
        type === "lg" ? "flex-col" : "flex-col sm:flex-row "
      } gap-1.5 my-2`}
    >
      <div className="flex items-center flex-1 gap-2">
        <TaskPointerItem
          type={type}
          title={"Total Tasks"}
          value={allTasks?.length}
        />
        <TaskPointerItem
          type={type}
          title={"In Progress"}
          value={inProgressTasks?.length}
        />
      </div>
      <div className="flex items-center flex-1 gap-2">
        <TaskPointerItem
          type={type}
          title={"Pending"}
          value={pendingTasks?.length}
        />
        <TaskPointerItem
          type={type}
          title={"Completed"}
          value={completedTasks?.length}
        />
      </div>
    </div>
  );
};

const TaskPointerItem = ({ type, title, value }) => {
  return (
    <div
      className={`flex flex-col flex-1 ${
        type === "sm" && "items-center bg-white dark:bg-darkSecondary py-1.5 rounded-2xl"
      }`}
    >
      <p className="text-gray-400 text-[14px] sm:text-[12px] md:text-[16px] font-medium">
        {title}
      </p>
      <div className="flex items-center gap-3">
        <div
          className={`w-0.5 h-5 ${
            title === "Total Tasks"
              ? "bg-fuchsia-800"
              : title === "In Progress"
              ? "bg-amber-600"
              : title === "Open Tasks" ? "bg-blue-400" : "bg-emerald-600"
          }`}
        />
        <p className="text-[20px] font-medium dark:text-white">{value}</p>
      </div>
    </div>
  );
};

export default TaskPointer;
