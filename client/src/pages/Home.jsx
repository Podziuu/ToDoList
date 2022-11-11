import React from "react";
import Button from "../components/UI/Button";

const Home = () => {
  return (
    <div className="bg-light-blue h-screen flex justify-center items-center flex-col">
      <h1 className="text-5xl text-white font-bold mb-4">To Do List App</h1>
      <div className="gap-x-8 flex">
        <Button text="Log In" primary link to="/login" />
        <Button text="Sign Up" link to="/signup" />
      </div>
    </div>
  );
};

export default Home;
