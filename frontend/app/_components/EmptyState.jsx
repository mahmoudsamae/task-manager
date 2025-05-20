import Link from 'next/link';
import React from 'react'

const EmptyState = ({title, text, path, linkText}) => {
  return (
    <div className=" w-[50%] m-auto sm:w-[100%] sm:m-0 h-[30vh] sm:h-[50vh] md:h-[60vh] flex flex-col justify-center items-center gap-3">
      {/* Container card */}
      <div className="w-[250px] sm:w-[280px] gap-4 flex flex-col justify-center items-center h-[200px] bg-white dark:bg-darkSecondary rounded-4xl shadow-2xl">
        <h1 className="text-2xl font-bold dark:text-white text-center">
          {title}
        </h1>
        <p className="dark:text-gray-300">{text}</p>
        <Link
          href={path}
          className="rounded-4xl cursor-pointer bg-primary border-2 w-fit hover:bg-hover px-3 py-1 text-white"
        >
          {linkText}
        </Link>
      </div>
    </div>
  );
}

export default EmptyState