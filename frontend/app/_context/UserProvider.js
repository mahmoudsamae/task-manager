"use client";
import { useState, createContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import userApis from "../_utilte/userApis";
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [addTask, setAddTask] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const navigate = useRouter()

  const getUser = async (userData) => {
    try {
      await userApis.getUser(userData).then(async (res) => {
        const userData = res?.data;
        await localStorage.setItem("user", JSON.stringify(userData));
        await localStorage.setItem("token", userData?.token);
        setUser(userData);
        toast.success(res?.data?.message, { position: "top-right" });
        window.location.href = "/";
      });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to login", {
        position: "top-center",
      });
    }
  };

  const userLogout = async (setTasks) => {
    if (user) {
      await window.localStorage.removeItem("user");
      await window.localStorage.removeItem("token");
      setUser(null);
      setTasks([]);
    } else {
      navigate.push("/auth/signin");
    }
  };

  const updateUserProfile = async (userID, user) => {
      await userApis.updateUserProfil(userID, user).then(async (data) => {
        const newUser = data?.data;
        window.localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
        setIsUpdate(false);
        toast.success("User updated successfully!");
      }).catch((error) => {
        console.log(error);
        toast.error(error.response?.data?.message || "Something went wrong");
      })
  
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser?.user?.username) {
        setUser(storedUser);
      }
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        getUser,
        addTask,
        setAddTask,
        userLogout,
        isUpdate,
        setIsUpdate,
        updateUserProfile,
      }}
    >
      <ToastContainer />
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
