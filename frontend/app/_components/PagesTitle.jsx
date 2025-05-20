import React from 'react'
import TaskPointer from './TaskComponents/TaskPointer';

const PagesTitle = ({title}) => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center w-full gap-2 sm:gap-0 ">
        <h1 className="font-bold text-2xl dark:text-white">{title}</h1>
      </div>
      <div className="sm:hidden">
        <TaskPointer type={"sm"} />
      </div>
      <hr className="my-3 text-gray-200 dark:text-darkSecondary" />
    </div>
  );
}

export default PagesTitle