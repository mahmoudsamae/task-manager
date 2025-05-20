"use client";
import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const DarkModeIcon = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
  };

  return (
    <>
      {darkMode ? (
        <Moon
          onClick={toggleDarkMode}
          className="border-2 rounded-[50%] cursor-pointer w-8 h-8 p-[5px] text-white bg-primary"
        />
      ) : (
        <Sun
          onClick={toggleDarkMode}
          className="border-2 rounded-[50%] cursor-pointer w-8 h-8 p-[5px] text-white bg-primary"
        />
      )}
    </>
  );
};

export default DarkModeIcon;
