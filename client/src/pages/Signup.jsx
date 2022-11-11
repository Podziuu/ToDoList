import React from "react";

import Button from "../components/UI/Button";
import Input from "../components/UI/Input";

const Signup = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-light-blue">
      <div className="bg-white p-6 rounded-[50px] w-4/5 flex flex-col">
        <h1 className="text-4xl font-bold text-center mb-6">Sign Up</h1>
        <Input name="Name" placeholder="Enter your name" />
        <Input name="E-mail" placeholder="Enter your email" />
        <Input name="Password" placeholder="Enter your password" />
        <Input name="Confirm Password" placeholder="Enter your password" />
        <Button className="w-fit m-auto mt-8" big text="Sign Up" />
      </div>
    </div>
  );
};

export default Signup;
