"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { TaskContext } from "../_context/TaskContext";
import DarkModeIcon from "./ModeIcom";
import Image from "next/image";
import { UserContext } from "../_context/UserProvider";
import UpdateProfile from "./UpdateProfile";

const Header = () => {
  const { setAddTask, tasks } = useContext(TaskContext);
  let activeTasks = tasks?.filter((ele) => ele.status !== "completed");
  const { user, isUpdate, setIsUpdate } = useContext(UserContext);

  const isLoggedIn = !!user?.user?.username;

  return (
    <header className="bg-white dark:bg-darkSecondary fixed top-0 w-full z-50">
      <div className="mx-auto w-full flex justify-between h-16 max-w-screen-xl items-center ">
        <div className="flex flex-1 items-center justify-between w-full ml-4">
          <Link className="block text-teal-600 mr-4" href="/">
            <span className="sr-only">Home</span>
            <Image src="/logo.svg" alt="logo" width={40} height={40} priority />
          </Link>
          <div className="flex flex-1 justify-between items-center w-full">
            <div className="sticky inset-x-0">
              {user?.user?.username ? (
                <div className="flex flex-1 justify-between items-center w-full ">
                  <div className="sticky inset-x-0 ">
                    <div className="flex items-center gap-2 sm:p-2 min-h-[48px]">
                      <Image
                        src={"/greeting1.svg"}
                        alt="greeting"
                        width={40}
                        height={40}
                        priority
                      />
                      <div>
                        <p className="text-xs">
                          <strong className="block font-bold text-[12px] dark:text-white sm:text-[15px] capitalize">
                            Welcome, {user?.user?.username}
                          </strong>

                          <span className="dark:text-gray-300">
                            You have{" "}
                            <span className="text-primary font-bold">
                              {activeTasks.length ?? 0}
                            </span>{" "}
                            active tasks
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 sm:p-2 min-h-[48px] animate-pulse">
                  <div className="bg-gray-300 dark:bg-gray-600 rounded-full w-10 h-10" />
                  <div className="space-y-1">
                    <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-28"></div>
                    <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-20"></div>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => setAddTask(true)}
              className={`hidden sm:block rounded-4xl px-3 py-1 text-white transition ${
                isLoggedIn
                  ? "bg-primary hover:bg-hover opacity-100"
                  : "opacity-0"
              }`}
            >
              Add New Task
            </button>
          </div>

          {!isLoggedIn && (
            <div className="flex items-center gap-4 w-full min-h-[64px]">
              <div className="flex gap-2 justify-end items-start w-full">
                <>
                  <Link
                    className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-hover"
                    href="/auth/signin"
                  >
                    Sign In
                  </Link>

                  <Link
                    className="hidden rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-hover sm:block"
                    href="/auth/signup"
                  >
                    Sign Up
                  </Link>
                </>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center justify-end sm:justify-center gap-3 w-[23vw] mr-3 sm:mr-0 sm:w-[25vw] lg:w-[20vw]">
          <DarkModeIcon />
          {isLoggedIn && (
            <div className="sticky inset-x-0 bottom-0 bg-white dark:bg-darkSecondary">
              <button
                aria-label={`View user info: ${user?.user?.username}`}
                onClick={() => setIsUpdate(true)}
                className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500  hover:text-primary"
              >
                <User className="border-2 cursor-pointer rounded-[50%] w-8 h-8 p-[5px] text-white bg-primary" />

                <span className="invisible w-[160px] p-2 absolute start-full top-15 -left-35 ms-4 -translate-y-1/2 rounded-sm bg-gray-900  py-1.5 text-xs font-medium text-white group-hover:visible">
                  {user?.user?.username}
                  <br />
                  <span className="text-[10px]">{user?.user?.email}</span>
                </span>
              </button>
            </div>
          )}
        </div>
        {isUpdate && isLoggedIn && <UpdateProfile user={user} />}
      </div>
    </header>
  );
};

export default Header;
