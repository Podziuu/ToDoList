import React from "react";
import Task from "../components/Task";

const Main = () => {
  return (
    <div className="h-screen flex flex-col items-center pt-24 bg-light-blue">
      <h1 className="text-4xl text-white font-bold">Monday</h1>
      <div className="bg-white h-3/5 rounded-3xl w-4/5 mt-14">
        <div className="bg-dark-blue text-white text-xl text-center rounded-t-3xl py-3">
          <h2>X tasks remaining</h2>
        </div>
        <div className="h-2/3 overflow-scroll">
          <Task id="1" name="task 1" />
          <Task id="2" name="task 2" />
          <Task id="3" name="task 3" />
          <Task id="4" name="task 4" />
          <Task id="5" name="task 5" />
          <Task id="6" name="task 6" />
          <Task id="7" name="task 7" />
          <Task id="8" name="task 8" />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Main;
