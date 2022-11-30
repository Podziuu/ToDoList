import React, { useState } from "react";
import { useForm } from "react-hook-form";

import Task from "../components/Task";
import Button from "../components/Button";

const DUMMY_TASKS = [
  { name: "task 1", id: "1", checked: false },
  { name: "task 2", id: "2", checked: false },
  { name: "task 3", id: "3", checked: false },
  { name: "task 4", id: "4", checked: false },
  { name: "task 5", id: "5", checked: false },
  { name: "task 6", id: "6", checked: false },
  { name: "task 7", id: "7", checked: false },
  { name: "task 8", id: "8", checked: false },
];

const Main = () => {
  const [tasks, setTasks] = useState(DUMMY_TASKS);
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    setTasks((prevState) => [...prevState, { name: data.taskName, id: "20" }]);
    reset({
      taskName: "",
    });
  };

  const clickHandler = (e) => {
    const clickedTask = tasks.find((task) => task.id === e.target.id);
    clickedTask.checked = e.target.checked;
  };

  const clearList = () => {
    setTasks([]);
  };

  const deleteCompletedTasks = () => {
    const restTasks = tasks.filter((task) => {
      return task.checked === false;
    });
    setTasks(restTasks);
  };

  return (
    <div className="h-screen flex flex-col items-center pt-24 bg-light-blue">
      <h1 className="text-4xl text-white font-bold">Monday</h1>
      <div className="bg-white h-3/5 rounded-3xl w-4/5 max-w-[350px] mt-14 flex flex-col">
        <div className="bg-dark-blue text-white text-xl text-center rounded-t-3xl py-3">
          <h2>X tasks remaining</h2>
        </div>
        <div className="h-2/3 overflow-y-scroll">
          {tasks.map((task) => {
            return (
              <Task
                key={task.id}
                id={task.id}
                name={task.name}
                click={clickHandler}
              />
            );
          })}
          {tasks.length === 0 && (
            <h3 className="text-center mt-6 text-lg">
              You have no tasks already.
            </h3>
          )}
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-row-reverse justify-center items-center w-full mt-8"
        >
          <input
            type="text"
            placeholder="Add new task"
            className="border-b border-black w-4/5 outline-none focus:border-b-2"
            {...register("taskName", { required: "Please enter task name" })}
          />
          <button type="submit" className="text-3xl font-bold mr-2">
            +
          </button>
        </form>
      </div>
      <div className="flex items-center mt-4 justify-between w-4/5 max-w-[350px]">
        <Button onClick={clearList} text="Clear List" primary small />
        <Button
          onClick={deleteCompletedTasks}
          text="Delete Completed Tasks"
          small
        />
      </div>
    </div>
  );
};

export default Main;