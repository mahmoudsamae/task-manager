"use client";
import {
  AlarmClockCheck,
  AlarmClockOff,
  BookCheck,
  Delete,
  LayoutGrid,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DeleteAllTasks from "./TaskComponents/DeleteAllTasks";
import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../_context/TaskContext";
import { UserContext } from "../_context/UserProvider";
const listData = [
  {
    path: "/",
    icon: <LayoutGrid />,
    text: "All Tasks",
  },
  {
    path: "/completed",
    icon: <BookCheck />,
    text: "Completed",
  },
  {
    path: "/pending",
    icon: <AlarmClockCheck />,
    text: "Pending",
  },
  {
    path: "/overdue",
    icon: <AlarmClockOff />,
    text: "OverDue",
  },
];
const SettingBar = () => {
  const { isDeleteAll, setIsDeleteAll, setTasks } = useContext(TaskContext);
  const { user, userLogout } = useContext(UserContext);
  const [isMounted, setIsMounted] = useState(false);

  const handleLogout = async () => {
    userLogout(setTasks);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <div className="flex bg-white dark:bg-darkSecondary h-screen w-13 sm:w-16 flex-col justify-between fixed top-16 z-50">
      <div>
        <div className="border-t border-gray-100 dark:border-darkPrimary">
          <div className="px-2">
            <ul className="space-y-1 pt-4 flex flex-col gap-1.5">
              {listData?.map((ele) => (
                <SettingItem
                  key={ele.path}
                  path={ele.path}
                  icon={ele.icon}
                  text={ele.text}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>

      {isMounted && user?.user?.username && (
        <div className="flex flex-col gap-4">
          {/* delete all tasks button  */}
          {isDeleteAll && <DeleteAllTasks />}
          <div className="sticky inset-x-0 bottom-0 border-t mb-10 border-gray-100 dark:border-darkPrimary bg-white dark:bg-darkSecondary  p-2">
            <button
              aria-label="Delete all tasks"
              onClick={() => setIsDeleteAll(true)}
              className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500  hover:text-primary"
            >
              <Delete />

              <span className="invisible w-[95px] p-1 absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900  py-1.5 text-xs font-medium text-white group-hover:visible">
                Delete All Tasks
              </span>
            </button>
          </div>

          {/* log out button  */}
          <div className="sticky inset-x-0 bottom-0  border-gray-100 dark:border-darkPrimary bg-white dark:bg-darkSecondary  p-2">
            <button
              aria-label="Logout"
              onClick={handleLogout}
              className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500  hover:text-primary"
            >
              <LogOut />

              <span className="invisible w-[95px] p-1 absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900  py-1.5 text-xs font-medium text-white group-hover:visible">
                Logout
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
const SettingItem = ({ path, icon, text }) => {
  const pathname = usePathname();
  
  return (
    <li>
      <Link
        aria-label={text}
        href={path}
        className={`group relative flex justify-center rounded-sm px-2 py-1.5 ${
          pathname === path ? "text-primary" : "text-gray-500"
        }  hover:text-hover`}
      >
        {icon}
        <span className="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-1 py-1.5 text-xs font-medium text-white group-hover:visible">
          {text}
        </span>
      </Link>
    </li>
  );
};

export default SettingBar;
