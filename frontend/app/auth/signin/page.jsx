"use client";

import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../_context/UserProvider";
import Link from "next/link";
import Image from "next/image";

export default function SignIn() {
  const { getUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userData = data;
    setLoading(true);
    try {
      await getUser(userData);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="w-[calc(100vw-4rem)] min-h-[calc(100vh-4rem)] flex flex-1 flex-col justify-center items-center px-3 pt-3 lg:px-8 dark:bg-darkPrimary">
        <div className="shadow-2xl w-[100%] sm:w-[350px] px-4 sm:px-6 py-2  rounded-4xl dark:bg-darkSecondary">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col justify-center items-center">
            <Image src="/user.svg" alt="" width={90} height={90} priority/>
            <h2 className="mt-5 sm:mt-0 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm ">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 rounded"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900 dark:text-gray-400"
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
                    className="block text-sm/6 font-medium text-gray-900 dark:text-gray-400"
                  >
                    Password
                  </label>
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
                    placeholder="your password"
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
                  disabled={loading}
                  className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-hover cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </form>

            <p className="mt-4 text-center text-sm/6 text-gray-500">
              Not a member?{" "}
              <Link
                href="/auth/signup"
                className="font-semibold text-primary hover:text-hover"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
