"use client"
import Link from "next/link";
import { useForm } from "react-hook-form";
import userApis from "../../_utilte/userApis";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function SingUp() {
  const navigate = useRouter()
  const {register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState("")

  const onSubmit = async (data) => {
    const newUser = data;
    try {
      await userApis.createUser(newUser).then((res) => {
        toast.success(res.message);
        navigate.push("/auth/signin")
      })
    } catch (error) {
      console.log(error)
      setError(error?.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <>
      <div className="w-[calc(100vw-4rem)] min-h-[calc(100vh-4rem)] flex flex-1 flex-col justify-center items-center px-3 pt-3 lg:px-8 dark:bg-darkPrimary">
        <div className="shadow-2xl w-[100%] sm:w-[350px] px-4 sm:px-6 py-2  rounded-4xl dark:bg-darkSecondary">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col justify-center items-center">
            <Image src="/user.svg" alt="" width={90} height={90} priority />
            <h2 className="text-center dark:text-white text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign Up
            </h2>
          </div>

          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block dark:text-gray-300 text-sm/6 font-medium text-gray-900"
                >
                  User Name
                </label>
                <div className="mt-2">
                  <input
                    {...register("username", {
                      required: "username is required",
                    })}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    placeholder="your full name"
                    className="block w-full rounded-md bg-white dark:text-white dark:bg-darkPrimary px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-none border-none sm:text-sm/6"
                  />
                  {errors.username && (
                    <p className="text-[14px] text-primary">
                      {errors.username.message}
                    </p>
                  )}
                  {error && <p className="text-[14px] text-primary">{error}</p>}
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900 dark:text-gray-300"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    {...register("email", { required: "email is required" })}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="example@gmail.com"
                    className="block w-full rounded-md bg-white dark:text-white dark:bg-darkPrimary px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-none border-none sm:text-sm/6"
                  />
                  {errors.email && (
                    <p className="text-[14px] text-primary">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900 dark:text-gray-300"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-primary hover:text-hover"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    {...register("password", {
                      required: "password is required",
                    })}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Password"
                    className="block w-full rounded-md bg-white dark:text-white dark:bg-darkPrimary px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-none border-none sm:text-sm/6"
                  />
                  {errors.password && (
                    <p className="text-[14px] text-primary">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-primary cursor-pointer px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-hover focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <p className="text-center text-sm/6 text-gray-500 mt-2">
              Already have an account? Sign in
              <Link
                href="/auth/signin"
                className="font-semibold text-primary hover:text-hover"
              >
                Sign In?
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
