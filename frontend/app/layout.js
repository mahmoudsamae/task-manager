"use client";
import { Roboto } from "next/font/google";
import "./globals.css";
import UserProvider from "./_context/UserProvider";
import TaskProvider from "./_context/TaskContext";
import Header from "./_components/Header";
import SettingBar from "./_components/SettingBar";
import FormSide from "./_components/FormSide";

const geistMono = Roboto({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});


export default function RootLayout({ children }) {

  return (
    <html lang="en" className="dark dark:bg-darkSecondary">
      <body className={` ${geistMono.variable} antialiased`}>
        <UserProvider>
          <TaskProvider>
            <Header />
            <SettingBar />
            <FormSide />
            <div className="ml-11 sm:ml-16 mr-[20px] sm:mr-[30vw] lg:mr-[21vw] mt-16 dark:bg-darkSecondary">
              {children}
            </div>
          </TaskProvider>
        </UserProvider>
      </body>
    </html>
  );
}
