"use client";
import { TaskContext } from "@/app/_context/TaskContext";
import tasksApis from "@/app/_utilte/tasksApis";
import { Calendar } from "lucide-react";
import { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const UpdateForm = ({ task }) => {
  const { setUpdateTask, getAllTasks_ } = useContext(TaskContext);
  const [selectedTask, setSelectedTask] = useState(task);
  const [startDate, setStartDate] = useState(new Date(selectedTask?.dueDate));

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const updatedTask = { ...data, dueDate: startDate.toISOString() };
    try {
      await tasksApis.updateTask(selectedTask?._id, updatedTask).then((res) => {
        toast.success(res.data.message)
        getAllTasks_();
      });
      await setSelectedTask(null);
      setUpdateTask(false);
      reset();
    } catch (error) {}
  };
  
  if (!selectedTask) return null;

  return (
    <div className="flex justify-center items-center ">
      {/* Overlay background */}
      <div
        className="fixed z-50 w-[100vw] h-[100vh] top-0 left-0 bg-black opacity-20"
        onClick={() => {
          setUpdateTask(false);
          setSelectedTask(null);
          reset();
        }}
      />
      {/* Modal form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[320px] shadow-gray-700 shadow-2xl bg-white dark:bg-darkSecondary absolute z-50 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] p-4 rounded flex flex-col gap-2"
      >
        {/* Title input */}
        <div className="flex flex-col">
          <label htmlFor="Title">
            <span className="text-sm font-medium text-gray-400 "> Title </span>

            <input
              {...register("title", { required: "Title require" })}
              defaultValue={selectedTask?.title}
              type="text"
              id="Title"
              placeholder="Task Title"
              className="p-2 border-2 border-gray-300 dark:border-gray-500 dark:text-white dark:placeholder:text-gray-400 w-full rounded shadow-sm sm:text-sm focus:outline-none"
            />
            {errors.title && (
              <p className="text-primary text-[14px]">{errors.title.message}</p>
            )}
          </label>
        </div>
        {/* Description textarea */}
        <div className="flex flex-col">
          <label htmlFor="Description">
            <span className="text-sm font-medium text-gray-400">
              Description
            </span>

            <textarea
              {...register("description", { required: "Description require" })}
              defaultValue={selectedTask?.description}
              type="text"
              id="Description"
              rows={4}
              placeholder="Task Description"
              className="p-2 border-2 border-gray-300  dark:border-gray-500 dark:text-white dark:placeholder:text-gray-400 w-full rounded shadow-sm sm:text-sm focus:outline-none resize-x-none"
            />
            {errors.description && (
              <p className="text-primary text-[14px]">
                {errors.description.message}
              </p>
            )}
          </label>
        </div>
        {/* Priority select */}
        <div className="flex flex-col">
          <label htmlFor="Priority">
            <span className="text-sm font-medium text-gray-400">Priority</span>

            <select
              {...register("priority")}
              defaultValue={selectedTask?.priority}
              id="Priority"
              name="priority"
              className="block w-full px-2 py-2 border-2  dark:border-gray-500 dark:text-white dark:placeholder:text-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none text-gray-700"
            >
              <option value="low" className="dark:text-darkSecondary">
                Low
              </option>
              <option value="medium" className="dark:text-darkSecondary">
                Medium
              </option>
              <option value="high" className="dark:text-darkSecondary">
                High
              </option>
            </select>
          </label>
        </div>

        {/* date picker for Due Date*/}
        <div className="flex flex-col">
          <label htmlFor="Priority flex flex-col">
            <span className="block text-sm font-medium text-gray-400">
              Due Date
            </span>

            <DatePicker
              showIcon
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="focus:outline-none dark:text-white"
              icon={<Calendar className="flex self-start dark:text-white" />}
            ></DatePicker>
          </label>
        </div>

        {/* Task Status  */}
        <div className="flex flex-col">
          <label htmlFor="Status">
            <span className="text-sm font-medium text-gray-400">
              Task Status
            </span>

            <select
              {...register("status")}
              defaultValue={selectedTask?.status}
              id="Status"
              name="status"
              className="block w-full px-2 py-2 border-2 dark:text-gray-300 border-gray-300 rounded-md shadow-sm focus:outline-none text-gray-700"
            >
              <option value="pending" className="dark:text-darkSecondary">
                Pending
              </option>
              <option value="in progress" className="dark:text-darkSecondary">
                In progress
              </option>
              <option value="completed" className="dark:text-darkSecondary">
                Completed
              </option>
            </select>
          </label>
        </div>

        {/* Update Task Button  */}
        <button
          type="submit"
          className="py-1.5 rounded cursor-pointer w-full bg-primary hover:bg-hover text-white"
        >
          Update Task
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
