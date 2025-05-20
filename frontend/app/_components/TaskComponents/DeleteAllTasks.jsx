"use client";
import { TaskContext } from "@/app/_context/TaskContext";
import tasksApis from "@/app/_utilte/tasksApis";
import { X } from "lucide-react";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const DeleteAllTasks = () => {
  const { setIsDeleteAll, getAllTasks_ } = useContext(TaskContext);
  const [error, setError] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const {text} = {...data};
    if(text === "delete all"){
      await tasksApis.deleteAllTasks().then(res => {
        toast.success(res?.data?.message);
        getAllTasks_();
        setIsDeleteAll(false);
      }).catch(error => toast.error(error?.respons?.data?.message || "ُError"))
    }else {
      setError("Please, enter the correct word to delete");
    }
  }
  return (
    <div className="absolute w-[100vw] h-[100vh] pb-29 pr-30  inset-0 flex justify-center items-center">
      <div
        onClick={() => setIsDeleteAll(false)}
        className="bg-darkSecondary opacity-30 w-[100vw] h-[100vh] mb-3 ml-30 absolute z-50 border-2 border-primary"
      />
      <div className="relative z-50 w-[300px] h-[200px] flex flex-col justify-center items-center gap-3 bg-white dark:bg-darkSecondary rounded-2xl shadow-2xl/45 shadow-white">
        <X
          onClick={() => setIsDeleteAll(false)}
          className="absolute text-primary top-2 right-2 cursor-pointer"
        />
        <p className="dark:text-white">
          Enter <span className="font-bold">"delete all"</span> to confirm
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("text", { required: "Title require" })}
            type="text"
            name="text"
            className="p-2 border-2 dark:text-white border-gray-300 dark:border-gray-600 w-full rounded shadow-sm sm:text-sm focus:outline-none"
          />
          {errors.text && (
            <p className="text-primary text-[14px]">{errors.text.message}</p>
          )}
          {error && (
            <p className="text-primary text-[14px]">{error}</p>
          )}
          <button
            type="submit"
            className="py-1.5 mt-2  rounded cursor-pointer w-full bg-primary hover:bg-hover text-white"
          >
            Delete All
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteAllTasks;
