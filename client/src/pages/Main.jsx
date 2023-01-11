import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import Task from "../components/Task";
import Button from "../components/Button";
import axios from "axios";

const Main = () => {
  const [tasks, setTasks] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  const day = useSelector((state) => state.ui.day);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchTasks = async (day) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/tasks/${day}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTasks(response.data.dayTasks);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTasks(day);
  }, [day]);

  const onSubmit = async (data) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/tasks`,
      {
        day,
        name: data.taskName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    reset({
      taskName: "",
    });
    setTasks((prevState) => [...prevState, response.data.task]);
  };

  const clickHandler = async (e) => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/tasks/${e.target.id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setTasks((prevState) =>
      prevState.map((task) => {
        if (task._id === response.data.task._id) {
          task.checked = response.data.task.checked;
        }
        return task;
      })
    );
  };

  const clearList = () => {
    setTasks([]);
  };

  const deleteCompletedTasks = () => {
    const restTasks = tasks.filter((task) => {
      return task.checked === false;
    });
    setTasks(restTasks);
    console.log("witam")
    axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/tasks/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  return (
    <div className="h-screen flex flex-col items-center pt-24 bg-light-blue">
      <h1 className="text-4xl text-white font-bold">{day}</h1>
      <div className="bg-white h-3/5 rounded-3xl w-4/5 max-w-[400px] mt-14 flex flex-col">
        <div className="bg-dark-blue text-white text-xl text-center rounded-t-3xl py-3">
          <h2>{tasks.length} tasks remaining</h2>
        </div>
        <div className="h-2/3 overflow-y-scroll">
          {tasks.map((task) => {
            return (
              <Task
                name={task.name}
                id={task._id}
                key={task._id}
                click={clickHandler}
                checked={task.checked}
              />
            );
          })}
          {tasks.length === 0 && (
            <h3 className="text-center mt-6 text-lg">
              You have no tasks already. <br />
              Maybe add one ?
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
        <Button
          onClick={clearList}
          text="Clear List"
          primary
          small
          className="z-30"
        />
        <Button
          onClick={deleteCompletedTasks}
          text="Delete Completed Tasks"
          small
          className="z-30"
        />
      </div>
    </div>
  );
};

export default Main;
