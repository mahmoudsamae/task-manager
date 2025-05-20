"use client";
import { useContext } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { UserContext } from "../_context/UserProvider";
import { X } from "lucide-react";

const UpdateProfile = ({ user }) => {
  const { setIsUpdate, updateUserProfile } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const updatedUser = { ...data };
    updateUserProfile(user?.user?._id, updatedUser);
  };

  return (
    <div className="flex justify-center items-center ">
      <div
        className="fixed cursor-pointer z-50 w-[100vw] h-[100vh] top-0 left-0 bg-black opacity-20"
        onClick={() => {
          setIsUpdate(false);
        }}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[320px] mt-60 shadow-gray-700 shadow-2xl bg-white dark:bg-darkSecondary absolute z-50 top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] p-4 rounded flex flex-col gap-2"
      >
        <X
          onClick={() => setIsUpdate(false)}
          className="absolute top-2 right-2 cursor-pointer text-primary"
        />
        <h1 className="dark:text-white text-center font-bold text-[25px]">
          Update Your Profile
        </h1>
        <div className="flex flex-col">
          <label htmlFor="username">
            <span className="text-sm font-medium text-gray-400 "> Title </span>

            <input
              {...register("username", { required: "This field is required" })}
              defaultValue={user?.user?.username}
              type="text"
              id="username"
              placeholder="username"
              className="p-2 border-2 border-gray-300 dark:border-gray-500 dark:text-white dark:placeholder:text-gray-400 w-full rounded shadow-sm sm:text-sm focus:outline-none"
            />
            {errors.username && (
              <p className="text-primary text-[14px]">
                {errors.username.message}
              </p>
            )}
          </label>
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">
            <span className="text-sm font-medium text-gray-400">Email</span>

            <input
              {...register("email", { required: "This field is required" })}
              defaultValue={user?.user?.email}
              type="email"
              id="email"
              placeholder="email"
              className="p-2 border-2 border-gray-300  dark:border-gray-500 dark:text-white dark:placeholder:text-gray-400 w-full rounded shadow-sm sm:text-sm focus:outline-none resize-x-none"
            />
            {errors.email && (
              <p className="text-primary text-[14px]">{errors.email.message}</p>
            )}
          </label>
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">
            <span className="text-sm font-medium text-gray-400">
              Current Password
            </span>

            <input
              {...register("currentPassword", {
                required: "This field is required",
              })}
              type="password"
              id="password"
              placeholder="password"
              className="p-2 border-2 border-gray-300  dark:border-gray-500 dark:text-white dark:placeholder:text-gray-400 w-full rounded shadow-sm sm:text-sm focus:outline-none resize-x-none"
            />
            {errors.currentPassword && (
              <p className="text-primary text-[14px]">
                {errors.currentPassword.message}
              </p>
            )}
          </label>
        </div>
        <div className="flex flex-col">
          <label htmlFor="newPassword">
            <span className="text-sm font-medium text-gray-400">
              New Password
            </span>

            <input
              {...register("newPassword", {
                required: "Password is required",
              })}
              type="password"
              id="newPassword"
              placeholder="New Password"
              className="p-2 border-2 border-gray-300  dark:border-gray-500 dark:text-white dark:placeholder:text-gray-400 w-full rounded shadow-sm sm:text-sm focus:outline-none resize-x-none"
            />
            {errors.newPassword && (
              <p className="text-primary text-[14px]">
                {errors.newPassword.message}
              </p>
            )}
          </label>
        </div>

        {/* Update Task Button  */}
        <button
          type="submit"
          className="py-1.5 mt-2 rounded cursor-pointer w-full bg-primary hover:bg-hover text-white"
        >
          Update user
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
