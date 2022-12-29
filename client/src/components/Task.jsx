import React from "react";

const Task = (props) => {
  return (
    <div className="border-b border-black px-6 py-4">
      <div className="flex items-center">
        <input
          onClick={props.click}
          id={props.id}
          defaultChecked={props.checked}
          type="checkbox"
          className="peer relative h-5 w-5 shrink-0 appearance-none rounded-xl border-2 border-primary after:absolute after:left-0 after:top-0 after:h-full after:content-[''] checked:bg-primary hover:ring hover:ring-violet-400 focus:outline-none shadow-inline"
        />
        <label
          className="ml-6 text-lg inline-block w-full cursor-pointer peer-checked:line-through peer-checked:text-gray-400"
          htmlFor={props.id}
        >
          {props.name}
        </label>
      </div>
    </div>
  );
};

export default Task;
