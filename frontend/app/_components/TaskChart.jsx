import React from "react";
import {motion} from "framer-motion"
const TaskChart = ({ allTasks }) => {
  let completedTasks = allTasks.filter((ele) => ele.status === "completed");
  let notCompletedTasks = allTasks.filter((ele) => ele.status !== "completed");
  let tasks = [...notCompletedTasks, ...completedTasks];

  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-2 w-[100%] my-2">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary" />
          <h1 className="dark:text-gray-300 text-[12px]">Pending</h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-300" />
          <h1 className="dark:text-gray-300 text-[12px]">Completed</h1>
        </div>
      </div>
      <div className="relative flex  justify-center items-center overflow-hidden sm:h-[70px] md:h-[90px] lg:h-[100px]  sm:w-[70px] md:w-[90px] lg:w-[100px] rounded-[50%]">
        {tasks?.map((ele) => (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            key={ele._id}
            className={`flex-1 ${
              ele.status !== "completed" ? "bg-primary" : "bg-blue-400"
            } w-[100%] h-[100%] transition duration-500`}
            >
          </motion.div>
        ))}
        <div className="flex flex-col items-center justify-center absolute w-[80%] h-[80%] rounded-[50%] bg-gray-100 dark:bg-darkPrimary">
          <p className="font-bold sm:text-[25px] md:text-[30px] lg:text-[35px] text-primary ">
            {allTasks.length}
          </p>
          <p className="text-[10px] dark:text-gray-300 mt-[-10]">Tasks</p>
        </div>
      </div>
    </div>
  );
};

export default TaskChart;
